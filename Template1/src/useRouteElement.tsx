import { useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterLayout from './layouts/RegisterLayout';
import FormLayout from './layouts/RegisterLayout';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import ResetPass from './pages/ResetPassword/ResetPass';
import BorrowCard from './pages/BorrowCard/BorrowCard';
import Transactions from './pages/Transactions';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/books',
      element: <ProductList />
    },
    {
      path: '/transactions',
      element: <Transactions />
    },
    {
      path: '/login',
      element: (
        <FormLayout>
          <Login />
        </FormLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/resetpass',
      element: (
        <RegisterLayout>
          <ResetPass />
        </RegisterLayout>
      )
    },
    {
      path: '/forgotpass',
      element: (
        <RegisterLayout>
          <ForgotPass />
        </RegisterLayout>
      )
    },
    {
      path: '/borrow_card',
      element: (
        <BorrowCard></BorrowCard>
      )
    }
  ]);
  return routeElement;
}
