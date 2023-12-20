import { Navigate, Outlet, type RouteObject, useRoutes } from 'react-router-dom';
import Library from './pages/Library';
import Login from './pages/Login';
import Register from './pages/Register';
import FormLayout from './layouts/FormLayout';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import ResetPass from './pages/ResetPassword/ResetPass';
import Transactions from './pages/Transactions';
import BookDetails from './pages/BookDetails/BookDetails';
import UserAccount from './pages/UserAccount/UserAccount';
import BookPage from './pages/BookPage/BookPage';
import Payment from './pages/Payment';
import Configuration from './pages/Configuration/MainConfig';
import Member from './pages/Member';
import { path } from './constants/path';
import MainLayout from './layouts/MainLayout/MainLayout';
import { useAppContext } from './contexts/app.contexts';

function AdminRoute() {
  const { isAuthenticated, profile } = useAppContext();
  const isAdmin = isAuthenticated && profile?.role === 'admin';

  return isAdmin ? <Outlet /> : <Navigate to='/login' />;
}

function UserRoute() {
  const { isAuthenticated, profile } = useAppContext();
  const isUser = isAuthenticated && profile?.role === 'user';

  return isUser ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useAppContext();
  return !isAuthenticated ? <Outlet /> : <Navigate to={`/`} />;
}

const AuthRouteChildren: RouteObject[] = [
  {
    path: path.login,
    element: <Login />
  },
  {
    path: path.register,
    element: <Register />
  },
  {
    path: path.forgot_password,
    element: <ForgotPass />
  },
  {
    path: path.reset_password,
    element: <ResetPass />
  }
];

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <RejectedRoute />,
      children: [
        {
          element: <FormLayout />,
          children: AuthRouteChildren
        }
      ]
    },
    {
      element: <AdminRoute />,
      path: path.admin,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: path.library,
              element: <Library />
            },
            {
              path: path.book,
              element: <BookPage />
            },
            {
              path: 'books/:id',
              element: <BookDetails />
            },
            {
              path: path.member,
              element: <Member />
            },
            {
              path: path.transactions,
              element: <Transactions />
            },
            {
              path: 'configuration',
              element: <Configuration />
            }
          ]
        },
        {
          path: path.payment,
          element: <Payment />
        }
      ]
    },
    {
      element: <UserRoute />,
      children: [
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
              path: path.userAccount,
              element: <UserAccount />
            }
          ]
        },
        {
          path: path.payment,
          element: <Payment />
        }
      ]
    }

    // Con member & transaction
  ]);
  return routeElement;
}
