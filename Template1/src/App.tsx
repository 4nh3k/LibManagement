import { ToastContainer } from 'react-toastify';
import useRouteElement from './useRouteElement';

function App() {
  const routeElement = useRouteElement();
  return (
    <div className='overflow-x-hidden overflow-y-hidden'>
      {routeElement}
      <ToastContainer />
    </div>
  );
}

export default App;
