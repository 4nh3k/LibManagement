interface Props {
  children?: React.ReactNode;
}
export default function FormLayout({ children }: Props) {
  return (
    <div className='w-screen h-screen flex'>
      <div className='w-1/2 h-full items-center justify-center flex'>
        <img
          className='w-[39.4rem] h-[29.18rem]'
          src='/src/assets/img/illustration.svg'
          alt='reading book'
        ></img>
      </div>
      <div className='w-1/2 h-full items-center justify-center bg-ladingBg bg-no-repeat bg-center flex'>
        <div className='bg-white w-[25rem] py-16 px-[2.63rem] rounded-xl shadow-md flex flex-col justify-center'>
          {children}
        </div>
      </div>
    </div>
  );
}
