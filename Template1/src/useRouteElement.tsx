import { useRoutes } from 'react-router-dom';
import Library from './pages/Library';
import Login from './pages/Login';
import Register from './pages/Register';
import FormLayout from './layouts/FormLayout';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import ResetPass from './pages/ResetPassword/ResetPass';
import Transactions from './pages/Transactions';
import BookPage from './pages/BookPage/BookPage';
import Payment from './pages/Payment';
import Configuration from './pages/Configuration/MainConfig';
import { path } from './constants/path';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: path.library,
      element: <Library />
    },
    {
      path: path.transactions,
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
        <FormLayout>
          <Register />
        </FormLayout>
      )
    },
    {
      path: '/resetpass',
      element: (
        <FormLayout>
          <ResetPass />
        </FormLayout>
      )
    },
    {
      path: '/forgotpass',
      element: (
        <FormLayout>
          <ForgotPass />
        </FormLayout>
      )
    },
    {
      path: '/book',
      element: <BookPage></BookPage>
    },
    {
      path: '/payment',
      element: <Payment></Payment>
    },
    {
      path: '/configuration',
      element: <Configuration></Configuration>
    }
  ]);
  return routeElement;
}
