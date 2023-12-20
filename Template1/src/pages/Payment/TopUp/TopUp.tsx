import money_icon from '../../../assets/icons/dollar.svg';
import Button from 'src/components/Button';
const TopUp = () => {
  return (
    <div>
      <div id='current-balance' className='text-center space-y-[1.5rem] mt-5 mb-5'>
        <span className='text-[1.5rem] block'>Current balance</span>
        <span className='text-[2.5rem] block'>20$</span>
      </div>
      <div className=''>
        <div id='top-up-account' className='mb-5 w-full pr-10'>
          <div
            id='top-up-account-label'
            className='inline-flex flex-row items-center align-middle mb-10 text-2xl'
          >
            <div
              id='top-up-label-header'
              className='inline w-[0.25rem] h-[2.5625rem] bg-[#8352fd] rounded mr-3 items-center align-middle'
            >
              &nbsp;
            </div>
            Top up account
          </div>
          <div className='ml-auto mr-auto w-18 lg:w-72 flex flex-col gap-10'>
            <div
              id='member-name-input'
              className='w-18 desktop:w-72 ml-flex flex-col desktop:flex-row desktop:mr-auto ml-[1rem] desktop:ml-auto items-center align-middle'
            >
              <label
                htmlFor='member_name'
                id='member-label'
                className='text-[1.375rem] font-semibold w-[25rem]'
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
              className='w-18 desktop:w-72 ml-flex flex-col desktop:flex-row desktop:mr-auto ml-[1rem] desktop:ml-auto items-center align-middle'
            >
              <label
                htmlFor='member-id'
                id='member-label'
                className='text-[1.375rem] font-semibold w-[25rem]'
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
        <div
          id='top-up-account-label'
          className='inline-flex flex-row items-center align-middle text-2xl'
        >
          <div
            id='top-up-label-header'
            className='inline w-[0.25rem] h-[2.5625rem] bg-[#8352fd] rounded mr-3 items-center align-middle'
          >
            &nbsp;
          </div>
          Top up
        </div>
      </div>
      <div className='flex flex-col text-center'>
        <div id='top-up-container' className='ml-auto desktop:ml-auto mr-auto mb-3'>
          <div
            id='price'
            className='w-64 flex h-[2.1875rem] items-center align-middle space-x-[3.125rem] bg-white px-5 py-6 rounded-lg border-1 border-[#1F78E8] mb-5'
          >
            <input
              className='w-48 text-[1.25rem] border-none outline-0'
              type='number'
              min={0}
              id='top-up-amount'
              placeholder='5'
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
        <span className='ml-auto mr-auto'>Your balance will be 25$</span>
      </div>
    </div>
  );
};

export default TopUp;
