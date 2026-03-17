import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATUS_COLORS = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  confirmed: 'text-blue-400 bg-blue-400/10',
  preparing: 'text-orange-400 bg-orange-400/10',
  ready: 'text-olive bg-olive/10',
  completed: 'text-text-muted bg-bg-tertiary',
  cancelled: 'text-red-400 bg-red-400/10',
  dispatched: 'text-blue-300 bg-blue-300/10',
  delivered: 'text-olive bg-olive/10',
};

const STATUS_LABELS = {
  pending: 'Nová', confirmed: 'Potvrdená', preparing: 'Pripravuje sa',
  ready: 'Pripravená', completed: 'Dokončená', cancelled: 'Zrušená',
  dispatched: 'Odoslaná', delivered: 'Doručená',
};

export default function MalfiAdmin() {
  const today = new Date().toISOString().split('T')[0];

  const { data: orders = [] } = useQuery({
    queryKey: ['malfi-orders-admin'],
    queryFn: () => base44.entities.Order.list('-created_date', 100),
  });

  const { data: reservations = [] } = useQuery({
    queryKey: ['malfi-reservations-admin'],
    queryFn: () => base44.entities.Reservation.list('-created_date', 50),
  });

  const todayOrders = orders.filter(o => o.created_date?.startsWith?.(today));
  const todayRevenue = todayOrders.filter(o => o.payment_status === 'paid' || o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrders = orders.filter(o => ['pending','confirmed','preparing','ready','dispatched'].includes(o.status));
  const todayReservations = reservations.filter(r => r.date === today);

  const stats = [
    { label: 'Tržby dnes', value: `€${todayRevenue.toFixed(2)}`, icon: TrendingUp, sub: `${todayOrders.length} objednávok` },
    { label: 'Aktívne objednávky', value: activeOrders.length, icon: ShoppingBag, sub: 'Vyžaduje pozornosť', link: '/MalfiAdminOrders' },
    { label: 'Rezervácie dnes', value: todayReservations.length, icon: Calendar, sub: 'Na dnešný deň', link: '/MalfiAdminReservations' },
    { label: 'Priem. objednávka', value: todayOrders.length > 0 ? `€${(todayRevenue / todayOrders.length).toFixed(2)}` : '—', icon: Clock, sub: 'Dnes' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="label-caps text-gold mb-1">Admin panel</div>
        <h1 className="font-display text-3xl text-text-primary">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">{new Date().toLocaleDateString('sk-SK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="card-dark p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-bg-tertiary flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
              </div>
              <div className="font-display text-2xl text-text-primary font-bold">{stat.value}</div>
              <div className="label-caps text-text-muted text-[10px] mt-1">{stat.label}</div>
              <div className="text-text-muted text-xs mt-0.5">{stat.sub}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="card-dark p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl text-text-primary">Posledné objednávky</h2>
            <Link to="/MalfiAdminOrders" className="label-caps text-gold text-[10px] hover:text-gold-light flex items-center gap-1">
              Všetky <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 6).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-bg-tertiary rounded-xl">
                <div>
                  <div className="text-text-primary text-sm font-semibold">{order.customer_name}</div>
                  <div className="text-text-muted text-xs">{order.order_number || order.id.slice(-6)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gold font-bold text-sm">€{order.total?.toFixed(2)}</span>
                  <span className={`label-caps text-[9px] px-2 py-1 rounded-full ${STATUS_COLORS[order.status] || 'text-text-muted bg-bg-tertiary'}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-text-muted text-sm py-4 text-center">Žiadne objednávky</p>}
          </div>
        </div>

        {/* Reservations */}
        <div className="card-dark p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl text-text-primary">Nadchádzajúce rezervácie</h2>
            <Link to="/MalfiAdminReservations" className="label-caps text-gold text-[10px] hover:text-gold-light flex items-center gap-1">
              Všetky <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {reservations.slice(0, 6).map(res => (
              <div key={res.id} className="flex items-center justify-between p-3 bg-bg-tertiary rounded-xl">
                <div>
                  <div className="text-text-primary text-sm font-semibold">{res.customer_name}</div>
                  <div className="text-text-muted text-xs">{res.date} · {res.time} · {res.party_size} osôb</div>
                </div>
                <span className={`label-caps text-[9px] px-2 py-1 rounded-full ${STATUS_COLORS[res.status] || 'text-text-muted bg-bg-tertiary'}`}>
                  {res.status}
                </span>
              </div>
            ))}
            {reservations.length === 0 && <p className="text-text-muted text-sm py-4 text-center">Žiadne rezervácie</p>}
          </div>
        </div>
      </div>
    </div>
  );
}