import { useState, useRef, useEffect, useMemo } from 'react';
import { Utensils, UserCircle, ChevronDown, Package, LogOut, ShoppingCart, Coffee } from 'lucide-react';
import TimingCard from './components/TimingCard';
import RestaurantSection from './components/RestaurantSection';
import LoginModal from './components/LoginModal';
import ActionSearchBar from './components/ActionSearchBar';
import GradientButton from './components/GradientButton';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './context/CartContext';
import ThemeToggle from './components/ThemeToggle';

const restaurants = [
  {
    id: "dice-n-sip",
    name: "Dice n Sip",
    description: "Indian cuisine with a modern twist, perfect for board game sessions",
    image: "/cafes/Dice n Sip - 1.jpg",
    menu: [
      {
        name: "Kadhaai Paneer",
        description: "Cottage cheese cubes in rich tomato gravy with aromatic spices",
        price: 180,
        rating: 4,
        image: "https://cdn.zeptonow.com/production///tr:w-600,ar-100-100,pr-true,f-auto,q-80/web/recipes/kadai-paneer.png"
      },
      {
        name: "Chilly Potato",
        description: "Crispy potato slices tossed in spicy sauce with onions and capsicum",
        price: 120,
        rating: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1mVAju22bnIsBceoWZ8FeoWcLq0d_mVnTCA&s"
      },
      {
        name: "Aloo Tikki Chat",
        description: "Crispy potato patties topped with yogurt, chutneys, and crunchy sev",
        price: 80,
        rating: 4,
        image: "https://www.honeywhatscooking.com/wp-content/uploads/2020/10/Aloo-Tikki-Chaat61.jpg"
      }
    ]
  },
  {
    id: "georgia",
    name: "Georgia",
    description: "Quick bites, coffee, and comfort food",
    image: "/cafes/Georgia.jpg",
    menu: [
      {
        name: "Cold Coffee",
        description: "Refreshing cold coffee with milk and ice",
        price: 120,
        rating: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Q746H6fVkLmVj3E_MwVk_-L6NzGOrRG4EtIjIqn7dJubvuzTNOJ5Lf3loJaACPq9JUY&usqp=CAU"
      },
      {
        name: "Paneer Sandwich",
        description: "Grilled paneer with fresh vegetables and mayo",
        price: 100,
        rating: 4,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Masala Maggi",
        description: "Classic Maggi noodles with Indian spices and vegetables",
        price: 60,
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKcem_x-ZYBkXQ8S75qyNvJCtpZL6cGDY67g&s"
      }
    ]
  },
  {
    id: "basil",
    name: "Basil",
    description: "Where every sip is a burst of freshness!",
    image: "/cafes/Basil.jpg",
    menu: [
      {
        name: "Watermelon Juice",
        description: "Fresh watermelon juice with mint leaves",
        price: 80,
        rating: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTIsvp2Slh3V-kiN7WlvxgQg3nC3yeKdCh3Q&s"
      },
      {
        name: "Millet Veggie Sandwich",
        description: "Healthy sandwich made with millet bread, fresh vegetables, and a special sauce",
        price: 120,
        rating: 4,
        image: "https://i0.wp.com/www.blissofcooking.com/wp-content/uploads/2017/12/Millet-And-Vegetable-Pattie-Sandwich-MOP.jpg?resize=740%2C433&ssl=1"
      },
      {
        name: "Red Carrot Beetroot",
        description: "Fresh carrots and beetroot with a tangy dressing",
        price: 100,
        rating: 4,
        image: "https://static.toiimg.com/thumb/msid-110705686,width-1280,height-720,resizemode-4/110705686.jpg"
      }
    ]
  },
  {
    id: "subway",
    name: "Subway",
    description: "Fresh made-to-order sandwiches",
    image: "/cafes/Subway.jpg",
    menu: [
      {
        name: "Italian B.M.T.",
        description: "Pepperoni, salami, and ham with veggies",
        price: 250,
        rating: 4,
        image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Veggie Delight",
        description: "Fresh vegetables with choice of sauce",
        price: 180,
        rating: 3,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNWDOqHNDi82wUUO7YTo6_ulzDkDXz9st_Qw&s"
      },
      {
        name: "Signature Wrap",
        description: "Fresh tortilla wrap with grilled chicken, vegetables, and special sauce",
        price: 220,
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jNDYbWEZ7e8DB3PaH7_lyfjZtGk4OZWBa1ecYBPk7bLVfzI-hSl_HpafsOsutZPfnBU&usqp=CAU"
      }
    ]
  },
  {
    id: "uncles",
    name: "Uncle's Cafe",
    description: "Homestyle comfort food and to-go snacks",
    image: "/cafes/Uncle Cafe- 1.jpg",
    menu: [
      {
        name: "Cheesy Fries",
        description: "Crispy golden fries topped with melted cheese and special seasoning",
        price: 120,
        rating: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3OWJLaQ_WZS44qQEOUFrcv3OGGJTqXFBpQ&s"
      },
      {
        name: "Brownie With Ice Cream",
        description: "Warm chocolate brownie served with vanilla ice cream and chocolate sauce",
        price: 150,
        rating: 5,
        image: "https://i.ytimg.com/vi/9YzKnRZzHRk/maxresdefault.jpg"
      },
      {
        name: "Veg Spring Roll",
        description: "Crispy rolls filled with mixed vegetables and noodles, served with sweet chili sauce",
        price: 100,
        rating: 4,
        image: "https://www.chefkunalkapur.com/wp-content/uploads/2021/05/Veg-spring-rolls-scaled.jpg?v=1620580103"
      }
    ]
  },
  {
    id: "happiness-store",
    name: "Happiness Store",
    description: "Refreshing beverages and quick snacks",
    image: "/cafes/Happiness Store.jpg",
    menu: [
      {
        name: "Mix Sauce Pasta",
        description: "Pasta tossed in a blend of creamy white sauce and tangy tomato sauce with vegetables",
        price: 150,
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6iIqHlr4T3eUqG6OtmdGpR1IwNInhfcgbw&s"
      },
      {
        name: "Paneer Fried Rice",
        description: "Fragrant basmati rice stir-fried with cubes of paneer, vegetables, and aromatic Indian spices",
        price: 180,
        rating: 4,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Mango Shake",
        description: "Creamy and refreshing mango milkshake topped with vanilla ice cream",
        price: 100,
        rating: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO1FEGi0RdpyTAfkgYqhrYZBKNAYNLblsq2Q&s"
      }
    ]
  },
  {
    id: "nescafe",
    name: "Nescafe Corner",
    description: "Quick coffee fixes and light snacks",
    image: "/cafes/Nescafe- 1.jpg",
    menu: [
      {
        name: "Hazelnut Cappuccino",
        description: "Rich espresso with hazelnut syrup and frothy milk",
        price: 120,
        rating: 4,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Cheese Maggi",
        description: "Classic Maggi noodles topped with melted cheese and vegetables",
        price: 80,
        rating: 4,
        image: "https://cdn.zeptonow.com/production/tr:w-640,ar-2454-2454,pr-true,f-auto,q-80/cms/product_variant/d14b1d65-8d29-4591-82d9-030632f52084.jpeg"
      },
      {
        name: "Coffee Frappe",
        description: "Blended coffee drink with whipped cream",
        price: 150,
        rating: 4,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "ccd",
    name: "Cafe Coffee Day",
    description: "Serves fresh dairy, coffee, and quick bites.",
    image: "/cafes/CCD.jpg",
    menu: [
      {
        name: "Cappuccino",
        description: "Rich espresso topped with frothy milk and cocoa powder",
        price: 100,
        rating: 4,
        image: "https://vaya.in/recipes/wp-content/uploads/2019/02/Cappuccino.jpg"
      },
      {
        name: "Masala Tea",
        description: "Traditional Indian spiced tea with milk and aromatic spices",
        price: 40,
        rating: 5,
        image: "https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-10-20_at_11.07.13_AM.png?v=1697780292"
      },
      {
        name: "Cold Coffee",
        description: "Chilled coffee with milk and ice cream",
        price: 120,
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReI9T5nEFmstt97JEfDglxTLd1fAGjKoPsoA&s"
      }
    ]
  },
  {
    id: "food-court",
    name: "Food Court",
    description: "Variety of cuisines under one roof",
    image: "/cafes/Food Court- 1.jpg",
    menu: [
      {
        name: "Masala Dosa",
        description: "Crispy dosa with spiced potato filling, served with sambar and chutney",
        price: 100,
        rating: 4,
        image: "https://www.mydelicious-recipes.com/home/images/120_1200_1200/mydelicious-recipes-masala-dosa-with-batter"
      },
      {
        name: "Chhole Samose",
        description: "Crispy samosas filled with spiced potatoes and peas, served with tangy chhole curry",
        price: 80,
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8e8lwDTjM-z8-lwymIBKvVaYyNfVANHhKMA&s"
      },
      {
        name: "Vadapav",
        description: "Spicy potato patty in a soft bun with chutneys",
        price: 40,
        rating: 5,
        image: "https://media.istockphoto.com/id/1329212743/photo/vada-pav.jpg?s=612x612&w=0&k=20&c=K08WlL8YxjjLC5MfmuiKhHI04RZ-UGsVAQVIBKdu-QM="
      }
    ]
  },
  {
    id: "ahaar-cafe",
    name: "Ahaar Cafe",
    description: "Your go-to spot for authentic Indian comfort food and refreshing beverages",
    image: "/cafes/Ahaar Cafe.jpg",
    menu: [
      {
        name: "Aloo Parantha with Curd/Butter/Sabzi",
        description: "Stuffed potato parantha served with your choice of curd, butter, or sabzi",
        price: 90,
        rating: 4.5,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/960px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg"
      },
      {
        name: "Rajma Rice",
        description: "Aromatic rice cooked with red kidney beans (pack)",
        price: 75,
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZZYV9Eu13fxu8qXT98ovX6SrG3hGOtpqPw&s"
      },
      {
        name: "Paneer Sandwich",
        description: "Grilled sandwich with spiced cottage cheese and vegetables",
        price: 60,
        rating: 4.5,
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/02/paneer-sandwich.jpg"
      }
    ]
  }
];

const timings = [
  { day: "Monday - Friday", hours: "8:30 AM - 7:00 PM", isOpen: true },
  { day: "Saturday", hours: "8:30 AM - 7:00 PM", isOpen: true },
  { day: "Sunday", hours: "10:00 AM - 7:00 PM", isOpen: true }
];

export default function App() {
  const { totalItems } = useCart();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const filteredRestaurants = selectedRestaurant 
    ? restaurants.filter(r => r.id === selectedRestaurant)
    : restaurants;

  const handleLogin = (email: string) => {
    // Here you would typically make an API call to verify credentials
    setUser({ email });
    setIsLoginModalOpen(false);
  };

  const handleSignup = (name: string, email: string) => {
    // Here you would typically make an API call to create a new user
    setUser({ name, email });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
  };

  const searchActions = useMemo(() => 
    restaurants.map(r => ({
      id: r.id,
      label: r.name,
      icon: <Coffee className="h-4 w-4" />,
      description: r.description
    })), []
  );

  const handleSearchSelect = (action: any) => {
    setSelectedRestaurant(action.id);
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // AI Recommendations based on time and preferences
  const getAIRecommendations = () => {
    const currentHour = new Date().getHours();
    const recommendations = {
      timeBased: currentHour < 12 ? "Breakfast" : currentHour < 16 ? "Lunch" : "Dinner",
      recommendations: [
        {
          type: "outlet",
          name: "Dice n Sip",
          reason: "Perfect for gaming enthusiasts with spicy Indian cuisine",
          image: "/cafes/Dice n Sip - 1.jpg"
        },
        {
          type: "outlet",
          name: "Georgia",
          reason: "Quick bites and refreshing beverages",
          image: "/cafes/Georgia.jpg"
        },
        {
          type: "food",
          name: "Masala Dosa",
          outlet: "Food Court",
          reason: "Crispy and filling, perfect for any time of day",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800"
        },
        {
          type: "food",
          name: "Cold Coffee",
          outlet: "Cafe Coffee Day",
          reason: "Refreshing drink to keep you energized",
          image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800"
        }
      ]
    };
    return recommendations;
  };

  // aiRecommendations can be implemented/used here later
  // const aiRecommendations = getAIRecommendations();

  return (
    <div className="min-h-screen relative bg-[#FDFCFB] dark:bg-neutral-950 transition-colors duration-500">
      <div className="relative z-10">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFCFB]/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-orange-100/50 dark:border-neutral-800/50 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                <Utensils className="w-6 h-6 text-white animate-pulse" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-blue-900 dark:text-white">
                  Uni Cafes
              </h1>
            </div>
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors hover:scale-105 transform">
                  Home
                </Link>
                <Link to="/why-choose-us" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors hover:scale-105 transform">
                  Why choose us?
                </Link>
                <Link to="/about-us" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors hover:scale-105 transform">
                  About Us
                </Link>
                <a href="#menu" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors hover:scale-105 transform">
                  Menu
                </a>
                <a href="#contact" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors hover:scale-105 transform">
                  Contact
                </a>
                <div className="flex items-center">
                  <ActionSearchBar 
                    actions={searchActions} 
                    onSelect={handleSearchSelect} 
                    placeholder="Search Cafes"
                  />
                </div>
              </nav>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link
                  to="/cart"
                  className="group flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all relative border border-blue-100 dark:border-blue-800/50"
                >
                  <motion.div
                    animate={totalItems > 0 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <span className="text-blue-950 dark:text-blue-100 font-bold text-sm">Cart</span>
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        key={totalItems}
                        className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#FDFCFB] dark:border-neutral-950 shadow-lg shadow-orange-200/50 dark:shadow-none"
                      >
                        <motion.span
                          initial={{ y: 10 }}
                          animate={{ y: 0 }}
                          key={totalItems}
                        >
                          {totalItems}
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                    >
                  <UserCircle className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-600">{user.email}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu with higher z-index */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <Link
                          to="/my-orders"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4 mr-2" />
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-blue-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                </div>
              ) : (
                <GradientButton
                    onClick={() => setIsLoginModalOpen(true)}
                    variant="blue"
                    className="h-10 px-4"
                >
                  <div className="flex items-center space-x-2">
                    <UserCircle className="w-5 h-5" />
                    <span className="text-sm">Login</span>
                  </div>
                </GradientButton>
              )}
              </div>
            </div>
        </div>
      </header>

      {/* New Professional Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDFCFB] via-[#FFF5F0] to-[#FDFCFB] dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-16 lg:py-24">
        {/* Decorative Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 opacity-20"
          >
            <div className="w-12 h-12 rounded-full bg-green-200 blur-xl" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 opacity-20"
          >
            <div className="w-20 h-20 rounded-full bg-orange-200 blur-2xl" />
          </motion.div>
          {/* Floating Leaves (SVG) */}
          <motion.div 
            animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 opacity-30 text-green-800"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7,18C12,14 13.8,9 17,8M20,2C15.83,2.33 12.14,4.03 9,7C12.71,7.5 15.81,10.34 18,14C20.67,11 22,6.5 20,2Z" />
            </svg>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800/30">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
                  Premium Campus Dining
                </span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-blue-950 dark:text-white leading-[1.1] tracking-tight">
                Delicious Food <br />
                <span className="text-blue-600 italic font-serif">For Healthy Life</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover the best campus flavors. From quick bites to healthy delights, we bring the best cafes directly to your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <GradientButton 
                  label="Explore Menu" 
                  variant="blue"
                  className="h-14 px-10 text-lg shadow-xl shadow-blue-200"
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                />
                <button 
                  className="h-14 px-8 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-blue-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all shadow-md"
                  onClick={() => document.getElementById('pre-order')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Pre-Order Now
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-blue-950 dark:text-white">10+</div>
                  <div className="text-sm text-gray-500 font-medium">Outlets</div>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-neutral-800" />
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-blue-950 dark:text-white">5k+</div>
                  <div className="text-sm text-gray-500 font-medium">Daily Orders</div>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-neutral-800" />
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-blue-950 dark:text-white">4.8★</div>
                  <div className="text-sm text-gray-500 font-medium">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Visual Content */}
            <div className="flex-1 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900/30 blur-[100px] rounded-full opacity-50" />
                  
                  {/* Main Food Bowl (using Georgia Cafe image as placeholder) */}
                  <div className="relative rounded-full border-[15px] border-white dark:border-neutral-900 shadow-2xl overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" 
                      alt="Healthy Food Bowl" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Smaller Floating Cards */}
                  <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Coffee className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase">Featured</div>
                        <div className="text-sm font-bold text-blue-950 dark:text-white">Georgia Cafe</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -left-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <Utensils className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase">Fresh Taste</div>
                        <div className="text-sm font-bold text-blue-950 dark:text-white">Ahaar Cafe</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Professional Replacement for the Filter Buttons */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-orange-100/50 dark:border-neutral-800 shadow-xl shadow-orange-100/20 dark:shadow-none group transition-all duration-500"
          >
            <div className="w-20 h-20 mb-8 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
              <Utensils className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-blue-950 dark:text-white mb-4 tracking-tight">Diverse Cuisines</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              From traditional Indian snacks to international favorites, explore over 10+ unique outlets on campus.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-orange-100/50 dark:border-neutral-800 shadow-xl shadow-orange-100/20 dark:shadow-none group transition-all duration-500"
          >
            <div className="w-20 h-20 mb-8 rounded-3xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-inner">
              <Package className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-blue-950 dark:text-white mb-4 tracking-tight">Smart Pre-Order</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              Save time during busy lecture breaks. Order your favorite meals in advance and pick them up at your convenience.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-orange-100/50 dark:border-neutral-800 shadow-xl shadow-orange-100/20 dark:shadow-none group transition-all duration-500"
          >
            <div className="w-20 h-20 mb-8 rounded-3xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 shadow-inner">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-blue-950 dark:text-white mb-4 tracking-tight">Late Night Support</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              Studying late? Our dedicated delivery network ensures safe and hot food reaches you even at 2:00 AM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4 py-24 relative">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 dark:bg-blue-900/10 blur-[120px] rounded-full -z-10 opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 dark:bg-orange-900/10 blur-[120px] rounded-full -z-10 opacity-60" />

        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold uppercase tracking-widest">
              Our Selection
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-blue-950 dark:text-white leading-tight">
              Our Cafes <br />
              <span className="text-blue-600 italic font-serif">& Stalls</span>
            </h2>
          </div>
          
          {selectedRestaurant && (
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedRestaurant(null)}
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-blue-100 dark:border-neutral-800 text-blue-600 dark:text-blue-400 font-bold shadow-lg shadow-blue-100/50 dark:shadow-none hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <span>Showing filtered results</span>
              <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full p-1 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </motion.button>
          )}
        </div>
        <div className="space-y-24">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantSection key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

        {/* Pre-Order Section */}
        <section id="pre-order" className="bg-white dark:bg-neutral-950 py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FDFCFB] to-transparent dark:from-neutral-950" />
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
              {/* Left Content */}
              <div className="flex-1 max-w-2xl space-y-8">
                <div className="inline-block px-4 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-bold uppercase tracking-widest">
                  Save Your Time
                </div>
                <h2 className="text-5xl lg:text-6xl font-black text-blue-950 dark:text-white leading-tight tracking-tight">
                  Pre-Order <br />
                  <span className="text-orange-500 italic font-serif">Campus Food</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-light">
                  Skip the long queues at campus canteens! Pre-order your food from any campus outlet 
                  and get it delivered to your preferred location. Perfect for busy students who want to 
                  avoid the rush during break time.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <GradientButton 
                    variant="blue"
                    className="h-14 px-10 shadow-xl shadow-blue-100"
                    label="Pre-Order Now"
                  />
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                      +2k
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex items-center gap-8 grayscale opacity-50 dark:invert">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                    alt="Visa" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                    alt="Mastercard" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" 
                    alt="UPI" className="h-6 object-contain" />
                </div>
              </div>
              {/* Right Content - Elegant Discount Badge */}
              <div className="flex-1 max-w-md relative group">
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 rounded-[3rem] shadow-2xl shadow-blue-200 dark:shadow-none transform rotate-3 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="absolute -top-4 -right-4 bg-orange-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-tighter">
                    First Order
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-sm font-bold text-blue-100 uppercase tracking-[0.2em]">Limited Time Offer</div>
                    <div className="text-[10rem] font-black leading-none tracking-tighter">10%</div>
                    <div className="text-3xl font-black italic font-serif">OFF</div>
                    <p className="text-blue-100/80 pt-4 font-light">Enjoy your first pre-order with an exclusive discount.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Late Night Food Delivery Section */}
        <section className="bg-[#FDFCFB] dark:bg-neutral-900 py-32 relative overflow-hidden">
          {/* Decorative SVG Shapes */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[100px] opacity-50" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-950 p-12 lg:p-20 rounded-[3rem] border border-orange-100/50 dark:border-neutral-800 shadow-2xl shadow-orange-100/20 dark:shadow-none">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-8">
                  <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold uppercase tracking-widest">
                    Available for Hostels
                  </div>
                  <h2 className="text-5xl font-black text-blue-950 dark:text-white leading-tight tracking-tight">
                    Late Night <br />
                    <span className="text-blue-600 italic font-serif">Food Delivery</span>
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-light">
                    Special late-night delivery service available for girls' hostels! Pre-order your favorite 
                    snacks and meals until 02:00 AM. Hot food, safe delivery.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-black text-blue-950 dark:text-white">Active Until</div>
                      <div className="text-2xl font-black text-orange-500 tracking-tight">02:00 AM</div>
                    </div>
                  </div>
                  <GradientButton 
                    variant="blue"
                    className="h-14 px-10 shadow-xl shadow-blue-100"
                    label="Order Now"
                  />
                </div>
                <div className="flex-1">
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
                    <img 
                      src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" 
                      alt="Late Night Pizza" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-blue-950/0 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section id="recommendations" className="bg-white dark:bg-neutral-950 py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold uppercase tracking-widest">
                Powered by AI
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-blue-950 dark:text-white leading-tight">
                Personalized <br />
                <span className="text-blue-600 italic font-serif">Recommendations</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-light">
                Get personalized food suggestions based on your preferences, ordering history, and campus schedule.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                { title: "Smart Timing", desc: "Based on your class breaks", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "bg-blue-50 text-blue-600" },
                { title: "Taste Match", desc: "Discover new dishes you'll love", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, color: "bg-orange-50 text-orange-600" },
                { title: "Smart Deals", desc: "Personalized offers & combos", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "bg-teal-50 text-teal-600" }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-[#FDFCFB] dark:bg-neutral-900 p-10 rounded-[2.5rem] border border-orange-100/50 dark:border-neutral-800 shadow-xl shadow-orange-100/10 dark:shadow-none"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-blue-950 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Today's Recommendations */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-950 p-10 lg:p-16 rounded-[3rem] border border-blue-100/50 dark:border-neutral-800 shadow-2xl shadow-blue-100/20 dark:shadow-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 blur-[100px] -z-10" />
              
              <div className="flex items-center mb-12">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-3xl font-black text-blue-950 dark:text-white tracking-tight">Today's Top Picks</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "Georgia Cafe Special", desc: "Based on your love for Italian food", img: "/cafes/Georgia.jpg", tag: "Popular Choice" },
                  { name: "Uncle's Cafe Combo", desc: "Perfect for your evening study session", img: "/cafes/Uncle Cafe- 1.jpg", tag: "Best Value" }
                ].map((rec, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex gap-6 items-center p-4 rounded-3xl bg-[#FDFCFB] dark:bg-neutral-900 border border-orange-50 dark:border-neutral-800 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                      <img src={rec.img} alt={rec.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-blue-950 dark:text-white leading-tight">{rec.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-light">{rec.desc}</p>
                      <div className="pt-2">
                        <span className="inline-block bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                          {rec.tag}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* Hours Section */}
      <section id="hours" className="bg-[#FDFCFB] dark:bg-neutral-900 py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold uppercase tracking-widest">
              Plan Your Visit
            </div>
            <h2 className="text-5xl font-black text-blue-950 dark:text-white leading-tight">
              Opening <br />
              <span className="text-blue-600 italic font-serif">Hours</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {timings.map((timing, index) => (
              <TimingCard key={index} {...timing} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white dark:bg-neutral-950 py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#FDFCFB] to-white dark:from-neutral-900 dark:to-neutral-950 p-12 lg:p-24 rounded-[4rem] border border-orange-100/50 dark:border-neutral-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] relative">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.1" />
              </svg>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="flex-1 space-y-8">
                <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold uppercase tracking-widest">
                  Get in Touch
                </div>
                <h2 className="text-5xl lg:text-6xl font-black text-blue-950 dark:text-white leading-tight">
                  Need Help? <br />
                  <span className="text-blue-600 italic font-serif">Contact Us</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed">
                  Have questions about our cafes or want to place an order? Our team is here to help you 24/7.
                </p>
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 border border-orange-50 dark:border-neutral-700 shadow-lg flex items-center justify-center text-blue-600 hover:scale-110 transition-transform cursor-pointer">
                      {i === 1 ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> : i === 2 ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-6">
                  {[
                    { label: "Phone", val: "+91 98765 43210", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
                    { label: "Email", val: "campuscrave@sharda.ac.in", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                    { label: "Location", val: "Main Building, Central Campus", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-6 p-6 rounded-[2rem] bg-white dark:bg-neutral-900 border border-orange-50 dark:border-neutral-800 shadow-lg shadow-orange-100/10 dark:shadow-none"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</div>
                        <div className="text-blue-950 dark:text-white font-black">{item.val}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section - Merged with Footer for professionalism */}
      <footer className="bg-[#FDFCFB] dark:bg-neutral-950 pt-32 pb-16 border-t border-orange-100/50 dark:border-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-blue-950 dark:text-white">
                  Uni Cafes
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-md font-light leading-relaxed">
              Elevating the campus dining experience with smart technology and delicious food options.
            </p>
            <div className="flex gap-8">
              {['Home', 'Why Choose Us', 'About Us', 'Contact'].map((link) => (
                <a key={link} href="#" className="text-sm font-bold text-blue-950 dark:text-white hover:text-blue-600 transition-colors uppercase tracking-widest">{link}</a>
              ))}
            </div>
            <div className="pt-16 border-t border-gray-100 dark:border-neutral-900 w-full flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-sm text-gray-400 font-medium font-light">© 2026 Uni Cafes. All rights reserved.</p>
              <div className="flex gap-4">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Designed for Professionals</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
          onSignup={handleSignup}
      />

        
      </div>
    </div>
  );
}
