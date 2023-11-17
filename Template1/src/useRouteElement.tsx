import { useRoutes } from 'react-router-dom';
import Library from './pages/Library';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterLayout from './layouts/RegisterLayout';
import FormLayout from './layouts/RegisterLayout';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import ResetPass from './pages/ResetPassword/ResetPass';
import Transactions from './pages/Transactions';
import BookPage from './pages/BookPage/BookPage';
import FailModal from './components/Modals/FailModal';
import SuccessfulModal from './components/Modals/SuccessfulModal';
import WarningModal from './components/Modals/WarningModal';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/library',
      element: <Library />
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
      path: '/fail_modal',
      element: <WarningModal title='Successfully' description='Test modal'></WarningModal>
    }
  ]);
  return routeElement;
}
