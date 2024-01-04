import { Outlet } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar';
import { useAppContext } from 'src/contexts/app.contexts';
export default function MainLayout() {
  const { profile } = useAppContext();
  return (
    <div className='h-screen w-screen overflow-y-hidden'>
      <Sidebar isAdmin={profile?.role === 'admin'} />
      <div className='bg-gray-50 w-[calc(100%-4.2rem)] lg:w-[calc(100%-16rem)] h-screen ml-auto overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
}
