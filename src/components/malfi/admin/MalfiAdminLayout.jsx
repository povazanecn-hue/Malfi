import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Calendar, UtensilsCrossed, Package, Settings, Tag, LogOut } from 'lucide-react';

const NAV = [
  { label: 'Dashboard', path: '/MalfiAdmin', icon: LayoutDashboard },
  { label: 'Objednávky', path: '/MalfiAdminOrders', icon: ShoppingBag },
  { label: 'Rezervácie', path: '/MalfiAdminReservations', icon: Calendar },
  { label: 'Menu', path: '/MalfiAdminMenu', icon: UtensilsCrossed },
  { label: 'Produkty', path: '/MalfiAdminProducts', icon: Package },
  { label: 'Promo kódy', path: '/MalfiAdminPromo', icon: Tag },
  { label: 'Nastavenia', path: '/MalfiAdminSettings', icon: Settings },
];

export default function MalfiAdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-olive/10 flex-col shadow-sm">
        <div className="p-6 border-b border-olive/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-olive flex items-center justify-center">
              <span className="font-display text-olive font-bold text-xs">M</span>
            </div>
            <div>
              <div className="font-display text-text-dark font-bold">MALFI</div>
              <div className="label-caps text-text-light text-[10px]">Admin panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active ? 'bg-olive text-white' : 'text-text-medium hover:text-olive hover:bg-olive/8'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-olive/10">
          <Link to="/MalfiHome" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-text-light hover:text-olive hover:bg-olive/8 transition-all">
            <LogOut className="w-4 h-4" />
            Späť na web
          </Link>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-olive/10 shadow-sm">
        <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {NAV.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`shrink-0 flex flex-col items-center gap-1 px-4 py-3 text-[10px] font-semibold transition-all ${
                  active ? 'text-olive border-b-2 border-olive' : 'text-text-light'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="flex-1 overflow-auto pt-0 lg:pt-0">
        <div className="pt-14 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}