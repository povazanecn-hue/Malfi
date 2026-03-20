import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, CalendarDays, ShoppingBag, Info } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const NAV_ITEMS = [
  { label: 'Domov', path: '/MalfiHome', icon: Home },
  { label: 'Menu', path: '/Menu', icon: UtensilsCrossed },
  { label: 'Objednať', path: '/Order', icon: ShoppingBag, primary: true },
  { label: 'Rezervácia', path: '/Reservation', icon: CalendarDays },
  { label: 'O nás', path: '/About', icon: Info },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[rgba(107,124,94,0.15)] top-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5">
        {NAV_ITEMS.map(({ label, path, icon: Icon, primary }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center justify-center py-2.5 gap-1 select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className={`relative flex items-center justify-center w-10 h-8 rounded-2xl transition-all duration-200 ${
                primary
                  ? 'bg-rosso'
                  : isActive
                  ? 'bg-olive/12'
                  : ''
              }`}>
                <Icon className={`w-4.5 h-4.5 ${
                  primary ? 'text-white' : isActive ? 'text-olive' : 'text-text-light'
                }`} style={{ width: 18, height: 18 }} />
                {path === '/Order' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rosso text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium leading-none ${
                primary ? 'text-rosso' : isActive ? 'text-olive' : 'text-text-light'
              }`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}