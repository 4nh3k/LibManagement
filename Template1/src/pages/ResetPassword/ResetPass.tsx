import { Eye, EyeSlash } from '@phosphor-icons/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from 'src/components/Input';
import { useQueryString } from 'src/hooks/useQueryString';
import { schema } from 'src/utils/rules';
import authApi from 'src/apis/auth.api';
import { useMutation } from '@tanstack/react-query';

const resetSchema = schema.pick(['password', 'confirmPassword']);
const ResetPass = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { token } = useQueryString();
  if (!token) {
    toast.error('TOKEN IS WRONG. PLEASE TRY AGAIN', {
      position: 'top-right'
    });
    navigate('/forgot-password');
  }

  const resetMutation = useMutation({
    mutationFn: (body: { password: string; confirmPassword: string }) =>
      authApi.resetPassword({ ...body, token }),
    onSuccess: () => {
      toast.success('Reset password successfully!', {
        position: 'top-right'
      });
      navigate('/login');
    },
    onError: () => {
      toast.error('Reset password failed!', {
        position: 'top-right'
      });
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    password: string;
    confirmPassword: string;
  }>({ resolver: yupResolver(resetSchema) });

  const onSubmit = handleSubmit(data => {
    resetMutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className='text-3xl text-center text-gray-800 font-bold'>Reset Password</h1>
      <p className='text-xs font-semibold text-black/40 text-center text'>
        Enter your new password below.
      </p>
      <label htmlFor='password' className='block custom-label mt-6'>
        New Password
      </label>
      <div className='relative'>
        <Input
          className='custom-input-icon'
          id='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Your new password'
          register={register}
          name='password'
          errorMessage={errors.password?.message}
        />
        <button
          className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
          onClick={() => setShowPassword(!showPassword)}
          type='button'
        >
          {!showPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
        </button>
      </div>
      <label htmlFor='repeat-password' className='block custom-label mt-3'>
        Confirm Password
      </label>
      <div className='relative'>
        <Input
          className='custom-input-icon'
          id='repeat-password'
          type={showRepeatPassword ? 'text' : 'password'}
          placeholder='Repeat your password'
          register={register}
          name='confirmPassword'
          errorMessage={errors.confirmPassword?.message}
        />

        <button
          className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
          onClick={() => setShowRepeatPassword(!showRepeatPassword)}
          type='button'
        >
          {!showRepeatPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
        </button>
      </div>

      <button className='primary-btn mt-6' type='submit'>
        Reset Password
      </button>
    </form>
  );
};

export default ResetPass;
