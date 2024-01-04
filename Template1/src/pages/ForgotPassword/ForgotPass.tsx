import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import Input from 'src/components/Input';

const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ email: string }>();

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: { email: string }) => authApi.forgotPassword(body),
    onSuccess: () => {
      toast.success('Reset password link sent to your email', {
        position: 'top-right'
      });
      reset();
    },
    onError: () => {
      toast.error('Something went wrong', {
        position: 'top-right'
      });
    }
  });

  const onSubmit = handleSubmit(data => {
    forgotPasswordMutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className='text-3xl text-center text-gray-800 mb-7 font-bold'>Forgot Password</h1>
      <p className='text-sm font-semibold text-center text'>
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>
      <div className='min-h-[3.5rem]'>
        <Input
          className='custom-input mt-6'
          id='email'
          type='text'
          placeholder='Email'
          register={register}
          name='email'
        />
      </div>
      <button className='primary-btn mt-6' type='submit'>
        Submit
      </button>
      <Link className='block mx-auto mt-4 hover:text-primaryBtn text-primary' to='/login'>
        <span className='text-sm font-medium hover:underline'>Back to login</span>
      </Link>
    </form>
  );
};

export default ForgotPass;
