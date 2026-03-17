import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Skeleton } from '@/components/ui/skeleton';
import { Truck, ShoppingBag, Users, X, Plus, Minus, ShoppingCart, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import MalfiMenuItemCard from '@/components/malfi/menu/MalfiMenuItemCard';
import MalfiItemModal from '@/components/malfi/menu/MalfiItemModal';
import MalfiCartDrawer from '@/components/malfi/order/MalfiCartDrawer';
import { useNavigate } from 'react-router-dom';

const ORDER_MODES = [
  { id: 'delivery', label: 'Rozvoz', icon: Truck },
  { id: 'pickup', label: 'Osobný odber', icon: ShoppingBag },
  { id: 'dine_in', label: 'Dine-in', icon: Users },
];

export default function MalfiOrder() {
  const [mode, setMode] = useState('pickup');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  const { data: categories = [], isLoading: loadingCats } = useQuery({
    queryKey: ['malfi-menu-categories'],
    queryFn: () => base44.entities.MenuCategory.filter({ is_active: true }, 'sort_order'),
  });

  const { data: items = [], isLoading: loadingItems } = useQuery({
    queryKey: ['malfi-menu-items'],
    queryFn: () => base44.entities.MenuItem.filter({ is_available: true }, 'sort_order'),
  });

  const { data: addons = [] } = useQuery({
    queryKey: ['malfi-addons'],
    queryFn: () => base44.entities.ItemAddon.filter({ is_available: true }),
  });

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(i => i.category_id === activeCategory);

  const getAddons = (itemId) => addons.filter(a => a.item_id === itemId);

  return (
    <div className="min-h-screen bg-bg-primary pt-20 pb-24">
      <div className="container-malfi py-10">
        <div className="mb-8">
          <div className="label-caps text-gold mb-2">Online objednávka</div>
          <h1 className="font-display text-4xl text-text-primary">Objednajte online</h1>
        </div>

        {/* Mode selector */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {ORDER_MODES.map(m => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                  mode === m.id ? 'btn-gold' : 'border border-[rgba(194,149,107,0.3)] text-text-muted hover:border-gold hover:text-gold'
                }`}
              >
                <Icon className="w-4 h-4" />
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Category sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === 'all' ? 'bg-gold/15 text-gold' : 'text-text-muted hover:text-gold hover:bg-bg-secondary'
                }`}
              >
                Všetko
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat.id ? 'bg-gold/15 text-gold' : 'text-text-muted hover:text-gold hover:bg-bg-secondary'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile category tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 mb-4 col-span-full" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === 'all' ? 'btn-gold' : 'border border-[rgba(194,149,107,0.3)] text-text-muted'
              }`}
            >Všetko</button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id ? 'btn-gold' : 'border border-[rgba(194,149,107,0.3)] text-text-muted'
                }`}
              >{cat.name}</button>
            ))}
          </div>

          {/* Product grid */}
          <div>
            {loadingItems && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="card-dark overflow-hidden">
                    <Skeleton className="aspect-[4/3] bg-bg-tertiary" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4 bg-bg-tertiary" />
                      <Skeleton className="h-4 w-full bg-bg-tertiary" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loadingItems && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <MalfiMenuItemCard item={item} onClick={setSelectedItem} />
                  </motion.div>
                ))}
              </div>
            )}

            {!loadingItems && filteredItems.length === 0 && (
              <div className="text-center py-20 text-text-muted">Žiadne položky</div>
            )}
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      {cartCount > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-6 btn-gold px-6 py-4 flex items-center gap-3 shadow-2xl z-30"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{cartCount} položiek</span>
          <span className="font-bold">€{cartTotal.toFixed(2)}</span>
        </motion.button>
      )}

      <MalfiItemModal
        item={selectedItem}
        addons={selectedItem ? getAddons(selectedItem.id) : []}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <MalfiCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} orderMode={mode} />
    </div>
  );
}