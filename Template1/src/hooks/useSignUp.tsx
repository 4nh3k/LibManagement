import { useMutation } from 'react-query';
import { signup } from 'src/helpers/api';

type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  passwordConfirmation: string;
};

const useSignUp = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpParams) =>
      signup(data.email, data.password, data.firstName, data.lastName, data.passwordConfirmation),
    onSuccess: data => {
      console.log('data', data);
      navigate('/');
    }
  });

  return signUpMutation;
};

export default useSignUp;
