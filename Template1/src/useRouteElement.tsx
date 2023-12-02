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
import Member from './pages/Member';
import { path } from './constants/path';
import MainLayout from './layouts/MainLayout/MainLayout';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <FormLayout />,
      children: [
        {
          path: path.register,
          element: <Register />
        },
        {
          path: path.reset_password,
          element: <ResetPass />
        },
        {
          path: path.forgot_password,
          element: <ForgotPass />
        },
        {
          path: path.login,
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
        },
        {
          path: 'books/:id',
          element: <BookDetails />
        },
        {
          path: path.member,
          element: <Member />
        }
      ]
    },
    {
      path: path.transactions,
      element: <Transactions />
    },
    {
      path: path.book,
      element: <BookPage />
    },
    {
      path: path.payment,
      element: <Payment />
    },
    {
      path: '/configuration',
      element: <Configuration />
    }
    // Con member & transaction
  ]);
  return routeElement;
}
