import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from "./pages/home"
import { NavBar } from "./pages/nav-bar";
import { ProductPage } from "./pages/product-page";

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
        element: <div>Login</div>,
      },
      {
        path: '/profile',
        element: <div>Your Profile</div>,
      },
      {
        path: '/dashboard',
        element: <div>Dashboard</div>,
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
    <RouterProvider router={router} />
  )
}

export default App
