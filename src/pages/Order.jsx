import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ShoppingBag, Truck, Store } from 'lucide-react';
import MenuItemCard from '@/components/menu/MenuItemCard';
import ItemDetailModal from '@/components/menu/ItemDetailModal';
import { useCart } from '@/lib/CartContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Order() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { orderType, setOrderType, itemCount, setIsCartOpen } = useCart();

  const { data: categories = [] } = useQuery({
    queryKey: ['menu-categories'],
    queryFn: () => base44.entities.MenuCategory.filter({ is_active: true }, 'sort_order'),
  });

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => base44.entities.MenuItem.filter({ is_available: true }),
  });

  const { data: addons = [] } = useQuery({
    queryKey: ['item-addons'],
    queryFn: () => base44.entities.ItemAddon.list(),
  });

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category_id === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getItemAddons = (itemId) => addons.filter(a => a.item_id === itemId && a.is_available);

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      {/* Header */}
      <section className="bg-background border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Order Type Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-xl">
              <button
                onClick={() => setOrderType('pickup')}
                className={cn(
                  "flex items-center gap-2 py-2.5 px-5 rounded-lg text-sm font-medium transition-all",
                  orderType === 'pickup'
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Store className="h-4 w-4" />
                Vyzdvihnutie
              </button>
              <button
                onClick={() => setOrderType('delivery')}
                className={cn(
                  "flex items-center gap-2 py-2.5 px-5 rounded-lg text-sm font-medium transition-all",
                  orderType === 'delivery'
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Truck className="h-4 w-4" />
                Donáška
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Hľadať v menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            {/* Cart Button (Mobile) */}
            <Button 
              className="lg:hidden rounded-xl"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Zobraziť košík ({itemCount})
            </Button>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mt-4 overflow-x-auto pb-2 -mx-4 px-4">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="inline-flex h-10 bg-transparent gap-2">
                  <TabsTrigger 
                    value="all" 
                    className="rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Všetky
                  </TabsTrigger>
                  {categories.map((cat) => (
                    <TabsTrigger 
                      key={cat.id} 
                      value={cat.id} 
                      className="rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {searchQuery ? 'Žiadne položky nevyhovujú vášmu hľadaniu' : 'Žiadne položky nie sú dostupné'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                >
                  <MenuItemCard 
                    item={item} 
                    compact
                    onClick={setSelectedItem}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Cart (Desktop) */}
      {itemCount > 0 && (
        <div className="hidden lg:block fixed bottom-8 right-8 z-50">
          <Button 
            size="lg" 
            className="rounded-full shadow-xl h-14 px-6"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Zobraziť košík ({itemCount})
          </Button>
        </div>
      )}

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