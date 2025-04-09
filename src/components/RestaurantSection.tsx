import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-64">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h2>
            <p className="text-white/90">{restaurant.description}</p>
            <Link
              to={`/outlet/${restaurant.id}`}
              className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurant.menu.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantSection;