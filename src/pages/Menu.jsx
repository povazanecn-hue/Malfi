import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import MenuItemCard from '@/components/menu/MenuItemCard';
import ItemDetailModal from '@/components/menu/ItemDetailModal';
import { motion } from 'framer-motion';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['menu-categories'],
    queryFn: () => base44.entities.MenuCategory.filter({ is_active: true }, 'sort_order'),
  });

  const { data: items = [], isLoading: loadingItems } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => base44.entities.MenuItem.list('category_id'),
  });

  const { data: addons = [] } = useQuery({
    queryKey: ['item-addons'],
    queryFn: () => base44.entities.ItemAddon.list(),
  });

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category_id === selectedCategory);

  const getItemAddons = (itemId) => addons.filter(a => a.item_id === itemId);

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || 'Uncategorized';
  };

  const groupedItems = filteredItems.reduce((acc, item) => {
    const catName = getCategoryName(item.category_id);
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/__generating__/img_7c9945899b64.png)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm tracking-[0.3em] uppercase mb-4 text-white/80"
          >
            Discover
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-xl mx-auto"
          >
            Seasonal ingredients, timeless techniques, unforgettable flavors
          </motion.p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-12 overflow-x-auto pb-2">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="inline-flex h-12 bg-muted p-1 rounded-xl">
                  <TabsTrigger value="all" className="rounded-lg px-6">
                    All
                  </TabsTrigger>
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.id} value={cat.id} className="rounded-lg px-6">
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}

          {/* Loading State */}
          {(loadingCategories || loadingItems) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3] rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Menu Items by Category */}
          {!loadingItems && selectedCategory === 'all' ? (
            <div className="space-y-16">
              {Object.entries(groupedItems).map(([categoryName, categoryItems]) => (
                <div key={categoryName}>
                  <h2 className="font-display text-3xl font-bold mb-8 pb-4 border-b">
                    {categoryName}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <MenuItemCard 
                          item={item} 
                          onClick={setSelectedItem}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <MenuItemCard 
                    item={item} 
                    onClick={setSelectedItem}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loadingItems && filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No items available in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        addons={selectedItem ? getItemAddons(selectedItem.id) : []}
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      />
    </div>
  );
}