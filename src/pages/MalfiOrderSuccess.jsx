import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Star } from 'lucide-react';

export default function MalfiOrderSuccess() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('id');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { data: order } = useQuery({
    queryKey: ['malfi-order', orderId],
    queryFn: () => base44.entities.Order.filter({ id: orderId }).then(r => r[0]),
    enabled: !!orderId,
  });

  const reviewMutation = useMutation({
    mutationFn: (reviewData) => base44.entities.Review.create(reviewData),
    onSuccess: () => {
      setShowReviewForm(false);
      setRating(5);
      setComment('');
    },
  });

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    await reviewMutation.mutate({
      order_id: orderId,
      customer_name: order?.customer_name,
      customer_email: order?.customer_email,
      rating,
      comment,
      is_approved: true,
    });
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-20 flex items-center justify-center pb-24">
      <div className="container-malfi max-w-lg text-center py-16">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
          <div className="w-20 h-20 rounded-full bg-olive/20 border border-olive/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-olive" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="label-caps text-gold mb-3">Ďakujeme!</div>
          <h1 className="font-display text-4xl text-text-primary mb-4">Objednávka prijatá</h1>
          <p className="text-text-muted mb-8">
            Vaša objednávka bola úspešne odoslaná. Čoskoro vás budeme kontaktovať.
          </p>

          {order && (
            <div className="card-dark p-6 text-left mb-8">
              <div className="label-caps text-gold mb-4">{order.order_number}</div>
              <div className="space-y-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-text-muted">{item.quantity}× {item.item_name}</span>
                    <span className="text-text-primary">€{(item.unit_price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[rgba(194,149,107,0.15)] mt-4 pt-4 flex justify-between">
                <span className="font-display text-text-primary">Celkom</span>
                <span className="font-display text-gold text-lg">€{order.total?.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 justify-center text-text-muted text-sm mb-8">
            <Clock className="w-4 h-4 text-gold" />
            <span>Odhadovaný čas: 25–35 minút</span>
          </div>

          {!showReviewForm ? (
            <>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/MalfiMenu" className="btn-outline-gold px-8 py-3">Späť na menu</Link>
                <Link to="/MalfiHome" className="btn-gold px-8 py-3">Domov</Link>
              </div>
              <button
                onClick={() => setShowReviewForm(true)}
                className="mt-6 text-gold hover:text-rosso transition-colors text-sm font-semibold"
              >
                Zanechať recenziu
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmitReview} className="card-dark p-6 text-left mt-8">
              <h3 className="font-display text-lg text-text-primary mb-4">Vaše hodnotenie</h3>
              <div className="mb-4">
                <label className="label-caps text-text-muted text-[10px] mb-2 block">Hodnotenie</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`w-6 h-6 ${n <= rating ? 'fill-gold text-gold' : 'text-gold/25'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="label-caps text-text-muted text-[10px] mb-2 block">Komentár</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Vaše skúsenosti s nami..."
                  className="w-full bg-white border border-olive/20 rounded-xl px-4 py-3 text-text-dark text-sm placeholder:text-text-light resize-none focus:outline-none focus:border-olive"
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="btn-outline-gold flex-1 py-2 text-sm"
                >
                  Zrušiť
                </button>
                <button
                  type="submit"
                  disabled={reviewMutation.isPending}
                  className="btn-gold flex-1 py-2 text-sm disabled:opacity-60"
                >
                  {reviewMutation.isPending ? 'Posielam...' : 'Odoslať'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-text-muted text-sm">
            Otázky? <a href="tel:+421900000000" className="text-gold hover:underline">+421 900 000 000</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}