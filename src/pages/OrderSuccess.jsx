import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('order');

  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => base44.entities.Order.filter({ id: orderId }),
    enabled: !!orderId,
    select: (data) => data[0],
  });

  return (
    <div className="min-h-screen pt-20 bg-muted/30 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="h-10 w-10 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Thank you for your order. We're preparing your delicious meal now.
          </p>
        </motion.div>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 text-left mb-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="text-2xl font-bold font-mono">{order.order_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-primary">${order.total?.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    {order.order_type === 'delivery' ? (
                      <MapPin className="h-5 w-5 text-primary" />
                    ) : (
                      <Clock className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {order.order_type === 'delivery' ? 'Delivery' : 'Pickup'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.order_type === 'delivery' 
                        ? order.delivery_address 
                        : '123 Gourmet Avenue, NY'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Est. {order.order_type === 'delivery' ? '30-45 min' : '20-30 min'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Order Items</p>
                  <div className="space-y-1">
                    {order.items?.map((item, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {item.quantity}x {item.item_name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-muted/50 rounded-xl p-6 mb-8"
        >
          <h3 className="font-semibold mb-4">Questions about your order?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:5551234567" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4" />
              (555) 123-4567
            </a>
            <a href="mailto:orders@lamaison.com" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground">
              <Mail className="h-4 w-4" />
              orders@lamaison.com
            </a>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/Order">
            <Button variant="outline" className="rounded-full px-8">
              Order More
            </Button>
          </Link>
          <Link to="/Home">
            <Button className="rounded-full px-8">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}