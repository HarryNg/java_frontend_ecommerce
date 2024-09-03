import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from "./pages/home"
import { NavBar } from "./pages/nav-bar";
import { ProductPage } from "./pages/product-page";
import { Login } from './pages/login';
import { UserProvider } from './provider/user-provider';
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/profile';

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
        element: <div>Cart is under development</div>,
      },
      {
        path: '/orders',
        element: <div>Your order's details</div>,
      }
    ]
  }
])
function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
