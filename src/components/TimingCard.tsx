import React from 'react';
import { Clock } from 'lucide-react';

interface TimingProps {
  day: string;
  hours: string;
  isOpen: boolean;
}

const TimingCard: React.FC<TimingProps> = ({ day, hours, isOpen }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">{day}</h3>
          <p className="text-gray-600">{hours}</p>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          <span className={isOpen ? "text-green-500" : "text-red-500"}>
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimingCard;