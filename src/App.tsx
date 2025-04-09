import React, { useState, useRef, useEffect } from 'react';
import { Utensils, UserCircle, ChevronDown, Package, LogOut, ShoppingCart } from 'lucide-react';
import MenuItem from './components/MenuItem';
import TimingCard from './components/TimingCard';
import RestaurantSection from './components/RestaurantSection';
import LoginModal from './components/LoginModal';
import FunkyBackground from './components/FunkyBackground';
import { Link, useNavigate } from 'react-router-dom';

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

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTimingOpen, setIsTimingOpen] = useState(false);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredRestaurants = selectedRestaurant 
    ? restaurants.filter(r => r.id === selectedRestaurant)
    : restaurants;

  const handleLogin = (email: string, password: string) => {
    // Here you would typically make an API call to verify credentials
    setUser({ email });
    setIsLoginModalOpen(false);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Here you would typically make an API call to create a new user
    setUser({ name, email });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
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

  const aiRecommendations = getAIRecommendations();

  return (
    <div className="min-h-screen relative">
      <FunkyBackground />
      <div className="relative z-10">
      {/* Floating 3D Elements */}
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>

      {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Utensils className="w-8 h-8 text-green-600 animate-bounce" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                  Campus Crave
              </h1>
            </div>
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors hover:scale-105 transform">
                  Home
                </Link>
                <Link to="/why-choose-us" className="text-gray-600 hover:text-green-600 transition-colors hover:scale-105 transform">
                  Why choose us?
                </Link>
                <Link to="/about-us" className="text-gray-600 hover:text-green-600 transition-colors hover:scale-105 transform">
                  About Us
                </Link>
                <a href="#menu" className="text-gray-600 hover:text-green-600 transition-colors hover:scale-105 transform">
                  Menu
                </a>
                <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors hover:scale-105 transform">
                  Contact
                </a>
              </nav>
              <div className="flex items-center space-x-4">
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                  <span className="text-gray-600">Cart</span>
                </Link>
              {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-colors"
                    >
                  <UserCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-600">{user.email}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu with higher z-index */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <Link
                          to="/my-orders"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4 mr-2" />
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                </div>
              ) : (
                <button
                    onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition-all transform hover:scale-105"
                >
                  <UserCircle className="w-6 h-6" />
                  <span>Login</span>
                </button>
              )}
              </div>
            </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1600" 
          alt="Campus Cafes"
          className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center text-white transform transition-all duration-500 hover:scale-105 px-4">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                Campus Crave
            </h2>
            <p className="text-xl md:text-3xl text-green-300">
                Skip the queue, pre-order your favorite campus food
            </p>
            <div className="mt-8">
              <a 
                href="#menu"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Our Cafes
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cafe Filter */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedRestaurant(null)}
            className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              !selectedRestaurant 
                ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg' 
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-green-50'
            }`}
          >
            All Cafes
          </button>
          {restaurants.map(restaurant => (
            <button
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                selectedRestaurant === restaurant.id 
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg' 
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-green-50'
              }`}
            >
              {restaurant.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
          Our Cafes & Stalls
        </h2>
        <div className="space-y-24">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantSection key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

        {/* Pre-Order Section */}
        <section id="pre-order" className="bg-white/90 backdrop-blur-sm py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="flex-1 max-w-2xl">
                <h2 className="text-4xl font-bold mb-6 text-blue-900">
                  Pre-Order Campus Food
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Skip the long queues at campus canteens! Pre-order your food from any campus outlet 
                  and get it delivered to your preferred location. Perfect for busy students who want to 
                  avoid the rush during break time. Use your student meal plan, campus card, or regular 
                  payment methods. Plus, get 10% off on your first pre-order and 5% off on all subsequent 
                  orders when you pay through campus payment systems.
                </p>
                <button className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                  hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Pre-Order Now
                </button>
                <div className="mt-8 flex items-center gap-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                    alt="Visa" className="h-8 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                    alt="Mastercard" className="h-8 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" 
                    alt="UPI" className="h-8 object-contain" />
                  <img src="https://us.123rf.com/450wm/koblizeek/koblizeek2111/koblizeek211100001/177121034-rupee-flat-icon-sign-vector-paper-money-symbol-isolated-on-white-background-business-graphic.jpg?ver=6" 
                    alt="UPI" className="h-8 object-contain" />
                </div>
              </div>
              {/* Right Content - Discount Badge */}
              <div className="flex-1 max-w-md relative">
                <div className="bg-red-600 text-white p-8 rounded-3xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute -top-4 -right-4 bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">
                    Limited Time Only!
                  </div>
                  <div className="text-center">
                    <div className="text-8xl font-bold mb-2">10%</div>
                    <div className="text-2xl font-semibold mb-1">OFF</div>
                    <div className="text-lg opacity-90">on your first pre-order</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Late Night Food Delivery Section */}
        <section className="bg-white/90 backdrop-blur-sm py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-blue-900">
                Late Night Food Delivery
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Special late-night delivery service available for girls' hostels! Pre-order your favorite 
                snacks and meals until 02:00 AM, and we'll deliver them safely to your hostel's 
                designated pickup point. Perfect for late-night study sessions or when you're craving 
                something after dinner. Available at all girls' hostels with proper security protocols in 
                place.
              </p>
              <div className="inline-block bg-yellow-100 px-6 py-3 rounded-full">
                <span className="text-yellow-800 font-semibold text-lg">
                  Available until 02:00 AM
                </span>
              </div>
              <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg w-full md:w-auto">
                Order Late Night Food
              </button>
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section id="recommendations" className="bg-gradient-to-b from-white/80 to-green-50/80 backdrop-blur-sm py-20 transform-gpu">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-900">
              AI-Powered Food Recommendations
            </h2>
            <p className="text-gray-600 text-center mb-16 text-lg">
              Get personalized food suggestions based on your preferences, ordering history, and campus schedule
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Smart Timing */}
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Smart Timing</h3>
                <p className="text-gray-600">
                  Get recommendations based on your class schedule and break times
                </p>
              </div>

              {/* Personalized Taste */}
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Personalized Taste</h3>
                <p className="text-gray-600">
                  Discover new dishes based on your favorite food preferences
                </p>
              </div>

              {/* Smart Deals */}
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Smart Deals</h3>
                <p className="text-gray-600">
                  Receive personalized offers and combo suggestions
                </p>
              </div>
            </div>

            {/* Today's Recommendations */}
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-900">Today's Personalized Recommendations</h3>
              </div>

              <div className="space-y-4">
                {/* Georgia Cafe Special */}
                <div className="bg-white rounded-xl p-4 shadow-lg flex items-center">
                  <img src="/cafes/Georgia.jpg" alt="Georgia Cafe" className="w-24 h-24 rounded-lg object-cover" />
                  <div className="ml-6">
                    <h4 className="text-xl font-bold text-blue-900">Georgia Cafe Special</h4>
                    <p className="text-gray-600 mb-2">Based on your love for Italian food</p>
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                      Popular Choice
                    </span>
                  </div>
                </div>

                {/* Uncle's Cafe Combo */}
                <div className="bg-white rounded-xl p-4 shadow-lg flex items-center">
                  <img src="/cafes/Uncle Cafe- 1.jpg" alt="Uncle's Cafe" className="w-24 h-24 rounded-lg object-cover" />
                  <div className="ml-6">
                    <h4 className="text-xl font-bold text-blue-900">Uncle's Cafe Combo</h4>
                    <p className="text-gray-600 mb-2">Perfect for your evening study session</p>
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                      Best Value
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Hours Section */}
      <section id="hours" className="bg-gradient-to-b from-white/80 to-green-50/80 backdrop-blur-sm py-20 transform-gpu">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
            Operating Hours
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {timings.map((timing, index) => (
              <TimingCard key={index} {...timing} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-sm p-12 rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105">
          <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
            Contact Us
          </h2>
            <p className="text-gray-600 mb-6 text-lg">Have questions about our cafes or want to place an order?</p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-gray-800 font-semibold text-xl">Phone: +91 98765 43210</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-800 font-semibold text-xl">Email: campuscrave@sharda.ac.in</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-800 font-semibold text-xl">Location: University Campus, Main Building</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-gray-600 text-sm">For specific cafe inquiries, please contact the respective cafe directly.</p>
            </div>
          </div>
        </section>

        {/* Follow Us Section */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
              Follow Us
            </h2>
            <div className="flex justify-center items-center space-x-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
              </a>
            </div>
            <div className="text-center mt-8 text-gray-600">
              Stay connected with us on social media for updates and special offers!
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <p className="text-lg">&copy; 2025 Campus Crave. All rights reserved.</p>
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

export default App;