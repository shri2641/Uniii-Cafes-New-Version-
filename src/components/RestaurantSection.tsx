import React from 'react';
import { Link } from 'react-router-dom';
import MenuBentoGrid from './MenuBentoGrid';
import CrowdMonitor from './CrowdMonitor';
import { motion } from 'framer-motion';

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

interface RestaurantSectionProps {
  restaurant: Restaurant;
}

const RestaurantSection: React.FC<RestaurantSectionProps> = ({ restaurant }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl shadow-blue-100/30 dark:shadow-none overflow-hidden border border-blue-50/50 dark:border-neutral-800"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Restaurant Info Side */}
        <div className="lg:w-1/3 relative h-80 lg:h-auto overflow-hidden group">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent flex flex-col justify-end p-8 lg:p-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-4xl font-black text-white tracking-tight">{restaurant.name}</h3>
              <p className="text-blue-100/80 font-light leading-relaxed line-clamp-2">{restaurant.description}</p>
              <Link
                to={`/outlet/${restaurant.id}`}
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-blue-900 font-bold hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >
                View Full Menu
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Menu Bento Grid Side */}
        <div className="lg:w-2/3 p-8 lg:p-10 bg-[#FDFCFB] dark:bg-neutral-900/50">
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-black text-blue-950 dark:text-white tracking-tight">Featured Items</h4>
              <div className="h-px w-20 bg-blue-100 dark:bg-neutral-800" />
            </div>
            
            {/* Live Crowd Monitoring Section */}
            <div className="md:w-64 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-blue-50/50 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Crowd Status</span>
              </div>
              <CrowdMonitor restaurantId={restaurant.id} restaurantName={restaurant.name} />
            </div>
          </div>
          <MenuBentoGrid restaurant={restaurant} />
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantSection;