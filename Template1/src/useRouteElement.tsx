import { useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterLayout from './layouts/RegisterLayout';

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ]);
  return routeElement;
}
