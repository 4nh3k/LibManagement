import { useRoutes } from 'react-router-dom';
import Library from './pages/Library';
import Login from './pages/Login';
import Register from './pages/Register';
import FormLayout from './layouts/FormLayout';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import ResetPass from './pages/ResetPassword/ResetPass';
import Transactions from './pages/Transactions';
import BookDetails from './pages/BookDetails/BookDetails';
import BookPage from './pages/BookPage/BookPage';
import Payment from './pages/Payment';
import Configuration from './pages/Configuration/MainConfig';
import NavLayout from './layouts/NavLayout/NavLayout';
import Member from './pages/Member';
import { useUser } from './hooks/useUser';

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
      path: '/member',
      element: (
        <NavLayout>
          <Member></Member>
        </NavLayout>
      )
    },
    {
      path: '/configuration',
      element: <Configuration></Configuration>
    }
  ]);
  return routeElement;
}
