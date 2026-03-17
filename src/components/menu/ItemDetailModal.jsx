import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { cn } from '@/lib/utils';

export default function ItemDetailModal({ item, addons = [], open, onOpenChange }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addItem } = useCart();

  const handleAddonToggle = (addon) => {
    setSelectedAddons(prev => 
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const calculateTotal = () => {
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return (item.price + addonsTotal) * quantity;
  };

  const handleAddToCart = () => {
    addItem(item, quantity, selectedAddons, specialInstructions);
    onOpenChange(false);
    // Reset state
    setQuantity(1);
    setSelectedAddons([]);
    setSpecialInstructions('');
  };

  if (!item) return null;

  const dietaryColors = {
    vegetarian: 'bg-green-100 text-green-800',
    vegan: 'bg-emerald-100 text-emerald-800',
    'gluten-free': 'bg-amber-100 text-amber-800',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {item.image_url && (
          <div className="aspect-video -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
            <img 
              src={item.image_url} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {item.description && (
            <p className="text-muted-foreground">{item.description}</p>
          )}

          {item.dietary_tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.dietary_tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className={cn(dietaryColors[tag])}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${item.price.toFixed(2)}
            </span>
            {item.prep_time_minutes && (
              <span className="text-sm text-muted-foreground">
                ~{item.prep_time_minutes} min prep time
              </span>
            )}
          </div>

          {/* Addons */}
          {addons.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Add-ons</h4>
              <div className="space-y-2">
                {addons.filter(a => a.is_available).map((addon) => (
                  <label
                    key={addon.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedAddons.some(a => a.id === addon.id)}
                        onCheckedChange={() => handleAddonToggle(addon)}
                      />
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-medium">+${addon.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Special Instructions</label>
            <Textarea
              placeholder="Any allergies or special requests?"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              className="flex-1 h-12 rounded-xl"
              onClick={handleAddToCart}
            >
              Add to Cart · ${calculateTotal().toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}