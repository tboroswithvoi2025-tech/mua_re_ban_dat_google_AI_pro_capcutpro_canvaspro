import { useEffect, useState } from 'react'
import {
  Eye,
  ShoppingBag,
  ShoppingCart,
  Clock,
  Mail,
  Package,
  Plus,
  Minus,
  Check,
  ArrowRight,
  Flame,
  Sparkles,
  MessageCircle,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'
import { INITIAL_PRODUCTS } from '@/data/productsData'
import {
  formatVND,
  BADGE_LABELS,
  BADGE_COLORS,
  STOCK_LABELS,
  STOCK_COLORS,
  formatProductName,
  getProductImage,
  getDiscountPercent,
  getOriginalPrice,
} from '@/lib/utils'
import { useCart } from '@/context/CartContext'

interface Props {
  onSelectProduct: (product: Product) => void
  onBuyProduct: (product: Product) => void
}

export default function Products({ onSelectProduct }: Props) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>('ALL')

  // Số lượng sản phẩm hiện sẵn trên từng thẻ
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  // Trạng thái vừa thêm vào giỏ để hiện feedback tạm thời
  const [addedNotice, setAddedNotice] = useState<Record<string, boolean>>({})

  const { addToCart, openCart, totalCount, totalAmount } = useCart()

  useEffect(() => {
    ;(async () => {
      let prods: Product[] = INITIAL_PRODUCTS

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: true })

        if (!error && data && data.length > 0) {
          // Kết hợp danh sách cấu hình chuẩn INITIAL_PRODUCTS (Proxy, Google AI Chính Hãng, v.v.)
          // để luôn đảm bảo đầy đủ các mặt hàng mới theo đúng yêu cầu
          const map = new Map<string, Product>()
          INITIAL_PRODUCTS.forEach((p) => map.set(p.slug, p))
          ;(data as Product[]).forEach((dbProd) => {
            if (!map.has(dbProd.slug)) {
              map.set(dbProd.slug, dbProd)
            }
          })
          prods = Array.from(map.values())
        }
      } catch (err) {
        console.warn('Sử dụng danh mục sản phẩm cục bộ:', err)
      }

      setProducts(prods)

      // Khởi tạo số lượng mặc định là 1 cho từng sản phẩm
      const initialQty: Record<string, number> = {}
      prods.forEach((p) => {
        initialQty[p.id] = 1
      })
      setQuantities(initialQty)
      setLoading(false)
    })()
  }, [])

  const handleQtyChange = (productId: string, newQty: number) => {
    const validQty = Math.max(1, Math.min(50, newQty))
    setQuantities((prev) => ({
      ...prev,
      [productId]: validQty,
    }))
  }

  // Thêm vào giỏ hàng
  const handleAddToCart = (product: Product) => {
    if (product.stock_status === 'out_of_stock') return
    const qty = quantities[product.id] || 1
    addToCart(product, qty)

    // Hiển thị thông báo "Đã thêm" trên nút trong 1.8s
    setAddedNotice((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedNotice((prev) => ({ ...prev, [product.id]: false }))
    }, 1800)
  }

  // Mua ngay -> Thêm vào giỏ và mở ngay Giỏ hàng lớn
  const handleBuyNow = (product: Product) => {
    if (product.stock_status === 'out_of_stock') return
    const qty = quantities[product.id] || 1
    addToCart(product, qty)
    openCart()
  }

  const filteredProducts = products.filter((p) => {
    if (filterType === 'ALL') return true
    const n = (p.name || '').toLowerCase()
    const s = (p.slug || '').toLowerCase()

    if (filterType === 'GOOGLE') {
      return n.includes('google') || n.includes('gemini') || s.includes('gemini') || s.includes('google')
    }
    if (filterType === 'CAPCUT') {
      return n.includes('capcut') || s.includes('capcut')
    }
    if (filterType === 'PROXY') {
      return n.includes('proxy') || s.includes('proxy')
    }
    if (filterType === 'CANVA') {
      return n.includes('canva') || s.includes('canva')
    }
    return true
  })

  // Phân chia theo 3 nhóm hàng riêng biệt theo yêu cầu:
  // 1. Nhóm Bán Chạy (BAN_CHAY)
  // 2. Nhóm Phổ Biến (PHO_BIEN)
  // 3. Nhóm Bình Thường / Các mặt hàng khác
  const bestSellers = filteredProducts.filter((p) => p.badge === 'BAN_CHAY')
  const populars = filteredProducts.filter((p) => p.badge === 'PHO_BIEN')
  const others = filteredProducts.filter(
    (p) => !p.badge || (p.badge !== 'BAN_CHAY' && p.badge !== 'PHO_BIEN')
  )

  // Render từng thẻ sản phẩm chuẩn mực với 4 góc trên ảnh
  const renderProductCard = (product: Product, i: number) => {
    const displayName = formatProductName(product)
    const displayImg = getProductImage(product)
    const currentQty = quantities[product.id] || 1
    const isAdded = addedNotice[product.id]
    const isOutOfStock = product.stock_status === 'out_of_stock'

    // Giá gốc và % giảm giá tâm lý
    const originalPrice = getOriginalPrice(product.price, product.original_price)
    const discountPercent = getDiscountPercent(product.price, originalPrice)

    return (
      <div
        key={product.id}
        className={`glass-card glass-card-hover rounded-2xl overflow-hidden group flex flex-col justify-between border transition-all duration-300 ${
          isOutOfStock
            ? 'border-gray-700/40 opacity-90'
            : product.badge === 'BAN_CHAY'
            ? 'border-gold-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
            : 'border-mystic-500/20'
        }`}
        style={{ animationDelay: `${i * 0.05}s` }}
      >
        {/* Hình ảnh và 4 góc thông tin chuẩn chỉ */}
        <div>
          <div className="relative h-52 overflow-hidden bg-night-950">
            <img
              src={displayImg}
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/40 to-transparent" />

            {/* 1. TRÊN CÙNG BÊN TRÁI: Tỷ lệ giảm giá */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/95 backdrop-blur-md text-white font-extrabold text-xs sm:text-sm border border-rose-400/50 shadow-lg shadow-rose-950/70">
                <span>🔥</span>
                <span>-{discountPercent}%</span>
              </span>
            </div>

            {/* 2. TRÊN CÙNG BÊN PHẢI: Tag "Bán chạy" / "Phổ biến" */}
            {product.badge && (
              <div className="absolute top-3 right-3 z-10">
                <span
                  className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg ${BADGE_COLORS[product.badge]} animate-glow-pulse`}
                >
                  {BADGE_LABELS[product.badge]}
                </span>
              </div>
            )}

            {/* 3. DƯỚI CÙNG BÊN TRÁI: Tag "Còn hàng" / "Hết hàng" */}
            <div className="absolute bottom-3 left-3 z-10">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-night-950/90 backdrop-blur-md border border-white/10 ${STOCK_COLORS[product.stock_status]}`}
              >
                {STOCK_LABELS[product.stock_status]}
              </span>
            </div>

            {/* 4. DƯỚI CÙNG BÊN PHẢI: Thời lượng sử dụng */}
            {product.duration && (
              <div className="absolute bottom-3 right-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-night-950/90 backdrop-blur-md border border-gold-400/50 text-gold-300 font-extrabold text-xs sm:text-sm shadow-xl">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  <span>{product.duration}</span>
                </span>
              </div>
            )}
          </div>

          {/* Nội dung thông tin thẻ */}
          <div className="p-5 space-y-3">
            {/* Tên sản phẩm có ghi thời hạn ở cuối tên */}
            <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug min-h-[3rem] line-clamp-2">
              {displayName}
            </h3>

            {/* Meta Tags thông số */}
            <div className="space-y-1.5 text-sm text-gray-300">
              {product.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mystic-400 flex-shrink-0" />
                  <span className="font-medium">
                    Thời hạn: <strong className="text-white">{product.duration}</strong>
                  </span>
                </div>
              )}
              {product.delivery_mode && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-abyss-400 flex-shrink-0" />
                  <span className="font-medium">
                    Hình thức: <span className="text-gray-200">{product.delivery_mode}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Ghi chú mua nhiều thì ib chủ để giảm giá theo yêu cầu */}
            <div className="text-xs text-mystic-300 bg-mystic-500/15 border border-mystic-400/25 px-2.5 py-1.5 rounded-lg flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span>Nếu mua nhiều thì ib chủ shop để giảm giá</span>
            </div>

            {/* Mục giá tiền: Giá gốc bị gạch ngang + Giá chính thức to nổi bật */}
            <div className="pt-2 border-t border-mystic-500/15 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">Giá gốc:</span>
                  <span className="line-through text-gray-400 font-mono text-xs sm:text-sm">
                    {formatVND(originalPrice)}
                  </span>
                </div>
                <span className="text-rose-400 font-bold bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded">
                  Tiết kiệm {discountPercent}%
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                    Đang khuyến mãi chỉ còn:
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gold-300 text-glow-gold">
                    {formatVND(product.price)}
                  </div>
                </div>
                {product.product_type && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-mystic-500/20 text-mystic-200 border border-mystic-400/30 uppercase tracking-wide">
                    {product.product_type}
                  </span>
                )}
              </div>
            </div>

            {/* CƠ CHẾ CHỌN SỐ LƯỢNG HIỆN SẴN TRÊN TỪNG THẺ */}
            <div className="p-2.5 bg-night-950/80 rounded-xl border border-mystic-500/25 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Số lượng mua:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQtyChange(product.id, currentQty - 1)}
                  disabled={currentQty <= 1 || isOutOfStock}
                  className="w-7 h-7 rounded-lg border border-mystic-400/30 flex items-center justify-center text-white hover:bg-mystic-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center font-mono font-bold text-base text-gold-300">
                  {currentQty}
                </span>
                <button
                  type="button"
                  onClick={() => handleQtyChange(product.id, currentQty + 1)}
                  disabled={currentQty >= 50 || isOutOfStock}
                  className="w-7 h-7 rounded-lg border border-mystic-400/30 flex items-center justify-center text-white hover:bg-mystic-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Thêm giỏ & Mua ngay & Chi tiết */}
        <div className="p-5 pt-0 space-y-2">
          {isOutOfStock ? (
            <div className="py-2.5 px-3 rounded-xl text-center text-sm font-bold bg-night-900 border border-red-500/30 text-red-300">
              Tạm hết hàng - Vui lòng liên hệ Admin
            </div>
          ) : (
            <div className="flex gap-2">
              {/* Nút thêm vào giỏ */}
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 ${
                  isAdded
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-night-900 hover:bg-mystic-500/15 border-mystic-400/40 text-mystic-200'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Đã thêm!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 text-gold-400" />
                    <span>Thêm vào giỏ</span>
                  </>
                )}
              </button>

              {/* Nút MUA NGAY (Mở giỏ hàng lớn) */}
              <button
                type="button"
                onClick={() => handleBuyNow(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-mystic-600 to-abyss-600 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-95 transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>MUA NGAY</span>
              </button>
            </div>
          )}

          {/* Nút xem chi tiết */}
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="w-full py-1.5 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem chi tiết tính năng gói</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mystic-500/15 border border-mystic-400/30 mb-4">
            <Package className="w-5 h-5 text-mystic-300" />
            <span className="text-sm font-bold text-mystic-200 uppercase tracking-wider">
              Khu chợ số Fantasy
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-glow mb-4">
            Sản Phẩm Dịch Vụ AI, Proxy & Phần Mềm
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Chọn số lượng và thêm vào giỏ hàng hoặc mua ngay tài khoản Google AI Pro, CapCut Pro, Proxy IPv4 và Canva Pro chất lượng cao.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'ALL', label: 'Tất cả sản phẩm' },
            { id: 'GOOGLE', label: 'Google AI Pro' },
            { id: 'CAPCUT', label: 'CapCut Pro' },
            { id: 'PROXY', label: 'Proxy IPv4' },
            { id: 'CANVA', label: 'Canva Pro' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterType(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filterType === cat.id
                  ? 'bg-gradient-to-r from-mystic-600 to-abyss-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-mystic-400/50'
                  : 'bg-night-800/80 text-gray-300 border border-mystic-500/20 hover:bg-white/5 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-night-700/50" />
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-night-700/50 rounded w-3/4" />
                  <div className="h-4 bg-night-700/50 rounded w-1/2" />
                  <div className="h-10 bg-night-700/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-gray-400 text-base">
            Không tìm thấy sản phẩm trong danh mục này.
          </div>
        ) : (
          <div className="space-y-14">
            {/* ========================================================
                HÀNG 1: BÁN CHẠY (BÁN CHẠY NHẤT) - HÀNG RIÊNG THEO YÊU CẦU
               ======================================================== */}
            {bestSellers.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-gold-500/30 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 to-ember-500 flex items-center justify-center text-night-950 font-bold shadow-lg shadow-gold-500/25">
                      <Flame className="w-6 h-6 text-night-950" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-glow">
                          BÁN CHẠY
                        </h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40 uppercase font-sans font-bold">
                          Hot Deals
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">
                        Các gian hàng được săn đón nhiều nhất, kích hoạt ngay lập tức
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-gold-300 hidden sm:inline-block">
                    {bestSellers.length} sản phẩm
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {bestSellers.map((prod, i) => renderProductCard(prod, i))}
                </div>
              </section>
            )}

            {/* ========================================================
                HÀNG 2: PHỔ BIẾN - HÀNG RIÊNG THEO YÊU CẦU
               ======================================================== */}
            {populars.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-mystic-500/30 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-mystic-500 to-abyss-500 flex items-center justify-center text-white font-bold shadow-lg shadow-mystic-500/25">
                      <Sparkles className="w-6 h-6 text-gold-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-glow">
                          PHỔ BIẾN
                        </h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-mystic-400/20 text-mystic-200 border border-mystic-400/40 uppercase font-sans font-bold">
                          Được tin dùng
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">
                        Lựa chọn tối ưu ngân sách với chất lượng ổn định dài lâu
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-mystic-300 hidden sm:inline-block">
                    {populars.length} sản phẩm
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {populars.map((prod, i) => renderProductCard(prod, i))}
                </div>
              </section>
            )}

            {/* ========================================================
                HÀNG 3: BÌNH THƯỜNG / CÁC MẶT HÀNG KHÁC - HÀNG RIÊNG
               ======================================================== */}
            {others.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-night-700/70 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-night-800 border border-mystic-500/30 flex items-center justify-center text-gray-300 font-bold shadow-md">
                      <Package className="w-6 h-6 text-mystic-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                          CÁC GIAN HÀNG KHÁC
                        </h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-500/20 text-gray-300 border border-gray-500/40 uppercase font-sans font-bold">
                          Sản phẩm khác
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300">
                        Các gói phần mềm và tài khoản hỗ trợ công việc sáng tạo
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400 hidden sm:inline-block">
                    {others.length} sản phẩm
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {others.map((prod, i) => renderProductCard(prod, i))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* FLOATING STICKY CART BAR Ở ĐÁY MÀN HÌNH NẾU ĐÃ CÓ SẢN PHẨM TRONG GIỎ */}
      {totalCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] glass-card p-3 sm:p-4 rounded-2xl border-2 border-gold-500/40 bg-night-900/95 shadow-2xl flex items-center justify-between gap-3 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-300 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 px-1.5 min-w-[1.2rem] h-4.5 text-[10px] font-bold rounded-full bg-ember-500 text-white flex items-center justify-center">
                {totalCount}
              </span>
            </div>
            <div>
              <div className="text-xs text-gray-300 font-medium">
                Giỏ hàng: <strong className="text-white">{totalCount}</strong> món
              </div>
              <div className="font-display text-lg font-bold text-gold-300">
                {formatVND(totalAmount)}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openCart}
            className="btn-gold px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 flex-shrink-0 shadow-lg"
          >
            <span>MỞ GIỎ HÀNG & THANH TOÁN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
