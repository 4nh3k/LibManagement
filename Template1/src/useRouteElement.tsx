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
// import { useUser } from './hooks/useUser';
import { path } from './constants/path';
import MainLayout from './layouts/MainLayout/MainLayout';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <FormLayout />,
      children: [
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'reset-pass',
          element: <ResetPass />
        },
        {
          path: 'forgot-pass',
          element: <ForgotPass />
        },
        {
          path: 'login',
          element: <Login />
        }
      ]
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: path.library,
          element: <Library />
        }
      ]
    },
    {
      path: path.transactions,
      element: <Transactions />
    },
    {
      path: 'book',
      element: <BookPage />
    },
    {
      path: 'payment',
      element: <Payment></Payment>
    },
    {
      path: '/configuration',
      element: <Configuration></Configuration>
    },
    {
      path: '/books/:id',
      element: <BookDetails />
    },
    {
      path: '/member',
      element: (
        <NavLayout>
          <Member></Member>
        </NavLayout>
      )
    }
    // Con member & transaction
  ]);
  return routeElement;
}
