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
      <div className="container-malfi py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/MalfiHome" className="inline-block">
              <img
                src="https://media.base44.com/images/public/69b9c086f46636a7bdaa61f8/f1cd6fa78_malfi-logo.png"
                alt="MALFI Logo"
                className="h-24 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-xs leading-relaxed">
              Moderná talianska reštaurácia v srdci Bratislavy. Autentická chuť Talianska, lokálne suroviny.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Navigation — 2 columns */}
          <div>
            <h6 className="label-caps text-white/40 mb-4">Navigácia</h6>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: 'Domov', path: '/MalfiHome' },
                { label: 'Alergény', path: '#' },
                { label: 'Menu', path: '/Menu' },
                { label: 'GDPR', path: '#' },
                { label: 'Objednávka', path: '/Order' },
                { label: 'Podmienky', path: '#' },
                { label: 'Rezervácia', path: '/Reservation' },
                { label: 'O nás', path: '/About' },
                { label: 'Kontakt', path: '/Contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-white/60 hover:text-white transition-colors text-xs">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className="label-caps text-white/40 mb-4">Kontakt</h6>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-white/60 text-xs">
                <MapPin className="w-3.5 h-3.5 text-rosso-light mt-0.5 shrink-0" />
                <span>Hurbanovo námestie 1, 811 03 Bratislava</span>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-xs">
                <Phone className="w-3.5 h-3.5 text-rosso-light shrink-0" />
                <a href="tel:+421900000000" className="hover:text-white transition-colors">+421 900 000 000</a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-xs">
                <Mail className="w-3.5 h-3.5 text-rosso-light shrink-0" />
                <a href="mailto:info@malfi.sk" className="hover:text-white transition-colors">info@malfi.sk</a>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-xs">
                <Clock className="w-3.5 h-3.5 text-rosso-light mt-0.5 shrink-0" />
                <div>
                  <div>Po – Pi: 11:00 – 22:00</div>
                  <div>So – Ne: 12:00 – 23:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-5 text-center">
          <p className="text-white/40 text-xs">© 2026 MALFI Talianska Reštaurácia. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
}