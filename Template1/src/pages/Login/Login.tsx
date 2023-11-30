import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Schema, schema } from 'src/utils/rules';
import { useMutation } from '@tanstack/react-query';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  type FormData = Pick<Schema, 'email' | 'password'>;
  const loginSchema = schema.pick(['email', 'password']);
  const loginMutation = useMutation({
    mutationFn: (data: FormData) => {},
    onSuccess: () => {
      navigate('/');
    }
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
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className='text-3xl text-center text-primary2 mb-7 font-bold'>Sign in</h1>
      <>
        <label htmlFor='username' className='block custom-label mb-1'>
          Username
        </label>
        <div className='min-h-[2rem]'>
          <input
            className='custom-input'
            id='username'
            type='text'
            placeholder='Username'
            {...register('username')}
          />
        </div>
      </>

      <>
        <label htmlFor='password' className='block custom-label mt-7 mb-1'>
          Password
        </label>
        <div className='relative'>
          <div className='min-h-[2rem]'>
            <input
              className='custom-input-icon max-h-[2rem]'
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              {...register('password')}
            />
          </div>
          <button
            className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
          </button>
        </div>
      </>

      <a href='forgotpass' className=' ml-auto'>
        <span className='text-xs text-primaryBorder hover:text-primary'>Forgot password?</span>
      </a>
      <button className='primary-btn mt-6'>Sign in</button>
      <div className='mt-1 flex'>
        <span className='text-xs text-primaryBorder'>Don&apos;t have an account?</span>
        <a className='ml-auto text-primary hover:text-primaryBtn' href='register'>
          <span className='text-xs'>Sign up</span>
        </a>
      </div>
    </form>
  );
}
