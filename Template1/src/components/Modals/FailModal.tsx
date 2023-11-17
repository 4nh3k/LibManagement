import React from 'react';
import fail_icon from '../../assets/img/fail-modal.png';
import close_icon from '../../assets/img/close-icon.png';

interface Props {
  title: string;
  description: string;
}

const FailModal: React.FC<Props> = ({ title, description }) => {
  return (
    <div className='bg-[#feedee] w-fit border-[#ec9498] border-2 rounded p-3 '>
      <div id='header' className='flex flex-row items-center align-middle'>
        <img alt='fail-icon' src={fail_icon} className='w-8 h-8 '></img>
        <span className='align-middle items-center ml-5 mr-[300px] text-[20px] font-semibold'>
          {title}
        </span>
        <img alt='fail-icon' src={close_icon} className='w-6 h-6'></img>
      </div>
      <div id='description' className='ml-[50px] w-[475px]'>
        {description}
      </div>
    </div>
  );
};

export default FailModal;
