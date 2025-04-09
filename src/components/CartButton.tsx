import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  itemId: string;
  outletId: string;
  name: string;
  price: number;
  image: string;
}

const CartButton: React.FC<CartButtonProps> = ({ itemId, outletId, name, price, image }) => {
  const { addToCart, removeFromCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(itemId, outletId);

  const handleAddToCart = () => {
    addToCart({ id: itemId, outletId, name, price, image });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(itemId, outletId, newQuantity);
  };

  if (quantity === 0) {
    return (
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleUpdateQuantity(quantity - 1)}
        className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-semibold text-lg min-w-[2rem] text-center">{quantity}</span>
      <button
        onClick={() => handleUpdateQuantity(quantity + 1)}
        className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartButton; 