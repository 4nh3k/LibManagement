import React from 'react';
import PropTypes from 'prop-types';
import fail_icon from '../../assets/img/fail-modal.png';
import close_icon from '../../assets/img/close-icon.png';
function FailModal(props) {
  return (
    <div className='bg-[#f0faf0] w-fit border-[#7CB97A] border-2 rounded-sm p-3 '>
      <div id='header' className='flex flex-row items-center align-middle'>
        <img alt='fail-icon' src={fail_icon} className='w-8 h-8 '></img>
        <span className='ml-5 mr-[250px] text-[20px] font-semibold'>Transaction successfully</span>
        <img alt='fail-icon' src={close_icon} className='w-4 h-4'></img>
      </div>
      <div id='description' className='ml-[50px] w-[475px]'>
        Your transaction has been completed successfully. Please check your wallet again
      </div>
    </div>
  );
}

FailModal.propTypes = {};

export default FailModal;
