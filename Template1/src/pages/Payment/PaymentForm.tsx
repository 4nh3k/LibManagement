import money_icon from '../../assets/img/dong.png';
import Button from 'src/components/Button';
const PaymentForm = () => {
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
            Money receipt
          </div>
          <div className='flex flex-col gap-10'>
            <span className='ml-auto mr-auto text-[24px] font-bold'>Payment Detail</span>
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
            <div id='top-up-container' className='ml-auto mr-auto space-x-10 mb-3'>
              <label htmlFor='member-price' id='member-price' className='text-[22px] font-semibold'>
                Money paid
              </label>
              <div
                id='price'
                className='inline-flex h-[35px] items-center align-middle space-x-[50px] bg-white px-5 py-6 rounded-lg border-1 border-[#1F78E8] '
              >
                <input
                  className='text-[20px] border-none outline-0'
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
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='total-fee'
                id='member-label'
                className='text-[22px] font-semibold w-[400px]'
              >
                Total Fee
              </label>
              <span className='text-[20px]'>40,000đ</span>
            </div>

            <div
              id='wallet-container'
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='wallet'
                id='wallet-label'
                className='text-[22px] font-semibold w-[400px]'
              >
                Your Wallet
              </label>
              <span className='text-[20px]'>29,000đ</span>
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
