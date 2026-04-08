import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, ShoppingCart, Trash2, Plus, Minus, 
  MapPin, User, ChevronDown, Edit3, Info, Lock, ShieldCheck, ShoppingBag, Ticket
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import ThemeToggle from '../components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { recommendationMapping, Pairing, popularBeverages } from '../lib/recommendations';

// SVG Background components for watermarks
const PizzaWatermark = () => (
  <svg width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
    <path d="M12 21.05A19.12 19.12 0 013 12C3 7 7 3 12 3s9 4 9 9a19.12 19.12 0 01-9 9.05z" />
    <path d="M12 3v18" />
    <path d="M4.5 7.5L19.5 16.5" />
    <path d="M19.5 7.5L4.5 16.5" />
    <circle cx="9" cy="8" r="1" />
    <circle cx="15" cy="10" r="1" />
    <circle cx="11" cy="15" r="1" />
  </svg>
);

const BurgerWatermark = () => (
  <svg width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
    <path d="M3 12h18" />
    <path d="M5 12a7 7 0 0114 0" />
    <path d="M4 16h16v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-1z" />
    <path d="M9 16v3" />
    <path d="M15 16v3" />
  </svg>
);

const NoodleWatermark = () => (
  <svg width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
    <path d="M18 10h-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-4h2a2 2 0 002-2v-2a2 2 0 00-2-2z" />
    <path d="M14 10V6" />
    <path d="M10 10V6" />
    <path d="M14 14V10" />
    <path d="M10 14V10" />
  </svg>
);

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [tip, setTip] = useState<number>(0);

  // Hardcoded layout values
  const DELIVERY_FEE = 40;
  const TAXES = 15;
  const PLATFORM_FEE = 5;
  
  const finalTotal = totalPrice > 0 ? totalPrice + DELIVERY_FEE + TAXES + PLATFORM_FEE + tip : 0;

  // Recommendations logic
  const cartRecommendations = useMemo(() => {
    const recommendedSet = new Set<string>();
    const recommendedPairs: Pairing[] = [];

    cart.forEach(item => {
      const pairs = recommendationMapping[item.name] || [];
      pairs.forEach(pair => {
        const isInCart = cart.some(cartItem => cartItem.name === pair.name);
        if (!isInCart && !recommendedSet.has(pair.name)) {
          recommendedSet.add(pair.name);
          recommendedPairs.push({ ...pair, image: pair.image || 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=150' }); // Fallback
        }
      });
    });

    popularBeverages.forEach(beverage => {
      const isInCart = cart.some(cartItem => cartItem.name === beverage.name);
      if (!isInCart && !recommendedSet.has(beverage.name) && recommendedPairs.length < 6) {
        recommendedSet.add(beverage.name);
        recommendedPairs.push({ ...beverage, image: beverage.image || 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=150' });
      }
    });

    // Make sure we have 1 or 2 hardcoded populars if empty.
    if (recommendedPairs.length === 0) {
      recommendedPairs.push(
        { name: 'Small Coke', price: 40, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=150' },
        { name: 'Brownie', price: 60, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=150' }
      );
    }

    return recommendedPairs;
  }, [cart]);

  return (
    <div className="min-h-screen bg-[#F5F6F8] dark:bg-[#121212] transition-colors duration-500 overflow-hidden relative font-sans">
      
      {/* Background Watermarks */}
      <div className="absolute top-20 left-20">
        <PizzaWatermark />
      </div>
      <div className="absolute top-1/2 right-10">
        <BurgerWatermark />
      </div>
      <div className="absolute bottom-20 left-1/3">
        <NoodleWatermark />
      </div>

      {/* Modern Top Navigation matching Mockup */}
      <header className="relative z-50 bg-[#F5F6F8]/80 dark:bg-[#121212]/80 backdrop-blur-xl border-b border-gray-200 dark:border-neutral-800 shadow-sm transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group w-64">
            <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-100 dark:to-gray-300 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5 text-white dark:text-black" />
            </div>
            <h1 className="text-xl lg:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                Uni Cafes
            </h1>
          </Link>

          {/* Center Actions */}
          <div className="hidden md:flex items-center justify-center space-x-6 flex-1">
            <ThemeToggle />
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold transition-all text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* User Profile & Address Sidebar */}
          <div className="flex items-center space-x-6 w-auto md:w-96 justify-end">
            <div className="hidden lg:flex items-start space-x-3 cursor-pointer group">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 group-hover:animate-bounce" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                  Delivery Address <ChevronDown className="w-4 h-4" />
                </span>
                <span className="text-xs text-gray-500 font-medium max-w-[180px] truncate">
                  123 University Drive, City Center (Deliver to Me)
                </span>
              </div>
            </div>

            <div className="relative cursor-pointer hover:scale-105 transition-transform">
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#F5F6F8] dark:border-[#121212]">
                  {totalItems}
                </span>
              )}
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400 border border-gray-300 dark:border-gray-700 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
              <img src="https://i.pravatar.cc/100?img=33" alt="User Profile" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 justify-center">
          
          {/* Left Side: Cart Items & Recommended */}
          <div className="flex-1 max-w-[650px] flex flex-col space-y-12">
            
            {/* Title Section */}
            <div className="flex items-end justify-between pb-4 border-b border-gray-200 dark:border-neutral-800">
              <div>
                <h1 className="text-4xl lg:text-[42px] font-black text-gray-900 dark:text-white tracking-tight mb-2">
                  Your Cart
                </h1>
                <p className="text-gray-500 font-medium text-sm">{totalItems} items in your bag</p>
              </div>
              {cart.length > 0 && (
                <button 
                  onClick={clearCart}
                  className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-semibold text-sm transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-[#1E1E20] rounded-3xl border border-gray-200 dark:border-neutral-800 shadow-xl">
                <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your bag is empty</h2>
                <p className="text-gray-500 max-w-sm mx-auto mb-8 text-sm">
                  Looks like you haven't added any campus favorites yet.
                </p>
                <Link to="/">
                  <button className="bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90 font-bold py-3 px-8 rounded-xl transition-opacity">
                    Return to Menu
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex flex-col bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 shadow-md dark:shadow-none border border-gray-200 dark:border-[#2A2A2D]"
                    >
                      {/* Top Item details */}
                      <div className="flex items-center gap-5 justify-between">
                        <div className="flex items-center gap-5">
                          <div className="w-[84px] h-[84px] rounded-2xl overflow-hidden shadow-sm shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{item.name}</h3>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <span className="text-sm font-semibold">₹{item.price}</span>
                              <span className="text-xs">Per Item</span>
                            </div>
                          </div>
                        </div>

                        {/* Controls & Total */}
                        <div className="flex items-center gap-6">
                          <div className="flex items-center bg-[#F3F4F6] dark:bg-[#2A2A2D] rounded-xl overflow-hidden border border-gray-200 dark:border-transparent">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="w-[38px] h-[38px] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#38383C] transition-colors text-blue-600 dark:text-[#5E83F0]"
                            >
                              <Minus className="w-4 h-4 text-gray-600 dark:text-blue-400 opacity-80" strokeWidth={2.5}/>
                            </button>
                            <span className="w-9 text-center font-bold text-gray-900 dark:text-white text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => addToCart(item)}
                              className="w-[38px] h-[38px] flex items-center justify-center bg-blue-50 dark:bg-[#2A2A2D] text-blue-600 dark:text-[#5E83F0] hover:bg-blue-100 dark:hover:bg-[#38383C] transition-colors"
                            >
                              <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2.5}/>
                            </button>
                          </div>

                          <div className="flex flex-col items-end w-16">
                            <div className="text-[10px] text-gray-500 font-bold uppercase mb-0.5 tracking-wider">Total</div>
                            <div className="text-lg font-black text-gray-900 dark:text-white">₹{item.price * item.quantity}</div>
                          </div>
                        </div>
                      </div>

                      {/* Divider inside item card */}
                      <div className="h-px bg-gray-100 dark:bg-[#2A2A2D] my-4 w-full" />

                      {/* Bottom Controls */}
                      <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium px-2 py-1 rounded transition-colors group">
                          <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>Add Cooking Instructions</span>
                        </button>

                        <button className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-[#1D294D] dark:to-[#172242] hover:opacity-90 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg transition-opacity border border-transparent dark:border-[#2D3E70]">
                           Complete Your Meal
                        </button>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Recommended Horizontal List */}
            {cart.length > 0 && cartRecommendations.length > 0 && (
              <div className="pt-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-5">Recommended to Add</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                  {cartRecommendations.map((pair, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-shrink-0 bg-white dark:bg-[#1E1E20] p-3 rounded-2xl border border-gray-200 dark:border-[#2A2A2D] w-[140px] shadow-sm snap-start group cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-[#121212] relative">
                        <img src={pair.image} alt={pair.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/10 dark:bg-transparent" />
                      </div>
                      
                      <div className="flex items-center justify-between w-full mt-auto">
                        <div className="flex col">
                          <span className="text-[13px] font-bold text-gray-900 dark:text-white leading-tight w-full text-left line-clamp-2">{pair.name}</span>
                        </div>
                        <button 
                           onClick={() => addToCart({ id: pair.name, name: pair.name, price: pair.price, image: pair.image })}
                           className="bg-gray-100 dark:bg-[#2A2A2D] text-gray-600 dark:text-gray-300 font-bold text-[10px] px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0 ml-1"
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Side: Order Summary */}
          {cart.length > 0 && (
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-7 border border-gray-200 dark:border-[#2A2A2D] shadow-xl dark:shadow-2xl sticky top-28">
                
                <h2 className="text-[22px] font-black text-gray-900 dark:text-white mb-6">Order Summary</h2>

                {/* Sub-breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Delivery Partner Fee</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹{DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                      Taxes & Restaurant Charges <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹{TAXES.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                      Platform Fee <span className="text-[10px] bg-gray-100 dark:bg-[#2A2A2D] px-1.5 py-0.5 rounded text-gray-500 font-semibold">(Fixed)</span>
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹{PLATFORM_FEE.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Row */}
                <div className="flex items-center justify-between py-4 border-t border-b border-gray-100 dark:border-[#2A2A2D] mb-6">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Coupon</span>
                  <button className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-[#5E83F0] border border-dashed border-blue-300 dark:border-[#2D3E70] bg-blue-50 dark:bg-[#1D294D]/40 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors">
                    <Ticket className="w-3.5 h-3.5" /> ADD COUPON
                  </button>
                </div>

                {/* Tipping Section */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 tracking-wide">Tipping your delivery partner</h4>
                  <div className="flex items-center gap-3">
                    {[20, 30, 50].map((amount) => (
                      <button 
                        key={amount}
                        className={`flex-1 border text-sm font-bold py-2 rounded-xl transition-all ${
                          tip === amount 
                            ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-[#1D294D] dark:text-[#5E83F0] dark:border-[#2D3E70]' 
                            : 'border-gray-200 dark:border-[#2A2A2D] text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                        onClick={() => setTip(tip === amount ? 0 : amount)}
                      >
                        ₹{amount}
                      </button>
                    ))}
                    <button className="flex-1 border border-gray-200 dark:border-[#2A2A2D] text-sm font-bold text-gray-600 dark:text-gray-300 py-2 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                      Custom
                    </button>
                  </div>
                </div>

                {/* Total Row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold font-sans tracking-wide text-gray-500 uppercase">Total Amount</span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">₹{finalTotal.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={() => {
                    alert("Order Placed Successfully!");
                    clearCart();
                  }}
                  className="w-full bg-gradient-to-b from-[#2E6BFF] to-[#1E54D4] dark:from-[#3574F0] dark:to-[#1C51C4] hover:brightness-110 active:brightness-90 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgba(46,107,255,0.39)] transition-all flex items-center justify-center gap-2 mb-4 relative overflow-hidden group"
                >
                  <span className="relative z-10 text-base">Place Order Now</span>
                  <div className="relative z-10 flex items-center gap-1 opaciy-90 font-medium text-[11px] ml-1 bg-black/10 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" /> Secure Checkout
                  </div>
                  {/* Sheen effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-2 mt-4 opacity-70">
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide">Zomato/Swiggy Trusted</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-1 tracking-wider"><Lock strokeWidth={3} className="w-3 h-3"/> Safe and Secure Payments</span>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
      
    </div>
  );
};

export default Cart;
