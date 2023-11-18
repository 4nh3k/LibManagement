import { useMutation } from 'react-query';
import axios from 'axios';
import { signup } from 'src/helpers/api';

type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  passwordConfirmation: string;
};

const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpParams) =>
      signup(data.email, data.password, data.firstName, data.lastName, data.passwordConfirmation),
    onSuccess: data => {
      console.log('data', data);
      queryClient.setQueryData(['user'], data);
      navigate('/');
    }
  });

  return signUpMutation;
};

export default useSignUp;
