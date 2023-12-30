import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import { useAppContext } from 'src/contexts/app.contexts';
import Popover from '../Popover';

interface ButtonProps {
  label: string;
  icon?: string;
  color: string;
  bg_color: string;
  border_color?: string;
  onclick?: () => void;
}

function Button({ bg_color, label, icon, color, border_color = '', onclick }: ButtonProps) {
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
        <ul className='bg-white p-2 rounded'>
          <button className='font-medium' onClick={() => logoutMutation.mutate()}>
            Log out
          </button>
        </ul>
      }
    >
      <button
        style={{
          backgroundColor: bg_color,
          borderColor: border_color,
          borderWidth: 1,
          color: color
        }}
        className={`inline-flex items-center justify-center w-50 p-2 rounded-full`}
        onClick={onclick}
      >
        <span className={`text-${color} ml-2 mr-2 text-center font-medium`}>{label}</span>
        {icon && <img src={icon} className='w-5 h-5 fill-white stroke-white' alt={label} />}
      </button>
    </Popover>
  );
}

export default Button;
