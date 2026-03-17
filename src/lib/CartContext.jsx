import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orderType, setOrderType] = useState('pickup');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item, quantity = 1, addons = [], specialInstructions = '') => {
    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      item_id: item.id,
      item_name: item.name,
      unit_price: item.price,
      quantity,
      addons: addons.map(a => ({
        addon_id: a.id,
        addon_name: a.name,
        price: a.price
      })),
      special_instructions: specialInstructions,
      image_url: item.image_url
    };
    setItems(prev => [...prev, cartItem]);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems(prev => prev.map(item => 
      item.id === cartItemId ? { ...item, quantity } : item
    ));
  };

  const removeItem = (cartItemId) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemTotal = (item) => {
    const addonsTotal = item.addons.reduce((sum, addon) => sum + addon.price, 0);
    return (item.unit_price + addonsTotal) * item.quantity;
  };

  const subtotal = items.reduce((sum, item) => sum + getItemTotal(item), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      orderType,
      setOrderType,
      isCartOpen,
      setIsCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      getItemTotal,
      subtotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};