import React from 'react';
import money_icon from '../../../assets/img/dong.png';
import Button from 'src/components/Button';
const TopUp = () => {
  return (
    <div>
      <div id='current-balance' className='text-center space-y-[24px]'>
        <span className='text-[24px] block'>Current balance</span>
        <span className='text-[40px] block'>69,000đ</span>
      </div>
      <div className=''>
        <div id='top-up-account' className='mb-5'>
          <div id='top-up-account-label' className='text-[24px] font-semibold mb-5'>
            <div
              id='top-up-label-header'
              className='inline w-[4px] h-[41px] bg-[#8352fd] rounded mr-3'
            >
              &nbsp;
            </div>
            Top up account
          </div>
          <div className='flex flex-col gap-10'>
            <div
              id='member-name-input'
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='member_name'
                id='member-label'
                className='text-[22px] font-semibold w-[400px]'
              >
                Member name
              </label>
              <input
                type='text'
                className='custom-input mt-1'
                id='member_name'
                placeholder='Enter member name'
              />
            </div>
            <div
              id='member-id-input'
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='member-id'
                id='member-label'
                className='text-[22px] font-semibold w-[400px]'
              >
                Member ID
              </label>
              <input
                type='text'
                className='custom-input mt-1'
                id='member_name'
                placeholder='Enter member ID'
              />
            </div>
          </div>
        </div>
      </div>
      <div id='top-up-account' className='mb-5'>
        <div id='top-up-account-label' className='text-[24px] font-semibold mb-5'>
          <div
            id='top-up-label-header'
            className='inline w-[4px] h-[41px] bg-[#8352fd] rounded mr-3'
          >
            &nbsp;
          </div>
          Top up
        </div>
      </div>
      <div className='flex flex-col'>
        <div id='top-up-container' className='ml-auto mr-auto space-x-10 mb-3'>
          <div
            id='price'
            className='inline-flex h-[35px] items-center align-middle space-x-[50px] bg-white px-5 py-6 rounded-lg border-1 border-[#1F78E8] '
          >
            <input
              className='text-[20px] border-none outline-0'
              type='number'
              min={0}
              id='top-up-amount'
              placeholder='1,000đ'
            ></input>
            <img
              src={money_icon}
              className='inline text-right'
              width={16}
              height={16}
              alt='vietnamese currency icon'
            ></img>
          </div>
          <Button label='Top up' bg_color='#C0BBF4' color='#5632A1'></Button>
        </div>
        <span className='ml-auto mr-auto'>Your balance will be 120,000đ</span>
      </div>
    </div>
  );
};

export default TopUp;
