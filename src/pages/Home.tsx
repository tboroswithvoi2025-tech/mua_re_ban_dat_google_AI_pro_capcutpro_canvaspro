import { Link } from 'react-router-dom'
import {
  Sparkles,
  MessageCircle,
  ExternalLink,
  Building2,
  Send,
} from 'lucide-react'
import Hero from '@/components/sections/Hero'
import { FOUNDERS, DEFAULT_BANK } from '@/lib/utils'

export default function Home() {
  return (
    <main className="space-y-16 pb-16">
      {/* 1. Hero Section - Tiêu đề to nhất + 3 cam kết ở giữa + Nút khám phá sản phẩm */}
      <Hero />

      {/* 2. THÔNG TIN LIÊN HỆ 2 FOUNDERS Ở CUỐI TRANG CHỦ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="glass-card p-8 sm:p-10 rounded-3xl border-2 border-gold-500/30 bg-night-900/80 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mystic-500/20 border border-mystic-400/30">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-bold text-mystic-200 uppercase tracking-wider">Hỗ Trợ Trực Tiếp</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-glow">
              Liên Hệ Trực Tiếp 2 Founders
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Nếu bạn cần mua số lượng lớn, cần tư vấn gói Google AI Pro hoặc cần hỗ trợ kích hoạt khẩn cấp, vui lòng liên hệ trực tiếp với chúng tôi:
            </p>
          </div>

          {/* Cards 2 founders */}
          {/* Cards 2 founders */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Trần Nhật Quang - Chỉ Zalo */}
            <div className="glass-card p-6 rounded-2xl border border-mystic-500/25 space-y-5 bg-night-950/60">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mystic-600 to-abyss-600 flex items-center justify-center text-white font-display text-xl font-bold border border-mystic-400/30 shadow-md">
                  Q
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Trần Nhật Quang</h3>
                  <p className="text-sm text-mystic-300 font-medium">Founder</p>
                </div>
              </div>

              <div className="glass-card p-4 bg-night-900/80 rounded-xl flex items-center justify-between border border-emerald-500/30">
                <div className="flex items-center gap-2 text-sm text-emerald-300 font-medium">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>Kênh Zalo:</span>
                </div>
                <span className="font-mono text-base font-bold text-gold-300">0357722698</span>
              </div>

              <a
                href="https://zalo.me/0357722698"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Liên hệ qua Zalo (0357722698)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hoàng James - Chỉ Telegram */}
            <div className="glass-card p-6 rounded-2xl border border-mystic-500/25 space-y-5 bg-night-950/60">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-white font-display text-xl font-bold border border-sky-400/30 shadow-md">
                  H
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Hoàng James</h3>
                  <p className="text-sm text-sky-300 font-medium">Co-Founder</p>
                </div>
              </div>

              <div className="glass-card p-4 bg-night-900/80 rounded-xl flex items-center justify-between border border-sky-500/30">
                <div className="flex items-center gap-2 text-sm text-sky-300 font-medium">
                  <Send className="w-5 h-5 text-sky-400" />
                  <span>Kênh Telegram:</span>
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-sky-200">
                  @muarebandatggaiprocapcutprocvasp
                </span>
              </div>

              <a
                href="https://t.me/muarebandatggaiprocapcutprocvasp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-[0_0_20px_rgba(14,165,233,0.4)]"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Liên hệ qua Telegram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Ngân hàng Eximbank tóm tắt */}
          <div className="pt-4 border-t border-mystic-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Building2 className="w-7 h-7 text-gold-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Tài khoản thanh toán chính thức:</div>
                <div className="text-sm text-gray-300">
                  {DEFAULT_BANK.bank_name} - STK: <strong className="font-mono text-gold-300">{DEFAULT_BANK.account_number}</strong> ({DEFAULT_BANK.account_holder})
                </div>
              </div>
            </div>
            <Link to="/contact" className="btn-outline px-5 py-2.5 text-sm font-bold text-white flex-shrink-0">
              Xem trang liên hệ đầy đủ
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
