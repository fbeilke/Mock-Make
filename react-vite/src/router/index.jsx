import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllProducts from '../components/Products/AllProducts';
import ProductsByCategory from '../components/Products/ProductsByCategory';
import NewProductForm from '../components/Products/NewProductForm';
import ProductDetails from '../components/Products/ProductDetails';
import EditProductForm from '../components/Products/EditProductForm';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/products",
        element: <AllProducts />
      },
      {
        path: "/products/categories/:category", // need to add to front end routes
        element: <ProductsByCategory />
      },
      {
        path: '/products/new',
        element: <NewProductForm />
      },
      {
        path: '/products/:productId',
        element: <ProductDetails />
      },
      {
        path: '/products/:productId/edit',
        element: <EditProductForm />
      }
    ],
  },
]);
