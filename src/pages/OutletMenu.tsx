import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Utensils, ArrowLeft, UtensilsCrossed, ShoppingCart, Pizza, User, ChevronDown } from 'lucide-react';
import CartButton from '../components/CartButton';
import { useCart } from '../context/CartContext';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category?: string;
}

interface Outlet {
  id: string;
  name: string;
  description: string;
  image: string;
  menu: MenuItem[];
}

// This would typically come from an API or state management
const outlets: Outlet[] = [
  {
    id: "food-court",
    name: "Food Court",
    description: "Your one-stop destination for diverse culinary delights - from South Indian to Pan Asian cuisine",
    image: "/cafes/Food Court- 1.jpg",
    menu: [
      {
        name: "Rasam",
        description: "Traditional South Indian spiced tamarind soup",
        price: 60,
        rating: 4,
        image: "/food/rasam.jpg"
      },
      {
        name: "Idli Sambar",
        description: "Steamed rice cakes served with lentil soup and chutney",
        price: 80,
        rating: 4.5,
        image: "/food/idli.jpg"
      },
      {
        name: "Medu Vada",
        description: "Crispy lentil doughnuts served with sambar and chutney",
        price: 80,
        rating: 4.5,
        image: "/food/vada.jpg"
      },
      {
        name: "Plain Dosa",
        description: "Crispy rice and lentil crepe served with sambar and chutney",
        price: 80,
        rating: 4,
        image: "/food/dosa.jpg"
      },
      {
        name: "Masala Dosa",
        description: "Crispy crepe filled with spiced potato mixture",
        price: 100,
        rating: 4.5,
        image: "/food/masala-dosa.jpg"
      },
      {
        name: "Onion Masala Dosa",
        description: "Masala dosa with added layer of sautéed onions",
        price: 120,
        rating: 4.5,
        image: "/food/onion-dosa.jpg"
      },
      {
        name: "Pongal",
        description: "South Indian rice and lentil porridge with pepper and cumin",
        price: 80,
        rating: 4,
        image: "/food/pongal.jpg"
      },
      {
        name: "Dal Vada",
        description: "Crispy lentil fritters",
        price: 80,
        rating: 4,
        image: "/food/dal-vada.jpg"
      },
      {
        name: "Onion Uttapam",
        description: "Thick rice pancake topped with onions and vegetables",
        price: 100,
        rating: 4.5,
        image: "/food/uttapam.jpg"
      },
      {
        name: "Upma",
        description: "Savory semolina porridge with vegetables",
        price: 80,
        rating: 4,
        image: "/food/upma.jpg"
      },
      {
        name: "Lemon Rice",
        description: "Tangy rice preparation with peanuts and curry leaves",
        price: 90,
        rating: 4,
        image: "/food/lemon-rice.jpg"
      },
      {
        name: "Curd Rice",
        description: "Yogurt rice with tempering and pomegranate",
        price: 100,
        rating: 4,
        image: "/food/curd-rice.jpg"
      },
      {
        name: "Sambar Rice",
        description: "Rice mixed with lentil-based vegetable stew",
        price: 90,
        rating: 4,
        image: "/food/sambar-rice.jpg"
      },
      {
        name: "Tomato Rice",
        description: "Rice cooked with tomatoes and South Indian spices",
        price: 90,
        rating: 4,
        image: "/food/tomato-rice.jpg"
      },
      {
        name: "Combo Thali",
        description: "Rice or 4 Tawa Roti with Dal/Veg/Kadhi/Choley/Rajma (Any One)",
        price: 150,
        rating: 4,
        image: "/food/combo-thali.jpg"
      },
      {
        name: "Standard Thali",
        description: "Yellow Dal, Vegetable, 02 Tawa Roti, Rice, Salad",
        price: 180,
        rating: 4.5,
        image: "/food/standard-thali.jpg"
      },
      {
        name: "Premium Thali",
        description: "Dal Makhani, Mix Vegetable, 01 Lachha Parantha, Veg Pulao, Salad, Gulab Jamun",
        price: 220,
        rating: 4.5,
        image: "/food/premium-thali.jpg"
      },
      {
        name: "Chef Special Thali (Veg)",
        description: "Dal Makhani, Mix Vegetable, Butter Paneer, Amritsari Stuffed Kulcha, Veg Pulao, Salad, Raita, Papad, Gulab Jamun",
        price: 250,
        rating: 5,
        image: "/food/special-thali-veg.jpg"
      },
      {
        name: "Chef Special Thali (Non-Veg)",
        description: "Dal Makhani, Mix Vegetable, Butter Chicken, Amritsari Stuffed Kulcha, Veg Pulao, Salad, Raita, Papad, Gulab Jamun",
        price: 300,
        rating: 5,
        image: "/food/special-thali-nonveg.jpg"
      },
      {
        name: "Mix Vegetables",
        description: "Assorted vegetables in a rich gravy",
        price: 120,
        rating: 4,
        image: "/food/mix-veg.jpg"
      },
      {
        name: "Aloo Gobhi",
        description: "Potato and cauliflower dry curry",
        price: 120,
        rating: 4,
        image: "/food/aloo-gobhi.jpg"
      },
      {
        name: "Kadhai Paneer",
        description: "Cottage cheese cooked with bell peppers in spicy gravy",
        price: 200,
        rating: 4.5,
        image: "/food/kadhai-paneer.jpg"
      },
      {
        name: "Butter Chicken",
        description: "Tender chicken in rich tomato-based gravy (Boneless)",
        price: 320,
        rating: 4.5,
        image: "/food/butter-chicken.jpg"
      },
      {
        name: "Chilli Chicken",
        description: "Indo-Chinese style spicy chicken",
        price: 280,
        rating: 4.5,
        image: "/food/chilli-chicken.jpg"
      }
    ]
  },
  {
    id: "basil",
    name: "Basil",
    description: "Your healthy lifestyle destination with refreshing beverages and nutritious meals",
    image: "/cafes/Basil.jpg",
    menu: [
      // REFRESHERS section
      {
        name: "Mint Lemonade",
        description: "Refreshing lemonade with fresh mint leaves",
        price: 75,
        rating: 4.5,
        image: "/menu/mint-lemonade.jpg"
      },
      {
        name: "Watermelon Mojito",
        description: "Fresh watermelon juice with mint and lime",
        price: 75,
        rating: 4.5,
        image: "/menu/watermelon-mojito.jpg"
      },
      {
        name: "Pineapple Mojito",
        description: "Tropical pineapple juice with mint and lime",
        price: 75,
        rating: 4.5,
        image: "/menu/pineapple-mojito.jpg"
      },
      {
        name: "Watermelon Orange",
        description: "Blend of fresh watermelon and orange juice",
        price: 99,
        rating: 4.5,
        image: "/menu/watermelon-orange.jpg"
      },
      {
        name: "Orange Paradise",
        description: "Premium orange juice blend",
        price: 99,
        rating: 4.5,
        image: "/menu/orange-paradise.jpg"
      },
      {
        name: "Kiwi Delight",
        description: "Fresh kiwi juice blend",
        price: 125,
        rating: 4.5,
        image: "/menu/kiwi-delight.jpg"
      },
      // SMOOTHIES section
      {
        name: "Mixed Fruit Smoothie",
        description: "Blend of seasonal mixed fruits",
        price: 175,
        rating: 4.5,
        image: "/menu/mixed-fruit-smoothie.jpg"
      },
      {
        name: "Mango Smoothie",
        description: "Rich and creamy mango smoothie",
        price: 175,
        rating: 4.5,
        image: "/menu/mango-smoothie.jpg"
      },
      {
        name: "Mixed Berry Smoothie",
        description: "Blend of assorted berries",
        price: 175,
        rating: 4.5,
        image: "/menu/mixed-berry-smoothie.jpg"
      },
      {
        name: "Blueberry Fruit Punch",
        description: "Refreshing blueberry punch",
        price: 175,
        rating: 4.5,
        image: "/menu/blueberry-punch.jpg"
      },
      // POPPI 99KCAL section
      {
        name: "Poppi Kiwi",
        description: "Low-calorie kiwi refresher",
        price: 75,
        rating: 4,
        image: "/menu/poppi-kiwi.jpg"
      },
      {
        name: "Poppi Kiwi-Pine",
        description: "Low-calorie kiwi and pineapple blend",
        price: 75,
        rating: 4,
        image: "/menu/poppi-kiwi-pine.jpg"
      },
      {
        name: "Poppi Tender Coconut",
        description: "Low-calorie coconut refresher",
        price: 75,
        rating: 4,
        image: "/menu/poppi-coconut.jpg"
      },
      {
        name: "Poppi Chili Guava",
        description: "Low-calorie spicy guava drink",
        price: 75,
        rating: 4,
        image: "/menu/poppi-guava.jpg"
      },
      // DETOX DRINKS section
      {
        name: "Mix Vegetable",
        description: "Healthy mix vegetable juice",
        price: 75,
        rating: 4,
        image: "/menu/mix-vegetable.jpg"
      },
      {
        name: "Red Carrot Beetroot",
        description: "Nutritious carrot and beetroot blend",
        price: 75,
        rating: 4,
        image: "/menu/carrot-beetroot.jpg"
      },
      {
        name: "Vitamin C Detox",
        description: "Vitamin C rich detox drink",
        price: 99,
        rating: 4.5,
        image: "/menu/vitamin-c-detox.jpg"
      },
      // COLD-PRESSED JUICES section
      {
        name: "Watermelon Juice",
        description: "Fresh cold-pressed watermelon juice",
        price: 75,
        rating: 4,
        image: "/menu/watermelon-juice.jpg"
      },
      {
        name: "Pineapple Juice",
        description: "Fresh cold-pressed pineapple juice",
        price: 75,
        rating: 4,
        image: "/menu/pineapple-juice.jpg"
      },
      {
        name: "Orange Juice",
        description: "Fresh cold-pressed orange juice",
        price: 99,
        rating: 4.5,
        image: "/menu/orange-juice.jpg"
      },
      {
        name: "Orange-Pineapple Juice",
        description: "Blend of orange and pineapple juice",
        price: 99,
        rating: 4.5,
        image: "/menu/orange-pineapple.jpg"
      },
      {
        name: "Mix Fruit Juice",
        description: "Blend of seasonal fruits",
        price: 125,
        rating: 4.5,
        image: "/menu/mix-fruit-juice.jpg"
      },
      // SHAKES & COLD COFFEE section
      {
        name: "Cold Coffee (with Honey)",
        description: "Chilled coffee sweetened with honey",
        price: 99,
        rating: 4.5,
        image: "/menu/cold-coffee-honey.jpg"
      },
      {
        name: "Banana Shake",
        description: "Creamy banana milkshake",
        price: 99,
        rating: 4,
        image: "/menu/banana-shake.jpg"
      },
      {
        name: "Cold Coffee (with Dates)",
        description: "Chilled coffee sweetened with dates",
        price: 99,
        rating: 4.5,
        image: "/menu/cold-coffee-dates.jpg"
      },
      {
        name: "Badam Thandai",
        description: "Traditional almond spiced drink",
        price: 125,
        rating: 4.5,
        image: "/menu/badam-thandai.jpg"
      },
      {
        name: "Kesar Dry Fruit Shake",
        description: "Rich shake with saffron and dry fruits",
        price: 125,
        rating: 4.5,
        image: "/menu/kesar-dry-fruit.jpg"
      },
      // HOT BEVERAGES section
      {
        name: "Adrak Chai",
        description: "Traditional ginger tea",
        price: 49,
        rating: 4,
        image: "/menu/adrak-chai.jpg"
      },
      {
        name: "Masala Chai",
        description: "Spiced Indian tea",
        price: 49,
        rating: 4,
        image: "/menu/masala-chai.jpg"
      },
      {
        name: "Elaichi Chai",
        description: "Cardamom flavored tea",
        price: 49,
        rating: 4,
        image: "/menu/elaichi-chai.jpg"
      },
      {
        name: "Turmeric Latte",
        description: "Healthy turmeric-infused milk",
        price: 75,
        rating: 4.5,
        image: "/menu/turmeric-latte.jpg"
      },
      // FOOD & SALADS section
      {
        name: "Zesty Corn Chaat",
        description: "Spiced corn kernels with herbs",
        price: 75,
        rating: 4,
        image: "/menu/corn-chaat.jpg"
      },
      {
        name: "Millet Veggie Sandwich",
        description: "Healthy sandwich with millet bread",
        price: 99,
        rating: 4.5,
        image: "/menu/millet-sandwich.jpg"
      },
      {
        name: "Custom Fruit Bowl",
        description: "Customizable fresh fruit bowl",
        price: 99,
        rating: 4.5,
        image: "/menu/fruit-bowl.jpg"
      },
      // COMBOS section
      {
        name: "Wrap Combo",
        description: "Wrap with beverage of choice",
        price: 199,
        rating: 4.5,
        image: "/menu/wrap-combo.jpg"
      },
      {
        name: "Sandwich Combo",
        description: "Sandwich with beverage of choice",
        price: 199,
        rating: 4.5,
        image: "/menu/sandwich-combo.jpg"
      },
      // ICE TEA section
      {
        name: "Lemon Ice Tea",
        description: "Classic lemon iced tea",
        price: 75,
        rating: 4,
        image: "/menu/lemon-ice-tea.jpg"
      },
      {
        name: "Watermelon Ice Tea",
        description: "Refreshing watermelon iced tea",
        price: 75,
        rating: 4,
        image: "/menu/watermelon-ice-tea.jpg"
      },
      // VEGAN BASE OPTIONS section
      {
        name: "Coconut Water",
        description: "Fresh natural coconut water",
        price: 99,
        rating: 4,
        image: "/menu/coconut-water.jpg"
      },
      {
        name: "Almond Milk",
        description: "Fresh homemade almond milk",
        price: 125,
        rating: 4.5,
        image: "/menu/almond-milk.jpg"
      },
      // ADD-ONS section
      {
        name: "Basil Seeds",
        description: "Healthy basil seed supplement",
        price: 20,
        rating: 4,
        image: "/menu/basil-seeds.jpg"
      },
      {
        name: "Almonds",
        description: "Premium almonds",
        price: 20,
        rating: 4,
        image: "/menu/almonds.jpg"
      },
      {
        name: "Oats",
        description: "Healthy oats supplement",
        price: 20,
        rating: 4,
        image: "/menu/oats.jpg"
      },
      {
        name: "Peanut",
        description: "Roasted peanuts",
        price: 20,
        rating: 4,
        image: "/menu/peanut.jpg"
      },
      {
        name: "Peanut Butter",
        description: "Natural peanut butter",
        price: 20,
        rating: 4,
        image: "/menu/peanut-butter.jpg"
      },
      {
        name: "Whey Protein (25g Muscle Blaze)",
        description: "Protein supplement",
        price: 99,
        rating: 4.5,
        image: "/menu/whey-protein.jpg"
      }
    ]
  },
  {
    id: "happiness-store",
    name: "Happiness Store",
    description: "Your one-stop destination for delicious snacks, sandwiches, and beverages",
    image: "/cafes/Happiness Store.jpg",
    menu: [
      // SAVOURIES section
      {
        name: "Vada Pao",
        description: "Classic Mumbai street food with spiced potato patty in a bun",
        price: 40,
        rating: 4.5,
        image: "https://example.com/vada-pao.jpg"
      },
      {
        name: "Chaap Hot Dog",
        description: "Vegetarian hot dog with soya chaap filling",
        price: 60,
        rating: 4,
        image: "https://example.com/chaap-hot-dog.jpg"
      },
      {
        name: "Paneer Hot Dog",
        description: "Hot dog with spiced paneer filling",
        price: 70,
        rating: 4.5,
        image: "https://example.com/paneer-hot-dog.jpg"
      },
      {
        name: "Chicken Hot Dog",
        description: "Classic hot dog with chicken sausage",
        price: 80,
        rating: 4.5,
        image: "https://example.com/chicken-hot-dog.jpg"
      },
      {
        name: "Paneer Kulcha",
        description: "Stuffed bread with spiced cottage cheese filling",
        price: 60,
        rating: 4.5,
        image: "https://example.com/paneer-kulcha.jpg"
      },
      {
        name: "Aloo Pyaza Kulcha",
        description: "Stuffed bread with potato and onion filling",
        price: 50,
        rating: 4,
        image: "https://example.com/aloo-kulcha.jpg"
      },
      {
        name: "Chicken Kulcha",
        description: "Stuffed bread with spiced chicken filling",
        price: 70,
        rating: 4.5,
        image: "https://example.com/chicken-kulcha.jpg"
      },
      {
        name: "Chicken Nuggets",
        description: "Crispy chicken nuggets served with dips",
        price: 120,
        rating: 4.5,
        image: "https://example.com/chicken-nuggets.jpg"
      },
      {
        name: "Chicken Seekh Kebab",
        description: "Grilled minced chicken kebabs with Indian spices",
        price: 150,
        rating: 4.5,
        image: "https://example.com/seekh-kebab.jpg"
      },
      {
        name: "Potato Cheese Shots",
        description: "Crispy potato balls filled with molten cheese",
        price: 80,
        rating: 4.5,
        image: "https://example.com/cheese-shots.jpg"
      },
      // SANDWICH & BURGERS section
      {
        name: "Veg Grilled Sandwich",
        description: "Grilled sandwich with mixed vegetables and cheese",
        price: 70,
        rating: 4,
        image: "https://example.com/veg-sandwich.jpg"
      },
      {
        name: "Cheese Sandwich",
        description: "Classic grilled cheese sandwich",
        price: 60,
        rating: 4,
        image: "https://example.com/cheese-sandwich.jpg"
      },
      {
        name: "Spinach and Corn Sandwich",
        description: "Healthy sandwich with spinach and sweet corn filling",
        price: 80,
        rating: 4,
        image: "https://example.com/spinach-sandwich.jpg"
      },
      {
        name: "Paneer Sandwich in Tandoori Sauce",
        description: "Grilled sandwich with tandoori spiced paneer",
        price: 90,
        rating: 4.5,
        image: "https://example.com/tandoori-sandwich.jpg"
      },
      // WRAPS & FRIES section
      {
        name: "Veg Wrap",
        description: "Fresh vegetables wrapped in a tortilla",
        price: 80,
        rating: 4,
        image: "https://example.com/veg-wrap.jpg"
      },
      {
        name: "Paneer Wrap",
        description: "Spiced paneer and vegetables in a tortilla",
        price: 90,
        rating: 4.5,
        image: "https://example.com/paneer-wrap.jpg"
      },
      {
        name: "Cheese Loaded Fries",
        description: "Crispy fries topped with melted cheese",
        price: 100,
        rating: 4.5,
        image: "https://example.com/cheese-fries.jpg"
      },
      // PASTAS section
      {
        name: "Arrabbiata Red Sauce Pasta",
        description: "Spicy tomato sauce pasta with Italian herbs",
        price: 120,
        rating: 4,
        image: "https://example.com/arrabbiata-pasta.jpg"
      },
      {
        name: "Alfredo White Sauce Pasta",
        description: "Creamy white sauce pasta with mushrooms",
        price: 130,
        rating: 4.5,
        image: "https://example.com/alfredo-pasta.jpg"
      },
      // BEVERAGES section
      {
        name: "Virgin Mojito",
        description: "Refreshing mint and lime mocktail",
        price: 60,
        rating: 4.5,
        image: "https://example.com/virgin-mojito.jpg"
      },
      {
        name: "Chocolate Fudge Shake",
        description: "Rich chocolate shake with fudge sauce",
        price: 120,
        rating: 4.5,
        image: "https://example.com/chocolate-shake.jpg"
      },
      {
        name: "Kit Kat Chopper Shake",
        description: "Milkshake blended with Kit Kat pieces",
        price: 130,
        rating: 4.5,
        image: "https://example.com/kitkat-shake.jpg"
      }
    ]
  },
  {
    id: "ahaar-cafe",
    name: "Ahaar Cafe",
    description: "Authentic North Indian flavors in every bite",
    image: "/cafes/Ahaar Cafe- 1.jpg",
    menu: [
      {
        name: "Dal Makhani",
        description: "Creamy black lentils cooked overnight",
        price: 150,
        rating: 4.5,
        image: "/food/dal-makhani.jpg"
      },
      {
        name: "Butter Naan",
        description: "Soft and buttery Indian bread",
        price: 40,
        rating: 4.5,
        image: "/food/butter-naan.jpg"
      },
      {
        name: "Mix Veg",
        description: "Assorted vegetables in rich gravy",
        price: 130,
        rating: 4.3,
        image: "/food/mix-veg.jpg"
      }
    ]
  },
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
    description: "Your favorite coffee house serving delicious beverages, snacks, and continental delights",
    image: "/cafes/Georgia.jpg",
    menu: [
      // HOT BEVERAGES
      {
        name: "Freshly Brewed Coffee",
        description: "Choose your size: Regular/Medium/Large",
        price: 40,
        rating: 4.5,
        image: "/menu-items/coffee.jpg"
      },
      {
        name: "Espresso",
        description: "Strong concentrated coffee brewed by forcing hot water under pressure",
        price: 40,
        rating: 4.5,
        image: "/menu-items/espresso.jpg"
      },
      {
        name: "Cappuccino",
        description: "Espresso topped with foamy milk and a sprinkle of cocoa powder",
        price: 40,
        rating: 4.5,
        image: "/menu-items/cappuccino.jpg"
      },
      {
        name: "Americano",
        description: "Espresso diluted with hot water",
        price: 40,
        rating: 4,
        image: "/menu-items/americano.jpg"
      },
      {
        name: "Mocachino",
        description: "Chocolate flavored coffee with steamed milk",
        price: 40,
        rating: 4.5,
        image: "/menu-items/mocachino.jpg"
      },
      {
        name: "Hot Chocolate",
        description: "Rich and creamy hot chocolate with whipped cream",
        price: 40,
        rating: 4.5,
        image: "/menu-items/hot-chocolate.jpg"
      },
      {
        name: "Badam Milk",
        description: "Hot almond-flavored milk with nuts",
        price: 40,
        rating: 4,
        image: "/menu-items/badam-milk.jpg"
      },
      {
        name: "Regular Coffee",
        description: "Classic filter coffee",
        price: 30,
        rating: 4,
        image: "/menu-items/regular-coffee.jpg"
      },
      {
        name: "Masala Tea",
        description: "Indian spiced tea with aromatic herbs",
        price: 30,
        rating: 4,
        image: "/menu-items/masala-tea.jpg"
      },
      {
        name: "Cardamom Tea",
        description: "Tea flavored with cardamom",
        price: 30,
        rating: 4,
        image: "/menu-items/cardamom-tea.jpg"
      },
      {
        name: "Green Tea",
        description: "Healthy green tea with antioxidants",
        price: 30,
        rating: 4,
        image: "/menu-items/green-tea.jpg"
      },
      {
        name: "Kulhad Tea",
        description: "Traditional clay pot served tea",
        price: 25,
        rating: 4,
        image: "/menu-items/kulhad-tea.jpg"
      },
      // COLD BEVERAGES
      {
        name: "Ice Tea",
        description: "Refreshing cold tea with lemon",
        price: 40,
        rating: 4,
        image: "/menu-items/ice-tea.jpg"
      },
      {
        name: "Cold Coffee",
        description: "Choose your size: Regular/Medium/Large",
        price: 70,
        rating: 4.5,
        image: "/menu-items/cold-coffee.jpg"
      },
      {
        name: "Cold Badam Milk",
        description: "Chilled almond milk with nuts: Regular/Medium/Large",
        price: 60,
        rating: 4,
        image: "/menu-items/cold-badam-milk.jpg"
      },
      // SHAKES
      {
        name: "Vanilla Shake",
        description: "Classic vanilla milkshake: Regular/Medium/Large",
        price: 70,
        rating: 4,
        image: "/menu-items/vanilla-shake.jpg"
      },
      {
        name: "Strawberry Shake",
        description: "Fresh strawberry milkshake: Regular/Medium/Large",
        price: 70,
        rating: 4.5,
        image: "/menu-items/strawberry-shake.jpg"
      },
      {
        name: "Butterscotch Shake",
        description: "Rich butterscotch milkshake: Regular/Medium/Large",
        price: 70,
        rating: 4.5,
        image: "/menu-items/butterscotch-shake.jpg"
      },
      {
        name: "Chocolate Shake",
        description: "Creamy chocolate milkshake: Regular/Medium/Large",
        price: 70,
        rating: 4.5,
        image: "/menu-items/chocolate-shake.jpg"
      },
      {
        name: "KitKat Shake",
        description: "KitKat chocolate bar blended shake: Regular/Medium/Large",
        price: 80,
        rating: 4.5,
        image: "/menu-items/kitkat-shake.jpg"
      },
      // MOCKTAILS
      {
        name: "Mojito",
        description: "Refreshing mint and lime mocktail",
        price: 50,
        rating: 4,
        image: "/menu-items/mojito.jpg"
      },
      {
        name: "Fruit Punch",
        description: "Mixed fruit mocktail",
        price: 50,
        rating: 4,
        image: "/menu-items/fruit-punch.jpg"
      },
      // SNACKS
      {
        name: "Masala Maggi",
        description: "Classic instant noodles with Indian spices",
        price: 40,
        rating: 4.5,
        image: "/menu-items/masala-maggi.jpg"
      },
      {
        name: "Veg. Maggi",
        description: "Instant noodles with mixed vegetables",
        price: 50,
        rating: 4,
        image: "/menu-items/veg-maggi.jpg"
      },
      // SANDWICHES
      {
        name: "Veg. Sandwich",
        description: "Grilled sandwich with mixed vegetables",
        price: 60,
        rating: 4,
        image: "/menu-items/veg-sandwich.jpg"
      },
      {
        name: "Paneer Sandwich",
        description: "Grilled sandwich with spiced cottage cheese",
        price: 70,
        rating: 4.5,
        image: "/menu-items/paneer-sandwich.jpg"
      },
      // PIZZA
      {
        name: "Veg. Pizza",
        description: "Fresh veggie topped pizza with cheese",
        price: 130,
        rating: 4.5,
        image: "/menu-items/veg-pizza.jpg"
      },
      {
        name: "Paneer Pizza",
        description: "Pizza topped with spiced cottage cheese and vegetables",
        price: 150,
        rating: 4.5,
        image: "/menu-items/paneer-pizza.jpg"
      },
      // PASTA
      {
        name: "Red Sauce Pasta",
        description: "Pasta in spicy tomato sauce",
        price: 120,
        rating: 4,
        image: "/menu-items/red-sauce-pasta.jpg"
      },
      {
        name: "White Sauce Pasta",
        description: "Creamy white sauce pasta",
        price: 120,
        rating: 4,
        image: "/menu-items/white-sauce-pasta.jpg"
      },
      // DESSERTS
      {
        name: "Brownie",
        description: "Rich chocolate brownie",
        price: 60,
        rating: 4.5,
        image: "/menu-items/brownie.jpg"
      },
      {
        name: "Chocolava",
        description: "Chocolate lava cake with molten center",
        price: 80,
        rating: 4.5,
        image: "/menu-items/chocolava.jpg"
      }
    ]
  },
  {
    id: "subway",
    name: "Subway",
    description: "Fresh and customizable subs, sandwiches, and salads made to order",
    image: "/cafes/Subway.jpg",
    menu: [
      // VEG SUBS section
      {
        name: "Veggie Delite (6-inch/Footlong)",
        description: "Fresh mixed vegetables in a sub of your choice",
        price: 199,
        rating: 4.5,
        category: "VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Double Egg n' Cheese Omelette (6-inch/Footlong)",
        description: "Double egg omelette with melted cheese",
        price: 219,
        rating: 4.5,
        category: "VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Corn & Peas (6-inch/Footlong)",
        description: "Sweet corn and green peas with signature sauces",
        price: 209,
        rating: 4,
        category: "VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Veg Shami (6-inch/Footlong)",
        description: "Vegetable patty with fresh veggies",
        price: 229,
        rating: 4.5,
        category: "VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Chilli Bean Patty (6-inch/Footlong)",
        description: "Spicy bean patty with fresh vegetables",
        price: 219,
        rating: 4,
        category: "VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Paneer Tikka (6-inch/Footlong)",
        description: "Grilled spiced cottage cheese with vegetables",
        price: 239,
        rating: 4.5,
        category: "VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      // NON-VEG SUBS section
      {
        name: "Chicken Slice (6-inch/Footlong)",
        description: "Tender chicken slices with fresh vegetables",
        price: 249,
        rating: 4.5,
        category: "NON-VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Chicken Meatball (6-inch/Footlong)",
        description: "Juicy chicken meatballs in marinara sauce",
        price: 259,
        rating: 4.5,
        category: "NON-VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Roast Chicken (6-inch/Footlong)",
        description: "Roasted chicken with signature sauces",
        price: 269,
        rating: 4.5,
        category: "NON-VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Peri Peri Chicken (6-inch/Footlong)",
        description: "Spicy peri peri flavored chicken",
        price: 279,
        rating: 4.5,
        category: "NON-VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Tandoori Chicken (6-inch/Footlong)",
        description: "Classic tandoori spiced chicken",
        price: 279,
        rating: 4.5,
        category: "NON-VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Chicken Teriyaki (6-inch/Footlong)",
        description: "Sweet and savory teriyaki chicken",
        price: 289,
        rating: 4.5,
        category: "NON-VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Tuna (6-inch/Footlong)",
        description: "Classic tuna mix with mayonnaise",
        price: 269,
        rating: 4,
        category: "NON-VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      {
        name: "Italian BMT (Chicken) (6-inch/Footlong)",
        description: "Italian-style sub with chicken and pepperoni",
        price: 299,
        rating: 4.5,
        category: "NON-VEG SUBS",
        image: "/placeholder-sub.jpg"
      },
      // ADD-ONS section
      {
        name: "Cheese Slice",
        description: "Extra slice of cheese",
        price: 30,
        rating: 4,
        category: "ADD-ONS",
        image: "/placeholder-addon.jpg"
      },
      {
        name: "Cheese Pull",
        description: "Extra melted cheese",
        price: 40,
        rating: 4.5,
        category: "ADD-ONS",
        image: "/placeholder-addon.jpg"
      },
      {
        name: "Extra Veg Protein",
        description: "Additional vegetarian protein",
        price: 50,
        rating: 4,
        category: "ADD-ONS",
        image: "/placeholder-addon.jpg"
      },
      {
        name: "Extra Non-Veg Protein",
        description: "Additional non-vegetarian protein",
        price: 60,
        rating: 4.5,
        category: "ADD-ONS",
        image: "/placeholder-addon.jpg"
      },
      {
        name: "Speciality Dips",
        description: "Choice of special dipping sauces",
        price: 35,
        rating: 4,
        category: "ADD-ONS",
        image: "/placeholder-addon.jpg"
      },
      // SNACKS & SIDES section
      {
        name: "Crispers",
        description: "Crunchy potato crisps",
        price: 49,
        rating: 4,
        category: "SNACKS & SIDES",
        image: "/placeholder-snack.jpg"
      },
      {
        name: "Veggie Kebabs with dip",
        description: "Grilled vegetable kebabs served with dip",
        price: 129,
        rating: 4.5,
        category: "SNACKS & SIDES",
        image: "/placeholder-snack.jpg"
      },
      {
        name: "Chicken Meatballs with dip",
        description: "Seasoned chicken meatballs with dip",
        price: 149,
        rating: 4.5,
        category: "SNACKS & SIDES",
        image: "/placeholder-snack.jpg"
      },
      {
        name: "Toastie",
        description: "Grilled sandwich with choice of filling",
        price: 99,
        rating: 4,
        category: "SNACKS & SIDES",
        image: "/placeholder-snack.jpg"
      },
      {
        name: "Nachos with Dip",
        description: "Crispy nachos served with cheese dip",
        price: 119,
        rating: 4.5,
        category: "SNACKS & SIDES",
        image: "/placeholder-snack.jpg"
      }
    ]
  },
  {
    id: "uncles",
    name: "Uncle's Cafe",
    description: "Your favorite spot for delicious sandwiches, burgers, and comfort food",
    image: "/cafes/Uncle Cafe- 1.jpg",
    menu: [
      // Bread 'N' More - Sandwiches
      {
        name: "Veg Sandwich",
        description: "Fresh vegetables with special sauce in toasted bread",
        price: 80,
        rating: 4.0,
        image: "/food/veg-sandwich.jpg",
        category: "Bread 'N' More"
      },
      {
        name: "Cheese Sandwich",
        description: "Melted cheese with vegetables in toasted bread",
        price: 90,
        rating: 4.2,
        image: "/food/cheese-sandwich.jpg",
        category: "Bread 'N' More"
      },
      {
        name: "Chilli Cheese Sandwich",
        description: "Spicy sandwich with melted cheese and green chilies",
        price: 95,
        rating: 4.3,
        image: "/food/chilli-cheese-sandwich.jpg",
        category: "Bread 'N' More"
      },
      {
        name: "Chicken Tikka Sandwich",
        description: "Grilled chicken tikka with vegetables and special sauce",
        price: 120,
        rating: 4.5,
        image: "/food/chicken-tikka-sandwich.jpg",
        category: "Bread 'N' More"
      },
      // Burgers
      {
        name: "Veg Burger",
        description: "Crispy vegetable patty with fresh veggies and sauce",
        price: 90,
        rating: 4.0,
        image: "/food/veg-burger.jpg",
        category: "Burgers"
      },
      {
        name: "Veg Cheese Burger",
        description: "Vegetable patty with melted cheese and special sauce",
        price: 110,
        rating: 4.2,
        image: "/food/veg-cheese-burger.jpg",
        category: "Burgers"
      },
      {
        name: "Uncle's Spl Veg Burger",
        description: "Special veg burger with extra toppings and secret sauce",
        price: 130,
        rating: 4.5,
        image: "/food/special-veg-burger.jpg",
        category: "Burgers"
      },
      {
        name: "Chicken Burger",
        description: "Grilled chicken patty with fresh vegetables",
        price: 120,
        rating: 4.3,
        image: "/food/chicken-burger.jpg",
        category: "Burgers"
      },
      // Momo's
      {
        name: "Veg Steam Momo's",
        description: "Steamed dumplings filled with spiced vegetables",
        price: 80,
        rating: 4.2,
        image: "/food/veg-momos.jpg",
        category: "Momo's"
      },
      {
        name: "Chicken Steam Momo's",
        description: "Steamed dumplings with spiced chicken filling",
        price: 100,
        rating: 4.4,
        image: "/food/chicken-momos.jpg",
        category: "Momo's"
      },
      {
        name: "Veg Fried Momo's",
        description: "Crispy fried vegetable dumplings",
        price: 90,
        rating: 4.3,
        image: "/food/fried-veg-momos.jpg",
        category: "Momo's"
      },
      // Fries 'N' Finger
      {
        name: "French Fries",
        description: "Crispy golden potato fries",
        price: 80,
        rating: 4.0,
        image: "/food/french-fries.jpg",
        category: "Fries 'N' Finger"
      },
      {
        name: "Masala Fries",
        description: "Spiced fries with Indian masala",
        price: 90,
        rating: 4.2,
        image: "/food/masala-fries.jpg",
        category: "Fries 'N' Finger"
      },
      {
        name: "Chicken Strips",
        description: "Crispy fried chicken strips",
        price: 150,
        rating: 4.4,
        image: "/food/chicken-strips.jpg",
        category: "Fries 'N' Finger"
      },
      // Italian Bite
      {
        name: "Pasta White Sauce Veg",
        description: "Creamy white sauce pasta with vegetables",
        price: 140,
        rating: 4.3,
        image: "/food/white-sauce-pasta.jpg",
        category: "Italian Bite"
      },
      {
        name: "Pasta Red Sauce Veg",
        description: "Tangy tomato sauce pasta with vegetables",
        price: 130,
        rating: 4.2,
        image: "/food/red-sauce-pasta.jpg",
        category: "Italian Bite"
      },
      // Maggi 'N' Noodles
      {
        name: "Veg Maggi",
        description: "Classic Maggi noodles with vegetables",
        price: 60,
        rating: 4.0,
        image: "/food/veg-maggi.jpg",
        category: "Maggi 'N' Noodles"
      },
      {
        name: "Cheese Maggi",
        description: "Maggi noodles with melted cheese",
        price: 80,
        rating: 4.2,
        image: "/food/cheese-maggi.jpg",
        category: "Maggi 'N' Noodles"
      },
      // Baker's Basket
      {
        name: "Veg Samosa",
        description: "Crispy pastry filled with spiced potatoes",
        price: 30,
        rating: 4.3,
        image: "/food/samosa.jpg",
        category: "Baker's Basket"
      },
      {
        name: "Veg Puff",
        description: "Flaky pastry with vegetable filling",
        price: 35,
        rating: 4.0,
        image: "/food/veg-puff.jpg",
        category: "Baker's Basket"
      },
      // Sweet Tooth
      {
        name: "Brownie",
        description: "Rich chocolate brownie",
        price: 60,
        rating: 4.5,
        image: "/food/brownie.jpg",
        category: "Sweet Tooth"
      },
      {
        name: "Brownie with Ice Cream",
        description: "Warm brownie served with vanilla ice cream",
        price: 90,
        rating: 4.7,
        image: "/food/brownie-icecream.jpg",
        category: "Sweet Tooth"
      }
    ]
  },
  {
    id: "ccd",
    name: "Cafe Coffee Day",
    description: "Your favorite coffee destination offering a wide range of beverages from classic espresso to refreshing teas and cold drinks",
    image: "/cafes/CCD.jpg",
    menu: [
      {
        name: "Espresso",
        description: "Rich and intense coffee shot, perfect for coffee purists",
        price: 50,
        rating: 4.5,
        image: "/beverages/espresso.jpg",
        category: "Heart-Warming Coffees"
      },
      {
        name: "Cafe Mocha",
        description: "Perfect blend of coffee and chocolate for a luxurious experience",
        price: 55,
        rating: 4.5,
        image: "/beverages/cafe-mocha.jpg",
        category: "Heart-Warming Coffees"
      },
      {
        name: "Americano",
        description: "Espresso diluted with hot water for a smooth coffee experience",
        price: 50,
        rating: 4.0,
        image: "/beverages/americano.jpg",
        category: "Heart-Warming Coffees"
      },
      {
        name: "Cappuccino",
        description: "Classic Italian coffee topped with creamy milk foam",
        price: 50,
        rating: 4.5,
        image: "/beverages/cappuccino.jpg",
        category: "Heart-Warming Coffees"
      },
      {
        name: "Cafe Latte",
        description: "Smooth espresso with steamed milk and light foam",
        price: 50,
        rating: 4.5,
        image: "/beverages/cafe-latte.jpg",
        category: "Heart-Warming Coffees"
      },
      {
        name: "Filter Coffee",
        description: "Traditional South Indian style filter coffee",
        price: 35,
        rating: 4.5,
        image: "/beverages/filter-coffee.jpg",
        category: "Heart-Warming Coffees"
      },
      {
        name: "Garam Chai",
        description: "Traditional Indian hot tea with aromatic spices",
        price: 50,
        rating: 4.0,
        image: "/beverages/garam-chai.jpg",
        category: "Refreshing Teas"
      },
      {
        name: "Lemon Chai",
        description: "Hot tea with a refreshing citrus twist",
        price: 50,
        rating: 4.0,
        image: "/beverages/lemon-chai.jpg",
        category: "Refreshing Teas"
      },
      {
        name: "Green Tea",
        description: "Light and healthy green tea with antioxidants",
        price: 50,
        rating: 4.0,
        image: "/beverages/green-tea.jpg",
        category: "Refreshing Teas"
      },
      {
        name: "Cardamom Chai",
        description: "Aromatic tea infused with cardamom",
        price: 50,
        rating: 4.0,
        image: "/beverages/cardamom-chai.jpg",
        category: "Refreshing Teas"
      },
      {
        name: "Ginger Chai",
        description: "Spicy tea with fresh ginger for extra warmth",
        price: 50,
        rating: 4.0,
        image: "/beverages/ginger-chai.jpg",
        category: "Refreshing Teas"
      },
      {
        name: "Masala Chai",
        description: "Classic Indian tea with a blend of aromatic spices",
        price: 50,
        rating: 4.0,
        image: "/beverages/masala-chai.jpg",
        category: "Refreshing Teas"
      },
      {
        name: "Boost",
        description: "Energy-packed malted drink for active lifestyles",
        price: 60,
        rating: 4.0,
        image: "/beverages/boost.jpg",
        category: "Healthy Classics"
      },
      {
        name: "Horlicks",
        description: "Nutritious malted milk drink with essential nutrients",
        price: 60,
        rating: 4.0,
        image: "/beverages/horlicks.jpg",
        category: "Healthy Classics"
      },
      {
        name: "Eskimo Coffee",
        description: "Chilled coffee topped with ice cream",
        price: 65,
        rating: 4.5,
        image: "/beverages/eskimo-coffee.jpg",
        category: "Cold Coffee Delights"
      },
      {
        name: "Tropical Moksha",
        description: "Refreshing tropical coffee blend with exotic flavors",
        price: 65,
        rating: 4.5,
        image: "/beverages/tropical-moksha.jpg",
        category: "Cold Coffee Delights"
      },
      {
        name: "Cold Choco",
        description: "Chilled chocolate drink for chocolate lovers",
        price: 65,
        rating: 4.5,
        image: "/beverages/cold-choco.jpg",
        category: "Chocoholicas"
      },
      {
        name: "Chocolate Moksha",
        description: "Premium chocolate beverage with rich cocoa",
        price: 55,
        rating: 4.5,
        image: "/beverages/chocolate-moksha.jpg",
        category: "Chocoholicas"
      },
      {
        name: "Orangillo",
        description: "Refreshing orange-based frozen drink",
        price: 50,
        rating: 4.0,
        image: "/beverages/orangillo.jpg",
        category: "Frosteezers"
      },
      {
        name: "Lemon Iced Tea",
        description: "Chilled tea with fresh lemon",
        price: 50,
        rating: 4.0,
        image: "/beverages/lemon-iced-tea.jpg",
        category: "Frosteezers"
      },
      {
        name: "Storm Energy Drink",
        description: "Energizing beverage for an instant boost",
        price: 60,
        rating: 4.0,
        image: "/beverages/storm-energy.jpg",
        category: "Ready to Drink"
      },
      {
        name: "Cold Coffee (Vanilla/Hazelnut)",
        description: "Ready-to-drink flavored cold coffee",
        price: 65,
        rating: 4.5,
        image: "/beverages/cold-coffee-flavored.jpg",
        category: "Ready to Drink"
      },
      {
        name: "Rush Fruit Juice",
        description: "Refreshing fruit juice (Mango/Pomegranate)",
        price: 50,
        rating: 4.0,
        image: "/beverages/rush-juice.jpg",
        category: "Ready to Drink"
      }
    ]
  },
  // Add other outlets here...
];

