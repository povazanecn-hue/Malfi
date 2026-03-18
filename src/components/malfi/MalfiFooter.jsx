import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function MalfiFooter() {
  return (
    <footer className="bg-olive-dark text-white">
      <div className="container-malfi py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center">
                <span className="font-display text-white font-bold text-base">M</span>
              </div>
              <div>
                <div className="font-display text-white font-bold text-xl">MALFI</div>
                <div className="label-caps text-white/50 text-[9px]">Italian Bistro</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Moderné talianske bistro v srdci Bratislavy. Autentická chuť Talianska, lokálne suroviny.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
                <Facebook className="w-4 h-4" />
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
              <li><Link to="/MalfiContact" className="hover:text-white transition-colors">Kontakt</Link></li>
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

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© 2024 MALFI Italian Bistro. Všetky práva vyhradené.</p>
          <p className="text-white/40 text-xs">Hurbanovo námestie 1, Bratislava · <a href="tel:+421900000000" className="hover:text-white/70">+421 900 000 000</a></p>
        </div>
      </div>
    </footer>
  );
}