"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star, Clock, ShoppingCart, Flame } from "lucide-react";
import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";

const cn = (...classes: (string | undefined | false | null)[]) => classes.filter(Boolean).join(" ");

interface MenuItemType {
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  menu: MenuItemType[];
}

interface MenuBentoGridProps {
  restaurant: Restaurant;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const BentoCard = ({ 
  item, 
  className,
  isLarge = false,
  isSpecialInfo = false
}: { 
  item?: MenuItemType; 
  className?: string;
  isLarge?: boolean;
  isSpecialInfo?: boolean;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (isSpecialInfo) {
    return (
      <motion.div
        className={cn("h-full", className)}
        variants={fadeInUp}
        onMouseMove={handleMouseMove}
        onHoverEnd={handleMouseLeave}
        whileHover={{ y: -5 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="group relative flex h-full flex-col justify-center items-center gap-4 rounded-xl border border-neutral-200/60 bg-gradient-to-b from-green-50/80 to-teal-50/50 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-[4px] transition-all duration-500 ease-out hover:border-green-300/50 hover:shadow-lg dark:border-neutral-800/60 dark:from-neutral-900/60 dark:to-neutral-900/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 text-center flex flex-col items-center" style={{ transform: "translateZ(20px)" }}>
            <Flame className="w-10 h-10 text-orange-500 mb-4 animate-pulse" />
            <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-2">
              Hot Selling
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
              These items are currently trending! Order now before they run out.
            </p>
            
            <div className="flex items-center gap-2 bg-white/60 dark:bg-black/40 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Pre-order available</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!item) return null;

  return (
    <motion.div
      className={cn("h-full", className)}
      onMouseMove={handleMouseMove}
      onHoverEnd={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      variants={fadeInUp}
      whileHover={{ y: -5 }}
    >
      <div
        className={cn(
          "group relative flex h-full flex-col gap-4 rounded-xl border border-neutral-200/60 bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-[4px] transition-all duration-500 ease-out overflow-hidden hover:border-neutral-300/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-neutral-800/60 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30 dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] dark:hover:border-neutral-700/50 dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
          isLarge ? "p-0" : "p-5"
        )}
      >
        {isLarge ? (
          <>
            <div className="absolute inset-0 z-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div
              className="relative z-10 flex h-full flex-col justify-end p-6"
              style={{ transform: "translateZ(20px)" }}
            >
               <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        ₹{item.price}
                      </span>
                      <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-3xl tracking-tight mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-base max-w-sm">
                      {item.description}
                    </p>
                  </div>
                  <button className="bg-white text-black p-3 rounded-full hover:bg-green-50 transition-colors transform hover:scale-110">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="relative z-10 flex h-full flex-col gap-3"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="relative h-40 w-full rounded-lg overflow-hidden mb-2">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                   <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                   </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-neutral-900 text-lg leading-tight transition-colors duration-300 group-hover:text-green-600 dark:text-neutral-100 dark:group-hover:text-green-400">
                  {item.name}
                </h3>
                <span className="font-bold text-green-600 dark:text-green-400 shrink-0">
                  ₹{item.price}
                </span>
              </div>

              <p className="text-neutral-500 text-sm line-clamp-2 dark:text-neutral-400 flex-1">
                {item.description}
              </p>

              <button className="flex items-center justify-center gap-2 w-full mt-2 bg-neutral-100 hover:bg-green-600 hover:text-white dark:bg-neutral-800 dark:hover:bg-green-600 text-neutral-800 dark:text-neutral-200 py-2 rounded-lg transition-all text-sm font-medium">
                <ShoppingCart className="w-4 h-4" /> Add to Order
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default function MenuBentoGrid({ restaurant }: MenuBentoGridProps) {
  // Defensive check if menu has less than 3 items
  const menuItems = restaurant.menu || [];
  
  return (
    <motion.div
      className="grid gap-6 mt-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Large item taking remaining span or span-2 */}
        {menuItems.length > 0 && (
          <BentoCard 
            item={menuItems[0]} 
            isLarge={true} 
            className="md:col-span-2 min-h-[320px]" 
          />
        )}
        
        {/* Medium item taking 1 col */}
        {menuItems.length > 1 && (
          <BentoCard 
            item={menuItems[1]} 
            className="md:col-span-1" 
          />
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Special Info Feature taking 1 col */}
        <BentoCard 
           isSpecialInfo={true}
           className="md:col-span-1 min-h-[220px]" 
        />
        
        {/* Third item taking 2 cols if available, otherwise just use remaining space */}
        {menuItems.length > 2 && (
          <BentoCard 
            item={menuItems[2]} 
            className="md:col-span-1" 
          />
        )}

        {/* If there are more items, map them or add a call to action */}
        {menuItems.length > 3 ? (
            <BentoCard 
              item={menuItems[3]} 
              className="md:col-span-1" 
            />
        ) : (
            <motion.div 
               variants={fadeInUp}
               className="overflow-hidden rounded-xl border border-neutral-200/50 bg-gradient-to-b from-neutral-50/80 to-neutral-50 transition-all duration-300 hover:border-neutral-400/30 hover:shadow-lg md:col-span-1 dark:border-neutral-800/50 dark:from-neutral-900/80 dark:to-neutral-900 flex justify-center items-center p-6"
            >
               <Link to={`/outlet/${restaurant.id}`} className="text-center group">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                   <ArrowUpRight className="w-8 h-8 text-green-600 dark:text-green-400" />
                 </div>
                 <h3 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200 mb-1">View Full Menu</h3>
                 <p className="text-neutral-500 dark:text-neutral-400 text-sm">Explore all offerings from {restaurant.name}</p>
               </Link>
            </motion.div>
        )}
      </div>
    </motion.div>
  );
}
