import { Plus } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const TAG_CONFIG = {
  bestseller: { label: 'Bestseller', class: 'bg-gold/20 text-gold' },
  vegetarian: { label: 'Vegetarián', class: 'bg-olive/20 text-olive' },
  vegan: { label: 'Vegán', class: 'bg-olive/25 text-olive' },
  spicy: { label: 'Pálivé', class: 'bg-terracotta/20 text-terracotta' },
  'gluten-free': { label: 'Bez lepku', class: 'bg-[rgba(194,149,107,0.15)] text-gold-light' },
  seasonal: { label: 'Sezónne', class: 'bg-[rgba(107,124,94,0.2)] text-olive' },
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
      className="card-dark overflow-hidden group cursor-pointer hover:border-[rgba(194,149,107,0.35)] transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-bg-tertiary flex items-center justify-center">
            <span className="font-display text-4xl text-text-muted/30">M</span>
          </div>
        )}
        {/* Tags */}
        {item.dietary_tags && item.dietary_tags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
            {item.dietary_tags.slice(0, 2).map(tag => {
              const config = TAG_CONFIG[tag];
              if (!config) return null;
              return (
                <span key={tag} className={`label-caps text-[9px] px-2 py-1 rounded-full ${config.class}`}>
                  {config.label}
                </span>
              );
            })}
          </div>
        )}
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="label-caps text-text-muted">Nedostupné</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg text-text-primary mb-1">{item.name}</h3>
        {item.description && (
          <p className="text-text-muted text-sm line-clamp-2 mb-4">{item.description}</p>
        )}
        {/* Allergens */}
        {item.dietary_tags && item.dietary_tags.includes('allergens') && (
          <div className="text-text-muted text-xs mb-3">Alergény: {item.dietary_tags.join(', ')}</div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-gold font-bold">€{item.price?.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            disabled={!item.is_available}
            className="w-9 h-9 rounded-full btn-gold flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}