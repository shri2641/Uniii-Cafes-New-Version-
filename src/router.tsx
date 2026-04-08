import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import WhyChooseUs from './pages/WhyChooseUs';
import AboutUs from './pages/AboutUs';
import MyOrders from './pages/MyOrders';
import Cart from './pages/Cart';
import OutletMenu from './pages/OutletMenu';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

const Layout = () => (
  <ThemeProvider>
    <CartProvider>
      <Outlet />
    </CartProvider>
  </ThemeProvider>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/why-choose-us',
        element: <WhyChooseUs />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/my-orders',
        element: <MyOrders />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/outlet/:outletId',
        element: <OutletMenu />,
      },
    ],
  },
]);
