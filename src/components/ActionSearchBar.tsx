"use client"; 
  
 /** 
  * @author: @kokonutui 
  * @description: A modern search bar component with action buttons and suggestions 
  * @version: 1.0.0 
  * @date: 2025-06-26 
  * @license: MIT 
  * @website: `https://kokonutui.com`  
  * @github: `https://github.com/kokonut-labs/kokonutui`  
  */ 
  
 import { 
   Search, 
   Send, 
   Coffee,
   Utensils
 } from "lucide-react"; 
 import { AnimatePresence, motion } from "framer-motion"; 
 import { useCallback, useEffect, useMemo, useState } from "react"; 
 import useDebounce from "../hooks/use-debounce"; 
  
 interface Action { 
   id: string; 
   label: string; 
   icon: React.ReactNode; 
   description?: string; 
   short?: string; 
   end?: string; 
 } 
  
 interface SearchResult { 
   actions: Action[]; 
 } 
  
 const ANIMATION_VARIANTS = { 
   container: { 
     hidden: { opacity: 0, height: 0 }, 
     show: { 
       opacity: 1, 
       height: "auto", 
       transition: { 
         height: { duration: 0.4 }, 
         staggerChildren: 0.1, 
       }, 
     }, 
     exit: { 
       opacity: 0, 
       height: 0, 
       transition: { 
         height: { duration: 0.3 }, 
         opacity: { duration: 0.2 }, 
       }, 
     }, 
   }, 
   item: { 
     hidden: { opacity: 0, y: 20 }, 
     show: { 
       opacity: 1, 
       y: 0, 
       transition: { duration: 0.3 }, 
     }, 
     exit: { 
       opacity: 0, 
       y: -10, 
       transition: { duration: 0.2 }, 
     }, 
   }, 
 } as const; 
  
 function ActionSearchBar({ 
   actions = [], 
   onSelect,
   placeholder = "Search Cafes",
 }: { 
   actions?: Action[]; 
   onSelect?: (action: Action) => void;
   placeholder?: string;
 }) { 
   const [query, setQuery] = useState(""); 
   const [result, setResult] = useState<SearchResult | null>(null); 
   const [isFocused, setIsFocused] = useState(false); 
   const [activeIndex, setActiveIndex] = useState(-1); 
   const debouncedQuery = useDebounce(query, 200); 
  
   const filteredActions = useMemo(() => { 
     if (!debouncedQuery) return []; 
  
     const normalizedQuery = debouncedQuery.toLowerCase().trim(); 
     return actions.filter((action) => { 
       const searchableText = 
         `${action.label} ${action.description || ""}`.toLowerCase(); 
       return searchableText.includes(normalizedQuery); 
     }); 
   }, [debouncedQuery, actions]); 
  
   useEffect(() => { 
     if (!isFocused) { 
       setResult(null); 
       setActiveIndex(-1); 
       return; 
     } 
  
     setResult({ actions: filteredActions }); 
     setActiveIndex(-1); 
   }, [filteredActions, isFocused]); 
  
   const handleInputChange = useCallback( 
     (e: React.ChangeEvent<HTMLInputElement>) => { 
       setQuery(e.target.value); 
       setActiveIndex(-1); 
     }, 
     [] 
   ); 
  
   const handleKeyDown = useCallback( 
     (e: React.KeyboardEvent<HTMLInputElement>) => { 
       if (!result?.actions.length) return; 
  
       switch (e.key) { 
         case "ArrowDown": 
           e.preventDefault(); 
           setActiveIndex((prev) => 
             prev < result.actions.length - 1 ? prev + 1 : 0 
           ); 
           break; 
         case "ArrowUp": 
           e.preventDefault(); 
           setActiveIndex((prev) => 
             prev > 0 ? prev - 1 : result.actions.length - 1 
           ); 
           break; 
         case "Enter": 
           e.preventDefault(); 
           if (activeIndex >= 0 && result.actions[activeIndex]) { 
             onSelect?.(result.actions[activeIndex]);
             setIsFocused(false);
             setQuery("");
           } 
           break; 
         case "Escape": 
           setIsFocused(false); 
           setActiveIndex(-1); 
           break; 
       } 
     }, 
     [result?.actions, activeIndex, onSelect] 
   ); 
  
   const handleActionClick = useCallback((action: Action) => { 
     onSelect?.(action);
     setIsFocused(false);
     setQuery("");
   }, [onSelect]); 
  
   const handleFocus = useCallback(() => { 
     setIsFocused(true); 
     setActiveIndex(-1); 
   }, []); 
  
   const handleBlur = useCallback(() => { 
     setTimeout(() => { 
       setIsFocused(false); 
       setActiveIndex(-1); 
     }, 200); 
   }, []); 
  
   return ( 
     <div className="relative w-full max-w-[200px] lg:max-w-[300px]"> 
        <div className="relative group"> 
          <input 
            autoComplete="off" 
            className="h-10 w-full rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 py-2 pr-10 pl-5 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm hover:border-gray-400 dark:hover:border-neutral-600 transition-all duration-200" 
            id="search" 
            onBlur={handleBlur} 
            onChange={handleInputChange} 
            onFocus={handleFocus} 
            onKeyDown={handleKeyDown} 
            placeholder={placeholder} 
            type="text" 
            value={query} 
          /> 
          <div className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 pointer-events-none transition-transform group-focus-within:scale-110"> 
            <AnimatePresence mode="popLayout"> 
              {query.length > 0 ? ( 
                <motion.div 
                  animate={{ y: 0, opacity: 1, scale: 1 }} 
                  exit={{ y: 10, opacity: 0, scale: 0.8 }} 
                  initial={{ y: -10, opacity: 0, scale: 0.8 }} 
                  key="send" 
                  transition={{ type: "spring", stiffness: 400, damping: 25 }} 
                > 
                  <Send className="h-4 w-4 text-blue-600" /> 
                </motion.div> 
              ) : ( 
                <motion.div 
                  animate={{ y: 0, opacity: 1, scale: 1 }} 
                  exit={{ y: 10, opacity: 0, scale: 0.8 }} 
                  initial={{ y: -10, opacity: 0, scale: 0.8 }} 
                  key="search" 
                  transition={{ type: "spring", stiffness: 400, damping: 25 }} 
                > 
                  <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" /> 
                </motion.div> 
              )} 
            </AnimatePresence> 
          </div> 
        </div> 
  
        <AnimatePresence> 
          {isFocused && query.length > 0 && result && result.actions.length > 0 && ( 
            <motion.div 
              animate="show" 
              aria-label="Search results" 
              className="absolute top-full mt-3 w-full overflow-hidden rounded-2xl border border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-2xl dark:border-neutral-800/50 dark:bg-neutral-900/95 z-[100]" 
              exit="exit" 
              initial="hidden" 
              variants={ANIMATION_VARIANTS.container} 
            > 
              <div className="p-2">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Quick Results
                </div>
                <motion.ul className="space-y-1"> 
                  {result.actions.map((action) => ( 
                    <motion.li 
                      className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 ${ 
                        activeIndex === result.actions.indexOf(action) 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                          : "hover:bg-gray-100 dark:hover:bg-neutral-800" 
                      }`} 
                      id={`action-${action.id}`} 
                      key={action.id} 
                      layout 
                      onClick={() => handleActionClick(action)} 
                      variants={ANIMATION_VARIANTS.item} 
                    > 
                      <div className="flex items-center gap-3"> 
                        <div className={`p-1.5 rounded-lg ${
                          activeIndex === result.actions.indexOf(action)
                            ? "bg-white/20 text-white"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                        }`}>
                          {action.icon} 
                        </div> 
                        <div className="flex flex-col">
                          <span className={`font-semibold text-sm ${
                            activeIndex === result.actions.indexOf(action)
                              ? "text-white"
                              : "text-gray-900 dark:text-gray-100"
                          }`}> 
                            {action.label} 
                          </span> 
                          {action.description && ( 
                            <span className={`text-[10px] leading-tight ${
                              activeIndex === result.actions.indexOf(action)
                                ? "text-white/80"
                                : "text-gray-500 dark:text-gray-400"
                            }`}> 
                              {action.description} 
                            </span> 
                          )} 
                        </div>
                      </div> 
                    </motion.li> 
                  ))} 
                </motion.ul> 
              </div>
            </motion.div> 
          )} 
        </AnimatePresence> 
     </div> 
   ); 
 } 
  
 export default ActionSearchBar; 
