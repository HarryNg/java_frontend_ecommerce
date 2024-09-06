import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from "./pages/home"
import { NavBar } from "./pages/nav-bar";
import { ProductPage } from "./pages/product-page";
import { Login } from './pages/login';
import { UserProvider } from './provider/user-provider';
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/profile';
import { ProductProvider } from './provider/product-provider';
import {Cart} from './pages/cart';
import {PlaceOrder} from './pages/place-order';
import {Order} from './pages/order';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/place-order',
        element: <PlaceOrder />,
      },
      {
        path: '/order',
        element: <Order />,
      }
    ]
  }
])
function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </UserProvider>
  )
}

export default App
