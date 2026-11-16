import { MessageCircle, Send, Building2, ShieldCheck, Clock, ExternalLink, Sparkles } from 'lucide-react'
import { DEFAULT_BANK } from '@/lib/utils'

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mystic-500/15 border border-mystic-400/30 mb-4">
            <Sparkles className="w-5 h-5 text-gold-400" />
            <span className="text-sm font-bold text-mystic-200 uppercase tracking-wider">Hỗ Trợ 24/7</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white text-glow mb-4">
            Liên Hệ 2 Founders
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ kích hoạt tài khoản, tư vấn gói cước Google AI Pro, CapCut, Proxy, Canva và giải đáp thắc mắc của bạn mọi lúc.
          </p>
        </div>

        {/* 2 FOUNDERS CONTACT CARDS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Trần Nhật Quang - Chỉ Zalo */}
          <div className="glass-card glass-card-hover p-8 rounded-2xl border border-mystic-500/30 space-y-6 relative overflow-hidden group">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mystic-600 to-abyss-600 flex items-center justify-center text-white font-display text-2xl font-bold border border-mystic-400/30 shadow-lg">
                Q
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">
                  Trần Nhật Quang
                </h2>
                <p className="text-sm font-semibold text-mystic-300">Founder</p>
              </div>
            </div>

            <div className="glass-card p-4 bg-night-950/60 rounded-xl space-y-1 border border-emerald-500/30">
              <div className="text-xs text-gray-400 font-medium">Kênh Zalo trực tiếp:</div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-bold text-gold-300">0357722698</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                  Online 24/7
                </span>
              </div>
            </div>

            <a
              href="https://zalo.me/0357722698"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3.5 text-base font-bold flex items-center justify-center gap-2.5 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Nhắn tin Zalo (0357722698)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Hoàng James - Chỉ Telegram */}
          <div className="glass-card glass-card-hover p-8 rounded-2xl border border-mystic-500/30 space-y-6 relative overflow-hidden group">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-white font-display text-2xl font-bold border border-sky-400/30 shadow-lg">
                H
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                  Hoàng James
                </h2>
                <p className="text-sm font-semibold text-sky-300">Co-Founder</p>
              </div>
            </div>

            <div className="glass-card p-4 bg-night-950/60 rounded-xl space-y-1 border border-sky-500/30">
              <div className="text-xs text-gray-400 font-medium">Kênh Telegram hỗ trợ:</div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm sm:text-base font-bold text-sky-200">
                  @muarebandatggaiprocapcutprocvasp
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold">
                  Online 24/7
                </span>
              </div>
            </div>

            <a
              href="https://t.me/muarebandatggaiprocapcutprocvasp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3.5 text-base font-bold flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-[0_0_25px_rgba(14,165,233,0.4)]"
            >
              <Send className="w-5 h-5 text-white" />
              <span>Nhắn tin Telegram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* THÔNG TIN NGÂN HÀNG CHÍNH THỨC */}
        <div className="glass-card p-8 rounded-2xl border border-gold-500/30 bg-night-900/50 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gold-300" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">Tài Khoản Thanh Toán Chính Thức</h3>
              <p className="text-sm text-gray-400">Dành cho khách hàng thanh toán chuyển khoản đơn hàng</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-4 bg-night-950/70 rounded-xl">
              <div className="text-xs text-gray-400 mb-1">Ngân hàng</div>
              <div className="text-lg font-bold text-white">{DEFAULT_BANK.bank_name}</div>
            </div>
            <div className="glass-card p-4 bg-night-950/70 rounded-xl">
              <div className="text-xs text-gray-400 mb-1">Số tài khoản</div>
              <div className="font-mono text-xl font-bold text-gold-300">{DEFAULT_BANK.account_number}</div>
            </div>
            <div className="glass-card p-4 bg-night-950/70 rounded-xl">
              <div className="text-xs text-gray-400 mb-1">Chủ tài khoản</div>
              <div className="text-lg font-bold text-white">{DEFAULT_BANK.account_holder}</div>
            </div>
          </div>
        </div>

        {/* CAM KẾT HỖ TRỢ */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="glass-card p-5 rounded-xl flex items-center gap-3 border border-mystic-500/20">
            <Clock className="w-8 h-8 text-mystic-400 flex-shrink-0" />
            <div>
              <div className="text-white font-bold">Thời gian hỗ trợ</div>
              <div>Phản hồi Zalo và xử lý đơn hàng từ 8h00 - 24h00 hàng ngày (kể cả Thứ 7, CN và ngày lễ).</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-xl flex items-center gap-3 border border-mystic-500/20">
            <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-white font-bold">Bảo hành uy tín</div>
              <div>Xử lý mọi vấn đề phát sinh trong quá trình sử dụng một cách nhanh chóng và trách nhiệm.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
