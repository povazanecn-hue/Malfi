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
            className="fixed inset-0 bg-black/40 z-40"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[85vw] sm:w-full sm:max-w-md bg-white border-l border-olive/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-olive/10">
              <h2 className="font-display text-lg sm:text-xl text-text-dark">Váš košík</h2>
              <button onClick={onClose} className="w-11 h-11 flex items-center justify-center text-text-light hover:text-text-dark transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-text-light">
                  <div className="font-display text-3xl mb-2">🛒</div>
                  <p>Košík je prázdny</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartId || item.id} className="flex gap-4 p-4 bg-cream rounded-2xl border border-olive/8">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-text-dark text-sm sm:text-base truncate">{item.item_name}</div>
                      {item.addons?.length > 0 && (
                        <div className="text-text-light text-xs mt-0.5">{item.addons.map(a => a.name).join(', ')}</div>
                      )}
                      <div className="text-rosso font-bold text-sm mt-1">€{(item.unit_price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.cartId || item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-olive/25 flex items-center justify-center text-text-medium hover:text-olive hover:border-olive transition-all">
                        {item.quantity === 1 ? <Trash2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                      </button>
                      <span className="text-text-dark font-semibold w-5 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId || item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-olive/25 flex items-center justify-center text-text-medium hover:text-olive hover:border-olive transition-all">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo + Summary */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-olive/10 space-y-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
                {/* Promo code */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoError(''); }}
                      placeholder="Promo kód"
                      className="w-full bg-cream border border-olive/20 rounded-xl pl-9 pr-3 py-2.5 text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-olive"
                      disabled={!!promoApplied}
                    />
                  </div>
                  {promoApplied ? (
                    <button onClick={() => { setPromoApplied(null); setPromoCode(''); }}
                      className="px-4 py-2.5 rounded-xl border border-olive/25 text-text-medium hover:text-olive text-sm">
                      Odstrániť
                    </button>
                  ) : (
                    <button onClick={applyPromo}
                      className="px-4 py-2.5 rounded-xl btn-olive text-sm">
                      Použiť
                    </button>
                  )}
                </div>
                {promoError && <p className="text-rosso text-xs">{promoError}</p>}
                {promoApplied && <p className="text-olive text-xs">✓ Kód aplikovaný: -{promoApplied.discount_type === 'percentage' ? `${promoApplied.discount_value}%` : `€${promoApplied.discount_value.toFixed(2)}`}</p>}

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-text-light">
                    <span>Medzisúčet</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-text-light">
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
                  <div className="flex justify-between text-text-dark font-bold text-base pt-2 border-t border-olive/10">
                    <span>Spolu</span>
                    <span className="text-rosso font-display text-lg">€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={handleCheckout} className="btn-primary w-full py-4 min-h-[48px] flex items-center justify-center gap-2 font-semibold">
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