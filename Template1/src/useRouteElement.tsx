import { useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterLayout from './layouts/RegisterLayout';
import FormLayout from './layouts/RegisterLayout';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import ResetPass from './pages/ResetPassword/ResetPass';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <ProductList />
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
    }
  ]);
  return routeElement;
}
