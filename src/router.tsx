import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import WhyChooseUs from './pages/WhyChooseUs';
import AboutUs from './pages/AboutUs';
import MyOrders from './pages/MyOrders';
import Cart from './pages/Cart';
import OutletMenu from './pages/OutletMenu';
import { CartProvider } from './context/CartContext';
import { ReactNode } from 'react';

interface WithCartProviderProps {
  children: ReactNode;
}

const WithCartProvider = ({ children }: WithCartProviderProps) => (
  <CartProvider>{children}</CartProvider>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WithCartProvider><App /></WithCartProvider>,
  },
  {
    path: '/why-choose-us',
    element: <WithCartProvider><WhyChooseUs /></WithCartProvider>,
  },
  {
    path: '/about-us',
    element: <WithCartProvider><AboutUs /></WithCartProvider>,
  },
  {
    path: '/my-orders',
    element: <WithCartProvider><MyOrders /></WithCartProvider>,
  },
  {
    path: '/cart',
    element: <WithCartProvider><Cart /></WithCartProvider>,
  },
  {
    path: '/outlet/:outletId',
    element: <WithCartProvider><OutletMenu /></WithCartProvider>,
  },
]); 