import { Outlet } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar';
export default function MainLayout() {
  return (
    <div className='min-h-screen w-screen'>
      <Sidebar />
      <div className='bg-background w-[calc(100%-4rem)] lg:w-[calc(100%-9rem)] min-h-screen ml-auto'>
        <Outlet />
      </div>
    </div>
  );
}
