import { Navigate, Outlet, useRoutes, type RouteObject } from 'react-router-dom';
import { path } from './constants/path';
import { useAppContext } from './contexts/app.contexts';
import FormLayout from './layouts/FormLayout';
import MainLayout from './layouts/MainLayout/MainLayout';
import BookDetails from './pages/BookDetails/BookDetails';
import BookList from './pages/BookList/BookList';
import BookPage from './pages/BookPage/BookPage';
import Configuration from './pages/Configuration/MainConfig';
import ForgotPass from './pages/ForgotPassword/ForgotPass';
import Library from './pages/Library';
import Login from './pages/Login';
import Member from './pages/Member';
import Payment from './pages/Payment';
import Register from './pages/Register';
import ResetPass from './pages/ResetPassword/ResetPass';
import Transactions from './pages/Transactions';
import TransactionSuccess from './pages/Transactions/TransactionResult/TransactionSuccess';
import UserAccount from './pages/UserAccount/UserAccount';

function AdminRoute() {
  const { isAuthenticated, profile } = useAppContext();
  const isAdmin = profile?.role === 'admin';

  return isAdmin ? <Outlet /> : <Navigate to='/' />;
}

function AuthRoute() {
  const { isAuthenticated } = useAppContext();
  const isUser = isAuthenticated;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
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
      element: <AuthRoute />,
      children: [
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
                  element: <BookList />
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
                },
                {
                  path: 'book',
                  element: <BookPage />
                },
                {
                  path: 'book/:id',
                  element: <BookPage />
                },
                {
                  path: 'books/:id',
                  element: <BookDetails />
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
              path: path.transactions,
              element: <Transactions />
            },
            {
              path: path.payment,
              element: <Payment />
            },
            {
              path: path.userAccount,
              element: <UserAccount />
            },
            {
              path: 'transaction_success/:id?',
              element: <TransactionSuccess />
            }
          ]
        }
      ]
    }

    // Con member & transaction
  ]);
  return routeElement;
}
