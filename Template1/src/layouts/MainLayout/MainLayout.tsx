import { Outlet } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar';
export default function MainLayout() {
  return (
    <div className='h-screen w-screen overflow-y-hidden'>
      <Sidebar />
      <div className='bg-gray-100 w-[calc(100%-4.2rem)] lg:w-[calc(100%-9rem)] h-screen ml-auto overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
}
