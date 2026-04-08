import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartButtonProps {
  itemId: string;
  outletId?: string;
  name: string;
  price: number;
  image: string;
}

const CartButton: React.FC<CartButtonProps> = ({ itemId, name, price, image }) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(itemId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: itemId, name, price, image });
  };

  const handleUpdateQuantity = (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(itemId, newQuantity);
  };

  if (quantity === 0) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-bold text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Add to Cart</span>
      </motion.button>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-xl border border-blue-100 dark:border-blue-800/30">
      <button
        onClick={(e) => handleUpdateQuantity(e, quantity - 1)}
        className="p-2 rounded-lg bg-white dark:bg-neutral-800 text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <AnimatePresence mode="wait">
        <motion.span 
          key={quantity}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-black text-blue-950 dark:text-white min-w-[1.5rem] text-center"
        >
          {quantity}
        </motion.span>
      </AnimatePresence>
      <button
        onClick={(e) => handleUpdateQuantity(e, quantity + 1)}
        className="p-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartButton; 
