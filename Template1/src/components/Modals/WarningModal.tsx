import React from 'react';
import warning_icon from '../../assets/img/warning-modal.png';

interface Props {
  title: string;
}

const WarningModal: React.FC<Props> = ({ title }) => {
  return (
    <div className='bg-[#ffffff] w-fit rounded p-3 drop-shadow-md'>
      <div id='header' className='flex flex-row items-center align-middle'>
        <img alt='fail-icon' src={warning_icon} className='w-8 h-8 '></img>
        <span className='align-middle items-center ml-5 mr-[300px] text-[20px] font-semibold'>
          {title}
        </span>
      </div>
      <div id='button-container' className='text-right space-x-3'>
        <button className='bg-[#ffd900] px-3 py-2 rounded'>Yes</button>
        <button className='bg-[#fdf8de] px-3 py-2 rounded border-1 border-[#fff1a2]'>No</button>
      </div>
    </div>
  );
};

export default WarningModal;
