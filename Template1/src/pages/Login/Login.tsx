import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Schema, schema } from 'src/utils/rules';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { setAccessTokenToLS } from 'src/utils/auth';
import authApi from 'src/apis/auth.api';
import { type } from './../../helpers/localStorage';
import Input from 'src/components/Input';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  type FormData = Pick<Schema, 'email' | 'password'>;

  const loginSchema = schema.pick(['email', 'password']);

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = handleSubmit(data => {
    loginMutation.mutate(data, {
      onSuccess: data => {
        toast.success('Successfully login!', {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
          setAccessTokenToLS(data.data?.token as string);
        }, 1000);
      },
      onError: error => {
        toast.error('Login failed!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className='text-3xl text-center text-primary2 mb-7 font-bold'>Sign in</h1>
      {/* USERNAME */}
      <>
        <label htmlFor='username' className='block custom-label mb-1'>
          Username
        </label>
        <Input
          className='custom-input'
          id='username'
          type='text'
          placeholder='Username'
          {...register('email')}
        />
      </>

      {/* PASS WORD */}
      <>
        <label htmlFor='password' className='block custom-label mt-7 mb-1'>
          Password
        </label>
        <div className='relative'>
          <Input
            className='custom-input-icon max-h-[2rem]'
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            autoComplete='on'
            {...register('password')}
          />
          <button
            className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            onClick={() => setShowPassword(!showPassword)}
            type='button'
          >
            {!showPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
          </button>
        </div>
      </>

      <a href='forgot-password' className='ml-auto'>
        <span className='text-xs text-primaryBorder hover:text-primary'>Forgot password?</span>
      </a>
      <button className='primary-btn mt-6' type='submit'>
        Sign in
      </button>
      <div className='mt-1 flex'>
        <span className='text-xs text-primaryBorder'>Don&apos;t have an account?</span>
        <a className='ml-auto text-primary hover:text-primaryBtn' href='register'>
          <span className='text-xs'>Sign up</span>
        </a>
      </div>
    </form>
  );
}
