import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const navLinks = [
  { label: 'Menu', path: '/Menu' },
  { label: 'Rezervácia', path: '/Reservation' },
  { label: 'O nás', path: '/About' },
  { label: 'Kontakt', path: '/Contact' },
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md shadow-olive/10 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[rgba(107,124,94,0.15)]'
          : 'bg-white/80 backdrop-blur-sm border-b border-[rgba(107,124,94,0.1)]'
      }`}>
        <div className="container-malfi">
           <div className="flex items-center justify-between h-auto py-3 md:py-4">
            {/* Logo */}
            <Link to="/MalfiHome" className="flex items-center group">
             <img
               src="https://media.base44.com/images/public/69b9c086f46636a7bdaa61f8/f1cd6fa78_malfi-logo.png"
               alt="Malfi Logo"
               className="h-16 md:h-20 lg:h-28 w-auto object-contain"
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
                      ? 'text-rosso'
                      : 'text-text-medium hover:text-olive'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/Order" className="relative">
                <ShoppingBag className="w-5 h-5 text-text-medium hover:text-olive transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rosso text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/Reservation" className="btn-outline px-5 py-2.5 text-sm">
                Rezervovať
              </Link>
              <Link to="/Order" className="btn-primary px-5 py-2.5 text-sm">
                Objednať
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <Link to="/Order" className="relative">
                <ShoppingBag className="w-5 h-5 text-text-medium" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rosso text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 flex items-center justify-center text-text-dark"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[rgba(107,124,94,0.15)]">
            <div className="container-malfi py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="label-caps text-text-medium hover:text-olive transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-2">
                <Link to="/Reservation" className="btn-outline flex-1 py-3 text-center text-sm">
                  Rezervovať
                </Link>
                <Link to="/Order" className="btn-primary flex-1 py-3 text-center text-sm">
                  Objednať
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>


    </>
  );
}