import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from "./pages/home"
import { NavBar } from "./pages/nav-bar";
import { ProductPage } from "./pages/product-page";

const router = createBrowserRouter([
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
        path: '/dashboard',
        element: <div>Dashboard</div>,
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
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
