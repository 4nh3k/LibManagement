import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login } from 'src/helpers/api';

type SignInParams = {
  email: string;
  password: string;
};

const useSignUp = () => {
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: (data: SignInParams) => login(data.email, data.password),
    onSuccess: data => {
      console.log('data', data);
      navigate('/');
    }
  });

  return signUpMutation;
};

export default useSignUp;
