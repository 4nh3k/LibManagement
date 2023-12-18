import { Link } from 'react-router-dom';
import Input from 'src/components/Input';

const ForgotPass = () => {
  return (
    <>
      <h1 className='text-3xl text-center text-primary2 mb-7 font-bold'>Forgot Password</h1>
      <p className='text-sm font-semibold text-primaryBorder text-center text'>
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>
      <Input className='custom-input mt-6' id='email' type='text' placeholder='Email' />
      <button className='primary-btn mt-6' type='submit'>
        Sign in
      </button>
      <Link className='mx-auto mt-8 text-primary hover:text-primaryBtn' to='/login'>
        <span className='text-sm'>Back to login</span>
      </Link>
    </>
  );
};

export default ForgotPass;
