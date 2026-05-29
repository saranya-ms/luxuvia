import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const whatsappUrl =
    'https://wa.me/918877555999?text=Hi%2C%20I%27m%20interested%20in%20Luxuvia%20projects';

  return (
    <div data-testid="whatsapp-widget" className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-4 w-80 overflow-hidden rounded-3xl border border-[#1a2440] bg-[#0f1628] shadow-pop animate-slide-right">
          <div className="bg-[#075e54] px-4 py-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
              <MessageCircle size={20} />
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm uppercase tracking-[0.18em] text-white">Live Support</p>
              <p className="font-body text-xs text-[#d2f1e8]">Typically replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="rounded-full p-2 text-white hover:bg-white/10"
              data-testid="whatsapp-close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="space-y-4 px-4 py-5">
            <div className="rounded-3xl bg-[#11203c] p-4">
              <p className="font-body text-sm text-[#eef1f6]">Connect with us instantly on WhatsApp for quick responses.</p>
              <p className="font-body text-xs text-[#8090b0] mt-3">Hi, I'm interested in Luxuvia projects.</p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-link"
              className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-[#25d366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
            >
              <MessageCircle size={16} />
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid="whatsapp-toggle"
        className="wa-pulse flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-all duration-300 hover:bg-[#20bd5a]"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
