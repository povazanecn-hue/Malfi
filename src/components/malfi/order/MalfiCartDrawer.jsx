import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function MalfiCartDrawer({ open, onClose, orderMode }) {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();

  const deliveryFee = orderMode === 'delivery' ? 1.99 : 0;
  const discount = promoApplied?.discount_type === 'percentage'
    ? cartTotal * (promoApplied.discount_value / 100)
    : promoApplied?.discount_type === 'fixed' ? promoApplied.discount_value : 0;
  const finalTotal = cartTotal + deliveryFee - discount;

  const applyPromo = async () => {
    setPromoError('');
    const results = await base44.entities.PromoCode.filter({ code: promoCode.toUpperCase(), is_active: true });
    const promo = results[0];
    if (!promo) {
      setPromoError('Neplatný promo kód');
      return;
    }
    if (promo.min_order && cartTotal < promo.min_order) {
      setPromoError(`Minimálna objednávka €${promo.min_order.toFixed(2)}`);
      return;
    }
    setPromoApplied(promo);
  };

  const handleCheckout = () => {
    onClose();
    navigate(`/MalfiCheckout?mode=${orderMode}${promoApplied ? `&promo=${promoApplied.code}` : ''}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-bg-secondary border-l border-[rgba(194,149,107,0.2)] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[rgba(194,149,107,0.15)]">
              <h2 className="font-display text-xl text-text-primary">Váš košík</h2>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-gold transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-text-muted">
                  <div className="font-display text-3xl mb-2">🛒</div>
                  <p>Košík je prázdny</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartId || item.id} className="flex gap-4 p-4 bg-bg-tertiary rounded-2xl">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-text-primary text-sm truncate">{item.item_name}</div>
                      {item.addons?.length > 0 && (
                        <div className="text-text-muted text-xs mt-0.5">{item.addons.map(a => a.name).join(', ')}</div>
                      )}
                      <div className="text-gold font-bold text-sm mt-1">€{(item.unit_price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.cartId || item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-[rgba(194,149,107,0.3)] flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-all">
                        {item.quantity === 1 ? <Trash2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                      </button>
                      <span className="text-text-primary font-semibold w-5 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId || item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-[rgba(194,149,107,0.3)] flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-all">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo + Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[rgba(194,149,107,0.15)] space-y-4">
                {/* Promo code */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoError(''); }}
                      placeholder="Promo kód"
                      className="w-full bg-bg-tertiary border border-[rgba(194,149,107,0.2)] rounded-xl pl-9 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold"
                      disabled={!!promoApplied}
                    />
                  </div>
                  {promoApplied ? (
                    <button onClick={() => { setPromoApplied(null); setPromoCode(''); }}
                      className="px-4 py-2.5 rounded-xl border border-[rgba(194,149,107,0.3)] text-text-muted hover:text-gold text-sm">
                      Odstrániť
                    </button>
                  ) : (
                    <button onClick={applyPromo}
                      className="px-4 py-2.5 rounded-xl btn-gold text-sm">
                      Použiť
                    </button>
                  )}
                </div>
                {promoError && <p className="text-red-400 text-xs">{promoError}</p>}
                {promoApplied && <p className="text-olive text-xs">✓ Kód aplikovaný: -{promoApplied.discount_type === 'percentage' ? `${promoApplied.discount_value}%` : `€${promoApplied.discount_value.toFixed(2)}`}</p>}

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-text-muted">
                    <span>Medzisúčet</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-text-muted">
                      <span>Rozvoz</span>
                      <span>€{deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-olive">
                      <span>Zľava</span>
                      <span>-€{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-text-primary font-bold text-base pt-2 border-t border-[rgba(194,149,107,0.15)]">
                    <span>Spolu</span>
                    <span className="text-gold font-display text-lg">€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={handleCheckout} className="btn-gold w-full py-4 flex items-center justify-center gap-2 font-semibold">
                  Pokračovať k platbe <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}