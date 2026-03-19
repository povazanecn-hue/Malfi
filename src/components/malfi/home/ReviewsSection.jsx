import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await base44.entities.Review.filter({ is_approved: true }, '-created_date', 6);
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="section-pad bg-white">
        <div className="container-malfi">
          <div className="text-center mb-12">
            <div className="label-caps text-olive mb-3">Recenzie</div>
            <h2 className="font-display text-4xl text-text-dark">Čo hovoria naši hostia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="card-light p-6">
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="section-pad bg-white">
      <div className="container-malfi">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="label-caps text-olive mb-3">Recenzie</div>
          <h2 className="font-display text-4xl text-text-dark">Čo hovoria naši hostia</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-light p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-olive/15'}`}
                  />
                ))}
              </div>
              <p className="text-text-dark text-sm leading-relaxed mb-4 flex-1">{review.comment}</p>
              <div>
                <p className="text-text-medium font-semibold text-sm">{review.customer_name}</p>
                <p className="text-text-light text-xs">Overený nákup</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}