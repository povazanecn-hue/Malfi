import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function MenuItemCard({ item, onClick, compact = false }) {
  const dietaryColors = {
    vegetarian: 'bg-green-100 text-green-800',
    vegan: 'bg-emerald-100 text-emerald-800',
    'gluten-free': 'bg-amber-100 text-amber-800',
  };

  if (compact) {
    return (
      <Card 
        className={cn(
          "p-4 cursor-pointer transition-all hover:shadow-lg",
          !item.is_available && "opacity-60"
        )}
        onClick={() => item.is_available && onClick?.(item)}
      >
        <div className="flex gap-4">
          {item.image_url && (
            <img 
              src={item.image_url} 
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold truncate">{item.name}</h3>
              <span className="font-bold text-primary shrink-0">
                ${item.price.toFixed(2)}
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {item.description}
              </p>
            )}
            {item.dietary_tags?.length > 0 && (
              <div className="flex gap-1 mt-2">
                {item.dietary_tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className={cn("text-xs", dietaryColors[tag])}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {!item.is_available && (
              <Badge variant="secondary" className="mt-2">
                Currently unavailable
              </Badge>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer transition-all hover:shadow-xl group",
        !item.is_available && "opacity-60"
      )}
      onClick={() => item.is_available && onClick?.(item)}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
          <span className="font-bold text-primary text-lg">
            ${item.price.toFixed(2)}
          </span>
        </div>
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {item.description}
          </p>
        )}
        {item.dietary_tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.dietary_tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className={cn("text-xs", dietaryColors[tag])}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {!item.is_available && (
          <Badge variant="secondary" className="mt-2">
            Currently unavailable
          </Badge>
        )}
      </div>
    </Card>
  );
}