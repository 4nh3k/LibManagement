import { Outlet } from 'react-router-dom';

export default function FormLayout() {
  return (
    <div className='w-screen h-screen flex relative'>
      <div className='hidden sm:flex h-full items-center justify-center '>
        <img
          className='w-[39.4rem] h-[29.18rem]'
          src='/src/assets/img/illustration.svg'
          alt='reading book'
        />
      </div>

      <div className='basis-1/2 h-full grow md:grow-0 items-center justify-center bg-ladingBg bg-no-repeat bg-center flex'>
        <div className='bg-white w-[25rem] py-16 px-[2.63rem] rounded-xl shadow-md flex flex-col justify-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
