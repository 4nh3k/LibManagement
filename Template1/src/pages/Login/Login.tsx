import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import Input from 'src/components/Input';
import { useAppContext } from 'src/contexts/app.contexts';
import { setAccessTokenToLS, setProfileToLS } from 'src/utils/auth';
import { Schema, schema } from 'src/utils/rules';

const loginSchema = schema.pick(['email', 'password']);
type FormData = Pick<Schema, 'email' | 'password'>;
export default function Login() {
  const { setIsAuthenticated, setProfile } = useAppContext();

  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = handleSubmit(data => {
    loginMutation.mutate(data, {
      onSuccess: data => {
        toast.success('Successfully login!', {
          position: toast.POSITION.TOP_RIGHT
        });
        setAccessTokenToLS(data.data?.token as string);
        setProfileToLS(data.data?.data.user);
        setTimeout(() => {
          setIsAuthenticated(true);
          setProfile(data.data?.data.user);
        }, 1000);
      },
      onError: (error: unknown) => {
        toast.error('Login failed!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className='text-3xl text-center text-gray-800 mb-7 font-bold'>Sign in</h1>
      {/* USERNAME */}
      <>
        <label htmlFor='email' className='block custom-label mb-1'>
          Email
        </label>
        <Input
          className='custom-input'
          id='email'
          type='email'
          placeholder='Email'
          register={register}
          name='email'
          autoComplete='on'
        />
      </>

      {/* PASSWORD */}
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
            register={register}
            name='password'
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

      <Link to='/forgot-password' className='ml-auto'>
        <span className='text-xs text-primaryBorder hover:text-primary'>Forgot password?</span>
      </Link>

      <button
        className='primary-btn mt-6'
        type='submit'
        onClick={() => {
          onSubmit();
        }}
      >
        Sign in
      </button>

      <div className='mt-1 flex'>
        <span className='text-xs text-primaryBorder'>Don&apos;t have an account?</span>
        <Link className='ml-auto text-primary hover:text-primaryBtn' to='/register'>
          <span className='text-xs'>Sign up</span>
        </Link>
      </div>
    </form>
  );
}
