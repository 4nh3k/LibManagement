import { useRoutes } from 'react-router-dom';
import Library from './pages/Library';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterLayout from './layouts/RegisterLayout';
import FormLayout from './layouts/RegisterLayout';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import ResetPass from './pages/ResetPassword/ResetPass';
import Transactions from './pages/Transactions';
import BookDetails from './pages/BookDetails/BookDetails';
import BookPage from './pages/BookPage/BookPage';
import Payment from './pages/Payment';
import Configuration from './pages/Configuration/MainConfig';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/library',
      element: <Library />
    },
    {
      path: '/books/:id',
      element: <BookDetails />
    },
    {
      path: '/books/:id',
      element: <BookDetails />
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
