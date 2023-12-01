import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <>
      <h1 className='text-3xl text-center text-primary2 mb-7 font-bold'>Sign up</h1>
      <label htmlFor='email' className='block custom-label'>
        Email
      </label>
      <div>
        <input className='custom-input' id='email' type='email' placeholder='example@email.com' />
      </div>
      <label htmlFor='username' className='block custom-label mt-3'>
        Username
      </label>
      <input className='custom-input' id='username' type='text' placeholder='Username' />
      <label htmlFor='password' className='block custom-label mt-3'>
        Password
      </label>
      <div className='relative'>
        <input
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
      <label htmlFor='repeat-password' className='block custom-label mt-3'>
        Repeat Password
      </label>
      <div className='relative'>
        <input
          className='custom-input-icon'
          id='repeat-password'
          type={showRepeatPassword ? 'text' : 'password'}
          placeholder='Repeat your password'
        />
        <button
          className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
          onClick={() => setShowRepeatPassword(!showRepeatPassword)}
        >
          {!showRepeatPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
        </button>
      </div>
      <button className='primary-btn mt-6'>Sign up</button>
      <div className='mt-1 flex'>
        <span className='text-xs text-primaryBorder'>Already have a account?</span>
        <a className='ml-auto text-primary hover:text-primaryBtn' href='login'>
          <span className='text-xs'>Sign in</span>
        </a>
      </div>
    </>
  );
}
