import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { Link } from 'react-router-dom';

const FEATURED = [
  {
    id: 'f1', name: 'Pinsa Classica', price: 12.90, category: 'Pinsa',
    description: 'Paradajková omáčka, mozzarella fior di latte, bazalka',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    badge: 'Bestseller',
  },
  {
    id: 'f2', name: 'Pasta Carbonara', price: 14.50, category: 'Pasta',
    description: 'Guanciale, pecorino romano, vajíčkový žĺtok, čierne korenie',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80',
    badge: 'Šéfkucharov výber',
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
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--cream-dark)' }}>
      <div className="container-malfi">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-rosso" />
              <span className="label-caps text-rosso text-[10px]">Šéfkuchárove tipy</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-text-dark">Signature jedlá</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll(-1)}
              className="w-11 h-11 rounded-full border border-olive/25 flex items-center justify-center text-text-medium hover:bg-olive hover:text-white hover:border-olive transition-all duration-200 group">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll(1)}
              className="w-11 h-11 rounded-full border border-olive/25 flex items-center justify-center text-text-medium hover:bg-olive hover:text-white hover:border-olive transition-all duration-200 group">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

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
              transition={{ delay: idx * 0.08 }}
              className="snap-start shrink-0 w-[290px] bg-white rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-olive/8 hover:shadow-xl hover:shadow-olive/8 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {dish.badge && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-rosso label-caps text-[9px] px-2.5 py-1 rounded-full shadow-sm">
                    {dish.badge}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 label-caps text-white/80 text-[9px] bg-black/25 backdrop-blur-sm px-2 py-1 rounded-full">
                  {dish.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-text-dark mb-1.5">{dish.name}</h3>
                <p className="text-text-light text-sm mb-4 line-clamp-2 leading-relaxed">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-text-dark font-bold text-2xl font-display">€{dish.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart({ ...dish, quantity: 1, unit_price: dish.price, item_name: dish.name })}
                    className="w-10 h-10 rounded-full bg-rosso text-white flex items-center justify-center hover:bg-[#A93226] transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-rosso/30 hover:shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="snap-start shrink-0 w-[290px] bg-gradient-to-br from-olive/8 to-cream border border-olive/15 rounded-3xl flex flex-col items-center justify-center p-10 text-center">
            <div className="w-14 h-14 rounded-full border border-olive/25 flex items-center justify-center mb-5">
              <ArrowRight className="w-5 h-5 text-olive" />
            </div>
            <div className="label-caps text-olive text-[10px] mb-2">Celé menu</div>
            <h3 className="font-display text-xl text-text-dark mb-5">Objaviť viac</h3>
            <Link to="/Menu" className="btn-outline px-6 py-2.5 text-sm">
              Pozrieť menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}