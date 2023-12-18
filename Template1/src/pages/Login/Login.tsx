import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Schema, schema } from 'src/utils/rules';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { setAccessTokenToLS } from 'src/utils/auth';
import authApi from 'src/apis/auth.api';
import Input from 'src/components/Input';

const loginSchema = schema.pick(['email', 'password']);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  type FormData = Pick<Schema, 'email' | 'password'>;

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
    loginMutation.mutate(data, {
      onSuccess: data => {
        toast.success('Successfully login!', {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => {
          setAccessTokenToLS(data.data?.token as string);
        }, 1000);
        navigate('/');
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
      <h1 className='text-3xl text-center text-primary2 mb-7 font-bold'>Sign in</h1>
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
        <a className='ml-auto text-primary hover:text-primaryBtn' href='register'>
          <span className='text-xs'>Sign up</span>
        </a>
      </div>
    </form>
  );
}
