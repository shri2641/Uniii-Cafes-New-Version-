import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles } from 'lucide-react';
import { Pairing } from '../lib/recommendations';

interface PairItWithProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  recommendations: Pairing[];
  onAdd: (pairing: Pairing) => void;
}

const PairItWith: React.FC<PairItWithProps> = ({ isOpen, onClose, itemName, recommendations, onAdd }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Pop-up */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white dark:bg-neutral-900 rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden border border-blue-50/50 dark:border-neutral-800"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-blue-950 dark:text-white tracking-tight">Best Paired With</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Often bought with {itemName}</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {recommendations.map((pairing, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center gap-4 p-4 rounded-3xl bg-[#FDFCFB] dark:bg-neutral-800/50 border border-blue-50/50 dark:border-neutral-800 hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 relative">
                      <img src={pairing.image} alt={pairing.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-blue-950/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <h4 className="font-black text-blue-950 dark:text-white leading-tight">{pairing.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-light leading-tight">{pairing.description}</p>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-lg font-black text-blue-600 dark:text-blue-400">₹{pairing.price}</span>
                        <button 
                          onClick={() => onAdd(pairing)}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-white dark:bg-neutral-900 border border-blue-100 dark:border-neutral-800 text-blue-600 dark:text-blue-400 text-xs font-black rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                          <span>ADD</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <button 
                  onClick={onClose}
                  className="w-full h-14 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none hover:bg-blue-700 active:scale-95 transition-all"
                >
                  I'll skip for now
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PairItWith;
