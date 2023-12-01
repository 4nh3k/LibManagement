import { Outlet } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar';
export default function MainLayout() {
  return (
    <div className='h-screen w-screen'>
      <Sidebar />
      <Outlet />
    </div>
  );
}
