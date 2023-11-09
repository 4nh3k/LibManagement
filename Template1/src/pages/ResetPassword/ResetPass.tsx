import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';

const ResetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  return (
    <>
      <h1 className='text-3xl text-center text-primary2 font-bold'>Reset Password</h1>
      <p className='text-xs font-semibold text-primaryBorder text-center text'>
        Enter your new password below.
      </p>
      <label htmlFor='password' className='block custom-label mt-6'>
        New Password
      </label>
      <div className='relative'>
        <input
          className='custom-input-icon'
          id='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Your new password'
        />
        <button
          className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
        </button>
      </div>
      <label htmlFor='repeat-password' className='block custom-label mt-3'>
        Confirm Password
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
      <button className='primary-btn mt-6'>Reset Password</button>
    </>
  );
};

export default ResetPass;
