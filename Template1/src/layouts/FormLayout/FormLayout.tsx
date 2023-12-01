import { Outlet } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}
export default function FormLayout() {
  return (
<<<<<<< HEAD
    <div className='w-screen h-screen flex relative'>
      <div className='w-1/2 h-full items-center justify-center flex'>
=======
    <div className='w-screen h-screen flex flex-col desktop:flex-row'>
      <div className='w-full desktop:w-1/2 h-full items-center justify-center flex'>
>>>>>>> ee85fa45290d0a6e7b5fcf478361d7bc4d14176c
        <img
          className='w-[39.4rem] h-[29.18rem]'
          src='/src/assets/img/illustration.svg'
          alt='reading book'
        />
      </div>
<<<<<<< HEAD

      <div className='w-1/2 h-full items-center justify-center bg-ladingBg bg-no-repeat bg-center flex'>
=======
      <div className='w-full desktop:w-1/2 h-full items-center justify-center bg-ladingBg bg-no-repeat bg-center flex'>
>>>>>>> ee85fa45290d0a6e7b5fcf478361d7bc4d14176c
        <div className='bg-white w-[25rem] py-16 px-[2.63rem] rounded-xl shadow-md flex flex-col justify-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
