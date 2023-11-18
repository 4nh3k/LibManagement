import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';
import useLogin from 'src/hooks/useLogin';
import { useUser } from 'src/hooks/useUser';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('anhung191@gmail.com');
  const [password, setPassword] = useState('anhungdeptrai');
  const login = useLogin();

  const handleLogin = () => {
    login.mutate({ email, password });
  };
  const user = useUser();
  console.log(user);

  return (
    <>
      <h1 className='text-3xl text-center text-primary2 mb-7 font-bold'>Sign in</h1>
      <label htmlFor='username' className='block custom-label'>
        Email
      </label>
      <input
        value={email}
        onChange={event => setEmail(event.target.value)}
        className='custom-input'
        id='username'
        type='text'
        placeholder='abc@xyz.com'
      />
      <label htmlFor='password' className='block custom-label mt-7'>
        Password
      </label>
      <div className='relative'>
        <input
          value={password}
          onChange={event => setPassword(event.target.value)}
          className='custom-input-icon'
          id='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
        />
        <button
          className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
        </button>
      </div>
      <a href='forgotpass' className=' ml-auto'>
        <span className='text-xs text-primaryBorder hover:text-primary'>Forgot password?</span>
      </a>
      <button className='primary-btn mt-6' onClick={handleLogin}>
        Sign in
      </button>
      <div className='mt-1 flex'>
        <span className='text-xs text-primaryBorder'>Don&apos;t have an account?</span>
        <a className='ml-auto text-primary hover:text-primaryBtn' href='register'>
          <span className='text-xs'>Sign up</span>
        </a>
      </div>
    </>
  );
}
