export interface Pairing {
  name: string;
  price: number;
  image: string;
  description: string;
}

export const recommendationMapping: Record<string, Pairing[]> = {
  "Veg Spring Roll": [
    {
      name: "Classic Coke",
      price: 45,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200",
      description: "Chilled 300ml bottle"
    },
    {
      name: "Mango Shake",
      price: 85,
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=200",
      description: "Thick & creamy mango goodness"
    }
  ],
  "Masala Dosa": [
    {
      name: "Fresh Lime Soda",
      price: 60,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=200",
      description: "Sweet & salty refreshment"
    },
    {
      name: "Filter Coffee",
      price: 35,
      image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=200",
      description: "Traditional south indian style"
    }
  ],
  "Cheese Maggi": [
    {
      name: "Iced Tea",
      price: 70,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200",
      description: "Lemon & mint flavored"
    }
  ],
  "Aloo Parantha with Curd/Butter/Sabzi": [
    {
      name: "Sweet Lassi",
      price: 55,
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=200",
      description: "Cool & refreshing yogurt drink"
    }
  ],
  "Vadapav": [
    {
      name: "Cutting Chai",
      price: 20,
      image: "https://images.unsplash.com/photo-1594631252845-29fc458695d1?auto=format&fit=crop&q=80&w=200",
      description: "Perfect tea companion"
    }
  ],
  "Aloo Tikki Chat": [
    {
      name: "Classic Coke",
      price: 45,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200",
      description: "Chilled 300ml bottle"
    },
    {
      name: "Sweet Lassi",
      price: 55,
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=200",
      description: "Cool & refreshing yogurt drink"
    }
  ],
  "Kadhaai Paneer": [
    {
      name: "Butter Naan",
      price: 40,
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=200",
      description: "Soft & buttery"
    },
    {
      name: "Cold Coffee",
      price: 70,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=200",
      description: "Refreshing cold coffee"
    }
  ]
};

export const popularBeverages: Pairing[] = [
  {
    name: "Classic Coke",
    price: 45,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200",
    description: "Chilled 300ml bottle"
  },
  {
    name: "Mango Shake",
    price: 85,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=200",
    description: "Thick & creamy mango goodness"
  },
  {
    name: "Cold Coffee",
    price: 70,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=200",
    description: "Refreshing cold coffee"
  },
  {
    name: "Chocolate Shake",
    price: 90,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=200",
    description: "Rich chocolatey delight"
  },
  {
    name: "Fresh Lime Soda",
    price: 60,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=200",
    description: "Sweet & salty refreshment"
  }
];
