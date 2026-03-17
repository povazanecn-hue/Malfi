import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Check, Loader2, MapPin, Clock } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const TAX_RATE = 0.08;
const DELIVERY_FEE = 5.00;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, orderType, subtotal, getItemTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_address: '',
    scheduled_time: '',
    notes: ''
  });

  const tax = subtotal * TAX_RATE;
  const deliveryFee = orderType === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + tax + deliveryFee;

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `LM-${timestamp}${random}`;
  };

  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      return base44.entities.Order.create(orderData);
    },
    onSuccess: (order) => {
      clearCart();
      navigate(`/OrderSuccess?order=${order.id}`);
    },
    onError: () => {
      toast.error('Nepodarilo sa odoslať objednávku. Skúste to znova.');
      setIsProcessing(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Váš košík je prázdny');
      return;
    }

    setIsProcessing(true);

    const orderData = {
      order_number: generateOrderNumber(),
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      order_type: orderType,
      delivery_address: orderType === 'delivery' ? formData.delivery_address : null,
      items: items.map(item => ({
        item_id: item.item_id,
        item_name: item.item_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        addons: item.addons,
        special_instructions: item.special_instructions
      })),
      subtotal: subtotal,
      tax: tax,
      delivery_fee: deliveryFee,
      total: total,
      status: 'pending',
      payment_status: 'paid', // Simulated payment
      scheduled_time: formData.scheduled_time || null,
      notes: formData.notes || null
    };

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    createOrderMutation.mutate(orderData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Váš košík je prázdny</h2>
          <Link to="/Order">
            <Button>Prejsť do menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/Order" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Späť do menu
        </Link>

        <h1 className="font-display text-3xl font-bold mb-8">Dokončiť objednávku</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-4">Kontaktné informácie</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="customer_name">Meno a priezvisko *</Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      required
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customer_email">Email *</Label>
                      <Input
                        id="customer_email"
                        name="customer_email"
                        type="email"
                        required
                        value={formData.customer_email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer_phone">Telefón *</Label>
                      <Input
                        id="customer_phone"
                        name="customer_phone"
                        type="tel"
                        required
                        value={formData.customer_phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-lg">Adresa doručenia</h2>
                  </div>
                  <div>
                    <Label htmlFor="delivery_address">Úplná adresa *</Label>
                    <Textarea
                      id="delivery_address"
                      name="delivery_address"
                      required
                      value={formData.delivery_address}
                      onChange={handleInputChange}
                      placeholder="Ulica, číslo, mesto, PSČ"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </Card>
              )}

              {/* Scheduled Time */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">
                    {orderType === 'pickup' ? 'Čas vyzdvihnutia' : 'Čas doručenia'}
                  </h2>
                </div>
                <div>
                  <Label htmlFor="scheduled_time">Preferovaný čas (voliteľné)</Label>
                  <Input
                    id="scheduled_time"
                    name="scheduled_time"
                    type="time"
                    value={formData.scheduled_time}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Nechajte prázdne pre čo najskôr ({orderType === 'pickup' ? '20–30 min' : '30–45 min'})
                  </p>
                </div>
              </Card>

              {/* Special Instructions */}
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-4">Špeciálne inštrukcie</h2>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Špeciálne požiadavky alebo inštrukcie pre doručenie..."
                  rows={3}
                />
              </Card>

              {/* Payment (Simplified) */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">Platba</h2>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <p className="text-muted-foreground">
                    Platba bude bezpečne spracovaná po potvrdení objednávky
                  </p>
                </div>
              </Card>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 rounded-xl text-base"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Spracovávam objednávku...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Objednať · €{total.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 sticky top-28">
              <h2 className="font-semibold text-lg mb-4">Súhrn objednávky</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    {item.image_url && (
                      <img 
                        src={item.image_url}
                        alt={item.item_name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="font-medium truncate">{item.item_name}</span>
                        <span className="font-medium ml-2">${getItemTotal(item).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Počet: {item.quantity}</p>
                      {item.addons.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          + {item.addons.map(a => a.addon_name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medzisúčet</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">DPH</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Poplatok za doručenie</span>
                    <span>€{deliveryFee.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Celkom</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}