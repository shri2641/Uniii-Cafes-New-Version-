import React from 'react';
import { Star } from 'lucide-react';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, rating, image }) => {
  return (
    <div className="group perspective">
      <div className="relative transform transition-all duration-500 group-hover:[transform:rotateY(10deg)] hover:shadow-2xl rounded-xl">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">₹{price}</span>
              <div className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;