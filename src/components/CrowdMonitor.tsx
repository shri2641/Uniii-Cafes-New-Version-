import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CrowdMonitorProps {
  restaurantId: string;
  restaurantName: string;
  maxCapacity?: number;
}

const CrowdMonitor: React.FC<CrowdMonitorProps> = ({ restaurantId, restaurantName, maxCapacity = 50 }) => {
  const [occupancy, setOccupancy] = useState(0);
  const [status, setStatus] = useState<'Quiet' | 'Moderate' | 'Busy' | 'Crowded'>('Quiet');

  // Simulate live monitoring
  useEffect(() => {
    // Initial random occupancy
    const initial = Math.floor(Math.random() * maxCapacity);
    setOccupancy(initial);

    const interval = setInterval(() => {
      setOccupancy(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = Math.max(0, Math.min(maxCapacity, prev + change));
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [maxCapacity]);

  useEffect(() => {
    const ratio = occupancy / maxCapacity;
    if (ratio < 0.3) setStatus('Quiet');
    else if (ratio < 0.6) setStatus('Moderate');
    else if (ratio < 0.85) setStatus('Busy');
    else setStatus('Crowded');
  }, [occupancy, maxCapacity]);

  const getStatusColor = () => {
    switch (status) {
      case 'Quiet': return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30';
      case 'Moderate': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30';
      case 'Busy': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800/30';
      case 'Crowded': return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Quiet': return <CheckCircle className="w-4 h-4" />;
      case 'Moderate': return <Users className="w-4 h-4" />;
      case 'Busy': return <Users className="w-4 h-4" />;
      case 'Crowded': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getStatusColor()} transition-colors duration-500`}>
          {getStatusIcon()}
          <span>{status}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm font-bold">{occupancy}</span>
          <span className="text-xs text-gray-400">/ {maxCapacity}</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(occupancy / maxCapacity) * 100}%` }}
          className={`h-full transition-colors duration-500 ${
            status === 'Quiet' ? 'bg-green-500' :
            status === 'Moderate' ? 'bg-blue-500' :
            status === 'Busy' ? 'bg-orange-500' : 'bg-red-500'
          }`}
        />
      </div>

      <AnimatePresence>
        {status === 'Crowded' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-xl mt-2"
          >
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-red-600 dark:text-red-400 font-medium leading-tight">
              High crowd alert! Consider pre-ordering to avoid long wait times at {restaurantName}.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CrowdMonitor;
