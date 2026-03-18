import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { Link } from 'react-router-dom';

const FEATURED = [
  {
    id: 'f1', name: 'Pinsa Classica', price: 12.90, category: 'Pinsa',
    description: 'Paradajková omáčka, mozzarella fior di latte, bazalka',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
  },
  {
    id: 'f2', name: 'Pasta Carbonara', price: 14.50, category: 'Pasta',
    description: 'Guanciale, pecorino romano, vajíčkový žĺtok, čierne korenie',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80',
  },
  {
    id: 'f3', name: 'Risotto ai Funghi', price: 15.90, category: 'Risotto',
    description: 'Lesné huby, parmigiano reggiano, biele víno, truffle oil',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
  },
  {
    id: 'f4', name: 'Tiramisu', price: 7.50, category: 'Dezerty',
    description: 'Klasický domáci tiramisu, mascarpone, espresso, kakao',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
  },
];

export default function FeaturedDishes() {
  const scrollRef = useRef(null);
  const { addToCart } = useCart();

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-pad bg-cream-dark">
      <div className="container-malfi">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="label-caps text-olive mb-3">Šéfkuchárove tipy</div>
            <h2 className="font-display text-4xl text-text-dark">Signature jedlá</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-olive/30 flex items-center justify-center text-text-medium hover:border-olive hover:text-olive transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-olive/30 flex items-center justify-center text-text-medium hover:border-olive hover:text-olive transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {FEATURED.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="snap-start shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden group cursor-pointer shadow-sm border border-[rgba(107,124,94,0.1)] hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="label-caps text-olive mb-2 text-[9px]">{dish.category}</div>
                <h3 className="font-display text-lg text-text-dark mb-1">{dish.name}</h3>
                <p className="text-text-light text-sm mb-4 line-clamp-2">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-text-dark font-bold text-xl font-display">€{dish.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart({ ...dish, quantity: 1, unit_price: dish.price, item_name: dish.name })}
                    className="w-9 h-9 rounded-full bg-rosso text-white flex items-center justify-center hover:bg-[#A93226] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* View all card */}
          <div className="snap-start shrink-0 w-[280px] bg-olive/8 border border-olive/20 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
            <div className="label-caps text-olive mb-3 text-[9px]">Celé menu</div>
            <h3 className="font-display text-lg text-text-dark mb-4">Objaviť viac</h3>
            <Link to="/MalfiMenu" className="btn-outline px-6 py-2.5 text-sm">
              Pozrieť menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}