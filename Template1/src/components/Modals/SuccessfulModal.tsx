import React from 'react';
import success_icon from '../../assets/img/successful-modal.png';
import close_icon from '../../assets/img/close-icon.png';

interface Props {
  title: string;
  description: string;
}

const SuccessfulModal: React.FC<Props> = ({ title, description }) => {
  return (
    <div className='bg-[#f1faf0] w-fit border-[#7cb97c] border-2 rounded p-3 '>
      <div id='header' className='flex flex-row items-center align-middle'>
        <img alt='fail-icon' src={success_icon} className='w-8 h-8 '></img>
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

export default SuccessfulModal;
