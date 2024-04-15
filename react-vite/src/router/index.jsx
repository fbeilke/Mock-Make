import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllProducts from '../components/Products/AllProducts';
import ProductsByCategory from '../components/Products/ProductsByCategory';
import NewProductForm from '../components/Products/NewProductForm';
import ProductDetails from '../components/Products/ProductDetails';
import EditProductForm from '../components/Products/EditProductForm';
import OrderList from '../components/OrderList';
import Checkout from '../components/Checkout';
import LandingPage from '../components/LandingPage/LandingPage';
// import ReviewForm from '../components/ReviewForm/ReviewForm';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
<<<<<<< HEAD
        element: <h1>Welcome!<img src="https://mock-make-image-bucket.s3.us-east-2.amazonaws.com/bucket.png"/></h1>,
=======
        element: <LandingPage />,
>>>>>>> dev
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
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/orders',
        element: <OrderList />
      }
    ],
  },
]);
