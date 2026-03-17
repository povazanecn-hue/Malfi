import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/CartContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, User, ArrowLeft } from 'lucide-react';

const TAX_RATE = 0.20;

export default function MalfiCheckout() {
  const params = new URLSearchParams(window.location.search);
  const orderMode = params.get('mode') || 'pickup';

  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', notes: '', time: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = orderMode === 'delivery' ? 1.99 : 0;
  const tax = cartTotal * TAX_RATE;
  const total = cartTotal + deliveryFee + tax;

  const genOrderNumber = () => `MALFI-${Date.now().toString(36).toUpperCase()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const order = await base44.entities.Order.create({
      order_number: genOrderNumber(),
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      order_type: orderMode,
      delivery_address: form.address,
      notes: form.notes,
      scheduled_time: form.time,
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.item_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        addons: item.addons || [],
        special_instructions: item.special_instructions || '',
      })),
      subtotal: cartTotal,
      tax,
      delivery_fee: deliveryFee,
      total,
      status: 'pending',
      payment_status: 'pending',
    });

    clearCart();
    navigate(`/MalfiOrderSuccess?id=${order.id}`);
  };

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-bg-primary pt-20 pb-24">
      <div className="container-malfi py-10 max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Späť
        </button>

        <div className="label-caps text-gold mb-2">Pokladňa</div>
        <h1 className="font-display text-4xl text-text-primary mb-8">Dokončiť objednávku</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Form */}
            <div className="space-y-6">
              {/* Contact */}
              <div className="card-dark p-6">
                <h3 className="font-display text-lg text-text-primary mb-5 flex items-center gap-2">
                  <User className="w-4 h-4 text-gold" /> Kontaktné údaje
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Meno a priezvisko', type: 'text', required: true, icon: User, full: true },
                    { key: 'email', label: 'Email', type: 'email', required: true, icon: Mail },
                    { key: 'phone', label: 'Telefón', type: 'tel', required: true, icon: Phone },
                  ].map(field => (
                    <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
                      <label className="label-caps text-text-muted text-[10px] mb-1.5 block">{field.label}</label>
                      <input
                        type={field.type}
                        value={form[field.key]}
                        onChange={e => update(field.key, e.target.value)}
                        required={field.required}
                        className="w-full bg-bg-tertiary border border-[rgba(194,149,107,0.2)] rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery / Pickup details */}
              <div className="card-dark p-6">
                <h3 className="font-display text-lg text-text-primary mb-5 flex items-center gap-2">
                  {orderMode === 'delivery' ? <MapPin className="w-4 h-4 text-gold" /> : <Clock className="w-4 h-4 text-gold" />}
                  {orderMode === 'delivery' ? 'Doručovacia adresa' : 'Čas vyzdvihnutia'}
                </h3>
                {orderMode === 'delivery' && (
                  <div>
                    <label className="label-caps text-text-muted text-[10px] mb-1.5 block">Adresa</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => update('address', e.target.value)}
                      required
                      placeholder="Ulica, číslo domu, PSČ"
                      className="w-full bg-bg-tertiary border border-[rgba(194,149,107,0.2)] rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-gold"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <label className="label-caps text-text-muted text-[10px] mb-1.5 block">
                    {orderMode === 'delivery' ? 'Požadovaný čas doručenia' : 'Čas vyzdvihnutia'}
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={e => update('time', e.target.value)}
                    className="w-full bg-bg-tertiary border border-[rgba(194,149,107,0.2)] rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="mt-4">
                  <label className="label-caps text-text-muted text-[10px] mb-1.5 block">Poznámky ku objednávke</label>
                  <textarea
                    value={form.notes}
                    onChange={e => update('notes', e.target.value)}
                    rows={2}
                    placeholder="Špeciálne pokyny, alergie..."
                    className="w-full bg-bg-tertiary border border-[rgba(194,149,107,0.2)] rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted resize-none focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <div className="card-dark p-6 sticky top-24">
                <h3 className="font-display text-lg text-text-primary mb-5">Zhrnutie objednávky</h3>
                <div className="space-y-3 mb-5">
                  {cart.map(item => (
                    <div key={item.cartId || item.id} className="flex justify-between text-sm">
                      <span className="text-text-muted">{item.quantity}× {item.item_name}</span>
                      <span className="text-text-primary">€{(item.unit_price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[rgba(194,149,107,0.15)] pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-text-muted">
                    <span>Medzisúčet</span><span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-text-muted">
                      <span>Rozvoz</span><span>€{deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-text-muted">
                    <span>DPH (20%)</span><span>€{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-primary font-bold text-base pt-2 border-t border-[rgba(194,149,107,0.15)]">
                    <span>Celkom</span>
                    <span className="font-display text-gold text-lg">€{total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting || cart.length === 0}
                  className="btn-gold w-full py-4 mt-6 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Spracovávam...' : 'Potvrdiť objednávku'}
                </button>
                <p className="text-text-muted text-xs text-center mt-3">Platba pri prevzatí alebo v reštaurácii</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}