const OutletMenu: React.FC = () => {
  const { outletId } = useParams<{ outletId: string }>();
  const { totalItems, totalAmount } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const outlet = outlets.find(o => o.id === outletId);

  // Mock orders data - you can replace this with actual data from your backend
  const recentOrders = [
    { id: 1, outlet: "Food Court", date: "2024-03-20", amount: 450 },
    { id: 2, outlet: "Basil", date: "2024-03-19", amount: 280 },
    { id: 3, outlet: "Uncle's Cafe", date: "2024-03-18", amount: 350 }
  ];

  if (!outlet) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <UtensilsCrossed className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Outlet Not Found</h1>
        <p className="text-gray-600 mb-4">The outlet you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="flex items-center space-x-2 text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const getMenuItemsByCategory = (menu: MenuItem[], outletId: string) => {
    const categorizedItems: { [key: string]: MenuItem[] } = {};
    
    menu.forEach(item => {
      const category = item.category || 'Other';
      if (!categorizedItems[category]) {
        categorizedItems[category] = [];
      }
      categorizedItems[category].push(item);
    });
    
    return categorizedItems;
  };

  const categorizedMenu = getMenuItemsByCategory(outlet.menu, outlet.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-6">
              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
                >
                  <User className="w-6 h-6" />
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                    </div>
                    {recentOrders.map(order => (
                      <Link
                        key={order.id}
                        to={`/orders/${order.id}`}
                        className="block px-4 py-3 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-800">{order.outlet}</p>
                            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <span className="text-green-600 font-medium">₹{order.amount}</span>
                        </div>
                      </Link>
                    ))}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <Link
                        to="/orders"
                        className="block text-center text-green-600 hover:text-green-700 font-medium"
                      >
                        View All Orders
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Cart */}
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <span className="text-lg font-semibold">₹{totalAmount.toFixed(2)}</span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {totalItems} items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outlet Info */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={outlet.image}
          alt={outlet.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="container mx-auto px-4 py-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{outlet.name}</h1>
            <p className="text-lg opacity-90">{outlet.description}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-12">
        {Object.entries(categorizedMenu).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                    <Pizza className="w-24 h-24 text-green-600" strokeWidth={1.5} />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-600 ml-1">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
                      <CartButton
                        itemId={item.name}
                        outletId={outlet.id}
                        name={item.name}
                        price={item.price}
                        image="/icons/food-icon.png"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutletMenu; 