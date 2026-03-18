import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const navLinks = [
  { label: 'Menu', path: '/MalfiMenu' },
  { label: 'Rezervácia', path: '/MalfiReservation' },
  { label: 'O nás', path: '/MalfiAbout' },
  { label: 'Kontakt', path: '/MalfiContact' },
];

export default function MalfiNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/95 backdrop-blur-md border-b border-[rgba(194,149,107,0.15)]' : 'bg-transparent'
      }`}>
        <div className="container-malfi">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link to="/MalfiHome" className="flex items-center group">
              <img 
                src="https://media.base44.com/images/public/69b9c086f46636a7bdaa61f8/2d7f1c5d7_generated_image.png"
                alt="MALFI il cuore italiano"
                className="h-14 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`label-caps transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-gold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/MalfiOrder" className="relative">
                <ShoppingBag className="w-5 h-5 text-text-muted hover:text-gold transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-bg-primary text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/MalfiOrder" className="btn-gold px-5 py-2.5 text-sm">
                Objednať online
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <Link to="/MalfiOrder" className="relative">
                <ShoppingBag className="w-5 h-5 text-text-muted" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-bg-primary text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 flex items-center justify-center text-text-primary"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-bg-secondary border-t border-[rgba(194,149,107,0.15)]">
            <div className="container-malfi py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="label-caps text-text-muted hover:text-gold transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/MalfiOrder" className="btn-gold px-5 py-3 text-center mt-2">
                Objednať online
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-bg-secondary border-t border-[rgba(194,149,107,0.15)] safe-area-bottom">
        <div className="grid grid-cols-2 divide-x divide-[rgba(194,149,107,0.15)]">
          <Link to="/MalfiReservation" className="flex items-center justify-center py-4 text-gold label-caps">
            Rezervovať
          </Link>
          <Link to="/MalfiOrder" className="flex items-center justify-center py-4 btn-gold rounded-none text-sm font-bold">
            Objednať
          </Link>
        </div>
      </div>
    </>
  );
}