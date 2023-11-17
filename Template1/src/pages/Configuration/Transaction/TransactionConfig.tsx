import edit_icon from '../../../assets/img/edit.png';

import Button from 'src/components/Button';
const TransactionConfig = () => {
  return (
    <div>
      <div className=''>
        <div id='top-up-account' className='mb-5'>
          <div id='top-up-account-label' className='inline-flex flex-row items-center align-middle'>
            <div
              id='top-up-label-header'
              className='inline w-[4px] h-[41px] bg-[#8352fd] rounded mr-3 items-center align-middle'
            >
              &nbsp;
            </div>
            <span className='text-[24px] font-semibold mr-5'>Borrow card</span>
            <img
              alt='edit-icon'
              src={edit_icon}
              width={20}
              height={20}
              className='inline items-center align-middle'
            ></img>
          </div>
          <div className='flex flex-col gap-10'>
            <div
              id='max-num-book-input'
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='max-num-book'
                id='max-num-book'
                className='text-[22px] font-semibold w-[400px]'
              >
                Maximum book to order/day:
              </label>
              <input
                type='number'
                min={0}
                className='custom-input mt-1'
                id='max-book-order-input'
                placeholder='10'
              />
            </div>
            <div
              id='max-day-order-container'
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='max-day-order'
                id='max-day-order'
                className='text-[22px] font-semibold w-[400px]'
              >
                Maximum ordering days: 
              </label>
              <input
                type='number'
                min={0}
                className='custom-input mt-1'
                id='max-day-order-input'
                placeholder='10'
              />
            </div>
            <div id='pay-button-container' className='flex ml-auto mr-auto space-x-10'>
              <Button label='Save' bg_color='#FFD900' color='black'></Button>
              <Button label='Undo' bg_color='#FFEC80' color='black'></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionConfig;
