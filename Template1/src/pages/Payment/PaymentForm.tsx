import money_icon from '../../assets/img/dong.png';
import Button from 'src/components/Button';
const PaymentForm = () => {
  return (
    <div>
      <div id='current-balance' className='text-center space-y-[1.5rem] mt-5 mb-5'>
        <span className='text-[1.5rem] block'>Current balance</span>
        <span className='text-[2.5rem] block'>69,000đ</span>
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
            Money receipt
          </div>
          <div className='flex flex-col gap-10'>
            <span className='ml-auto mr-auto text-[1.5rem] font-bold'>Payment Detail</span>
            <div
              id='member-name-input'
              className='w-18 lg:w-72 ml-flex flex-col lg:flex-row lg:mr-auto ml-[1rem] lg:ml-auto items-center align-middle'
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
              className='w-18 lg:w-72 ml-flex flex-col lg:flex-row lg:mr-auto ml-[1rem] lg:ml-auto items-center align-middle'
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
            <div
              id='top-up-container'
              className='flex flex-col mr-auto ml-auto lg:ml-auto mb-3'
            >
              <label
                htmlFor='member-price'
                id='member-price'
                className='text-[1.375rem] block font-semibold'
              >
                Money paid
              </label>
              <div
                id='price'
                className='w-64 flex h-[2.1875rem] items-center align-middle space-x-[3.125rem] bg-white px-5 py-6 rounded-lg border-1 border-[#1F78E8]'
              >
                <input
                  className='w-48 text-[1.25rem] border-none outline-0'
                  type='number'
                  min={0}
                  id='top-up-amount'
                  placeholder='69,000đ'
                ></input>
                <img
                  src={money_icon}
                  className='inline text-right'
                  width={16}
                  height={16}
                  alt='vietnamese currency icon'
                ></img>
              </div>
            </div>
            <div
              id='total-fee-container'
              className='w-18 lg:w-72 flex lg:mr-auto ml-[1rem] lg:ml-auto items-center justify-between'
            >
              <label
                htmlFor='total-fee'
                id='member-label'
                className='inline text-[1.375rem] font-semibold w-[10rem]'
              >
                Total Fee
              </label>
              <span className='text-[1.5rem]'>40,000đ</span>
            </div>

            <div
              id='wallet-container'
              className='w-18 lg:w-72 flex lg:mr-auto ml-[1rem] lg:ml-auto items-center justify-between'
            >
              <label
                htmlFor='wallet'
                id='wallet-label'
                className='inline text-[1.375rem] font-semibold w-[10rem]'
              >
                Your Wallet
              </label>
              <span className='inline text-[1.5rem]'>29,000đ</span>
            </div>
            <div id='pay-button-container' className='flex ml-auto mr-auto'>
              <Button label='Pay' bg_color='#5632A1' color='white'></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
