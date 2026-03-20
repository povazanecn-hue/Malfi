import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Star, Quote } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Review.filter({ is_approved: true }, '-created_date', 6)
      .then(data => { setReviews(data); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="container-malfi">
          <div className="text-center mb-14">
            <div className="label-caps text-olive mb-3">Recenzie</div>
            <h2 className="font-display text-4xl text-text-dark">Čo hovoria naši hostia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-olive/8 rounded-3xl p-6">
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-16 w-full mb-5" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-malfi">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="label-caps text-olive mb-3">Recenzie</div>
          <h2 className="font-display text-4xl md:text-5xl text-text-dark">Čo hovoria naši hostia</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-cream rounded-3xl border border-olive/8 p-7 flex flex-col hover:shadow-md hover:shadow-olive/8 transition-all duration-300 relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-8">
                <Quote className="w-8 h-8 text-olive fill-olive" />
              </div>

              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-olive/15 fill-olive/10'}`}
                  />
                ))}
              </div>

              <p className="text-text-dark text-sm leading-relaxed mb-6 flex-1 italic">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-olive/8">
                <div className="w-9 h-9 rounded-full bg-olive/15 flex items-center justify-center">
                  <span className="font-display font-bold text-olive text-sm">
                    {review.customer_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-text-dark font-semibold text-sm">{review.customer_name}</p>
                  <p className="text-text-light text-xs">Overený hosť</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}