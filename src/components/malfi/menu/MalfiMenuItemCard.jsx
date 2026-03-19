import { Plus } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const TAG_CONFIG = {
  bestseller: { label: 'Bestseller', class: 'bg-rosso/10 text-rosso' },
  vegetarian: { label: 'Vegetarián', class: 'bg-olive/15 text-olive-dark' },
  vegan: { label: 'Vegán', class: 'bg-olive/20 text-olive-dark' },
  spicy: { label: 'Pálivé', class: 'bg-terracotta/15 text-terracotta' },
  'gluten-free': { label: 'Bez lepku', class: 'bg-amber-50 text-amber-700' },
  seasonal: { label: 'Sezónne', class: 'bg-olive/15 text-olive-dark' },
};

export default function MalfiMenuItemCard({ item, onClick }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!item.is_available) return;
    addToCart({
      id: item.id,
      item_name: item.name,
      unit_price: item.price,
      quantity: 1,
    });
  };

  return (
    <div
      onClick={() => onClick(item)}
      className="c-card group cursor-pointer hover:border-olive/30 hover:shadow-lg hover:shadow-olive/20"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative -m-5 mb-5">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-cream-dark flex items-center justify-center">
            <span className="font-display text-4xl text-text-light/30">M</span>
          </div>
        )}
        {/* Tags */}
        {item.dietary_tags && item.dietary_tags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
            {item.dietary_tags.slice(0, 2).map(tag => {
              const config = TAG_CONFIG[tag];
              if (!config) return null;
              return (
                <span key={tag} className={`c-badge ${config.class}`}>
                  {config.label}
                </span>
              );
            })}
          </div>
        )}
        {!item.is_available && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="label-caps text-text-light">Nedostupné</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="c-heading is-h3 text-text-dark mb-1">{item.name}</h3>
        {item.description && (
          <p className="text-text-light text-sm line-clamp-2 mb-4">{item.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-text-dark font-bold">€{item.price?.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            disabled={!item.is_available}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-rosso to-[#A93226] text-white flex items-center justify-center hover:shadow-lg hover:shadow-rosso/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-110"
          >
            <Plus className="w-5 h-5 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
}