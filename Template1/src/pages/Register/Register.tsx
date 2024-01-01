import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import Input from 'src/components/Input';
import { Schema, schema } from 'src/utils/rules';

type FormData = Pick<Schema, 'email' | 'username' | 'password' | 'confirmPassword'>;
const registerSchema = schema.pick(['email', 'username', 'password', 'confirmPassword']);

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const signUpMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirmPassword'>) =>
      authApi.register({
        ...body,
        confirmPassword: body.password
      }),
    onSuccess: () => {
      toast.success('Sign up successfully!', {
        position: 'top-right'
      });
      navigate('/login');
    },
    onError: () => {
      toast.error('Sign up failed!', {
        position: 'top-right'
      });
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = handleSubmit(data => {
    signUpMutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className='text-3xl text-center text-primary2 mb-7 font-bold'>Sign up</h1>
      <label htmlFor='email' className='block custom-label'>
        Email
      </label>
      <div>
        <Input
          className='custom-input'
          id='email'
          type='email'
          placeholder='example@email.com'
          register={register}
          name='email'
          errorMessage={errors.email?.message}
        />
      </div>

      <label htmlFor='username' className='block custom-label mt-3'>
        Username
      </label>
      <Input
        className='custom-input'
        id='username'
        type='text'
        placeholder='Username'
        register={register}
        name='username'
        errorMessage={errors.username?.message}
      />
      <label htmlFor='password' className='block custom-label mt-3'>
        Password
      </label>
      <div className='relative'>
        <Input
          className='custom-input-icon'
          id='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          name='password'
          register={register}
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
        Repeat Password
      </label>

      <div className='relative'>
        <Input
          className='custom-input-icon'
          id='repeat-password'
          type={showRepeatPassword ? 'text' : 'password'}
          name='confirmPassword'
          register={register}
          placeholder='Repeat your password'
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
        Sign up
      </button>

      <div className='mt-1 flex'>
        <span className='text-xs text-primaryBorder'>Already have a account?</span>
        <Link className='ml-auto text-primary hover:text-primaryBtn' to='login'>
          <span className='text-xs'>Sign in</span>
        </Link>
      </div>
    </form>
  );
}
