import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  outletId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string, outletId: string) => void;
  updateQuantity: (itemId: string, outletId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string, outletId: string) => number;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(
        cartItem => cartItem.id === item.id && cartItem.outletId === item.outletId
      );

      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id && cartItem.outletId === item.outletId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string, outletId: string) => {
    setCart(currentCart => 
      currentCart.filter(item => !(item.id === itemId && item.outletId === outletId))
    );
  };

  const updateQuantity = (itemId: string, outletId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId, outletId);
      return;
    }

    setCart(currentCart =>
      currentCart.map(item =>
        item.id === itemId && item.outletId === outletId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (itemId: string, outletId: string) => {
    const item = cart.find(item => item.id === itemId && item.outletId === outletId);
    return item?.quantity || 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemQuantity,
      totalItems,
      totalAmount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 