import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function MalfiItemModal({ item, addons, open, onClose }) {
  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [note, setNote] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    if (open) { setQty(1); setSelectedAddons([]); setNote(''); }
  }, [open]);

  if (!item) return null;

  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = (item.price + addonTotal) * qty;

  const toggleAddon = (addon) => {
    setSelectedAddons(prev =>
      prev.find(a => a.id === addon.id) ? prev.filter(a => a.id !== addon.id) : [...prev, addon]
    );
  };

  const handleAdd = () => {
    addToCart({
      id: item.id,
      item_name: item.name,
      unit_price: item.price + addonTotal,
      quantity: qty,
      addons: selectedAddons,
      special_instructions: note,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="bg-bg-secondary border border-[rgba(194,149,107,0.2)] rounded-3xl p-0 max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Image */}
        {item.image_url && (
          <div className="aspect-[16/9] overflow-hidden">
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-6 space-y-5">
          <div>
            <h2 className="font-display text-2xl text-text-primary">{item.name}</h2>
            {item.description && (
              <p className="text-text-muted text-sm mt-2 leading-relaxed">{item.description}</p>
            )}
          </div>

          {/* Addons */}
          {addons.length > 0 && (
            <div>
              <div className="label-caps text-gold mb-3">Extras</div>
              <div className="space-y-2">
                {addons.map(addon => (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedAddons.find(a => a.id === addon.id)
                        ? 'border-gold bg-gold/5'
                        : 'border-[rgba(194,149,107,0.2)] hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        selectedAddons.find(a => a.id === addon.id) ? 'border-gold bg-gold' : 'border-[rgba(194,149,107,0.4)]'
                      }`}>
                        {selectedAddons.find(a => a.id === addon.id) && (
                          <svg className="w-2.5 h-2.5 text-bg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-text-primary text-sm">{addon.name}</span>
                    </div>
                    <span className="text-gold text-sm font-semibold">+€{addon.price.toFixed(2)}</span>
                    <input type="checkbox" className="hidden" checked={!!selectedAddons.find(a => a.id === addon.id)} onChange={() => toggleAddon(addon)} />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            <div className="label-caps text-gold mb-2">Poznámka (voliteľné)</div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Špeciálne požiadavky, alergie..."
              className="w-full bg-bg-tertiary border border-[rgba(194,149,107,0.2)] rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted resize-none focus:outline-none focus:border-gold"
              rows={2}
            />
          </div>

          {/* Qty + Add */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border border-[rgba(194,149,107,0.3)] rounded-full px-2 py-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-gold transition-colors">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-text-primary font-semibold w-6 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-gold transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <button onClick={handleAdd} className="btn-gold flex-1 py-3 flex items-center justify-center gap-2 font-semibold">
              <ShoppingBag className="w-4 h-4" />
              Pridať do košíka · €{total.toFixed(2)}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}