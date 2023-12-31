import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import { useAppContext } from 'src/contexts/app.contexts';
import Popover from '../Popover';

export default function User() {
  const { setIsAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      toast.success('Log out successfully.');
      setIsAuthenticated(false);
      navigate('/');
    },
    onError: () => {
      toast.error('Somethings went wrong.');
    }
  });
  return (
    <Popover
      placement='bottom'
      hasArrow
      renderPopover={
        <ul className='bg-white border-gray-50 border p-2 rounded shadow'>
          <button className='font-normal' onClick={() => logoutMutation.mutate()}>
            Log out
          </button>
        </ul>
      }
    >
      <button className='flex items-center'>
        {/* <span className='hidden lg:inline-block mr-2 font-semibold'>Admin</span> */}
        <img
          src={'https://ui-avatars.com/api/?background=0D8ABC&color=fff'}
          alt='User'
          className='w-10 h-10 rounded-full border border-purple-100'
        />
      </button>
    </Popover>
  );
}
