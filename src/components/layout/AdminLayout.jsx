import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Calendar, UtensilsCrossed, Package, Settings, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const adminLinks = [
  { href: '/Admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/AdminOrders', label: 'Orders', icon: ShoppingBag },
  { href: '/AdminReservations', label: 'Reservations', icon: Calendar },
  { href: '/AdminMenu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/AdminProducts', label: 'Products', icon: Package },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-background border-r flex-col">
        <div className="p-6 border-b">
          <Link to="/Home" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <h1 className="font-display text-xl font-bold mt-4">La Maison</h1>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-background border-b z-50">
        <div className="flex items-center gap-4 px-4 h-14 overflow-x-auto">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors",
                location.pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}