import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

export default function MalfiFooter() {
  return (
    <footer className="bg-olive-dark text-white">
      <div className="container-malfi py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start">

          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 md:col-span-1">
            <Link to="/MalfiHome" className="inline-block">
              <img
                src="https://media.base44.com/images/public/69b9c086f46636a7bdaa61f8/f1cd6fa78_malfi-logo.png"
                alt="MALFI Logo"
                className="h-36 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Moderná talianska reštaurácia v srdci Bratislavy. Autentická chuť Talianska, lokálne suroviny.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h6 className="label-caps text-white/40 mb-5">Navigácia</h6>
            <ul className="space-y-3">
              {[
                { label: 'Domov', path: '/MalfiHome' },
                { label: 'Menu', path: '/MalfiMenu' },
                { label: 'Objednávka', path: '/MalfiOrder' },
                { label: 'Rezervácia', path: '/MalfiReservation' },
                { label: 'O nás', path: '/MalfiAbout' },
                { label: 'Kontakt', path: '/MalfiContact' },
              ].map(item => (
                <li key={item.path}>
                  <Link to={item.path} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h6 className="label-caps text-white/40 mb-5">Informácie</h6>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Alergény</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GDPR & Súkromie</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Obchodné podmienky</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className="label-caps text-white/40 mb-5">Kontakt</h6>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-rosso-light mt-0.5 shrink-0" />
                <span>Hurbanovo námestie 1<br />811 03 Bratislava</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-rosso-light shrink-0" />
                <a href="tel:+421900000000" className="hover:text-white transition-colors">+421 900 000 000</a>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-rosso-light shrink-0" />
                <a href="mailto:info@malfi.sk" className="hover:text-white transition-colors">info@malfi.sk</a>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <Clock className="w-4 h-4 text-rosso-light mt-0.5 shrink-0" />
                <div>
                  <div>Po – Pi: 11:00 – 22:00</div>
                  <div>So – Ne: 12:00 – 23:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-white/40 text-xs">© 2026 MALFI Talianska Reštaurácia. Všetky práva vyhradené.</p>
          <p className="text-white/40 text-xs">Hurbanovo námestie 1, Bratislava · <a href="tel:+421900000000" className="hover:text-white/70">+421 900 000 000</a></p>
        </div>
      </div>
    </footer>
  );
}