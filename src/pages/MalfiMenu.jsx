import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import MalfiMenuItemCard from '@/components/malfi/menu/MalfiMenuItemCard';
import MalfiItemModal from '@/components/malfi/menu/MalfiItemModal';

const ALLERGEN_LABELS = {
  gluten: 'G', dairy: 'D', eggs: 'V', nuts: 'O', fish: 'R', soy: 'S', celery: 'C', mustard: 'H'
};

const TAG_COLORS = {
  bestseller: 'bg-gold/20 text-gold',
  vegetarian: 'bg-olive/20 text-olive',
  vegan: 'bg-olive/30 text-olive',
  spicy: 'bg-terracotta/20 text-terracotta',
  'gluten-free': 'bg-[rgba(194,149,107,0.15)] text-gold-light',
  seasonal: 'bg-[rgba(107,124,94,0.2)] text-olive',
};

export default function MalfiMenu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

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
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Menu"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary" />
        </div>
        <div className="relative z-10 container-malfi text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="label-caps text-gold mb-4">Naša ponuka</div>
            <h1 className="font-display text-5xl md:text-6xl text-text-primary font-bold">Menu</h1>
            <p className="text-text-muted mt-4 max-w-md mx-auto">
              Sezónne suroviny, talianské techniky, nezabudnuteľné chute
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-malfi">
        {/* Category tabs */}
        {!loadingCats && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 sticky top-20 bg-bg-primary/95 backdrop-blur py-3 -mx-5 px-5 z-20" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'btn-gold'
                  : 'border border-[rgba(194,149,107,0.3)] text-text-muted hover:text-gold hover:border-gold'
              }`}
            >
              Všetko
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'btn-gold'
                    : 'border border-[rgba(194,149,107,0.3)] text-text-muted hover:text-gold hover:border-gold'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {(loadingCats || loadingItems) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => (
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

        {/* Items grid */}
        {!loadingItems && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <MalfiMenuItemCard item={item} onClick={setSelectedItem} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loadingItems && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">Žiadne položky v tejto kategórii</p>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 md:bottom-6 left-0 right-0 z-30 pointer-events-none">
        <div className="container-malfi flex justify-center">
          <Link to="/MalfiOrder" className="btn-gold px-8 py-4 pointer-events-auto shadow-2xl flex items-center gap-2">
            Objednať online
          </Link>
        </div>
      </div>

      {/* Item Modal */}
      <MalfiItemModal
        item={selectedItem}
        addons={selectedItem ? getAddons(selectedItem.id) : []}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}