import edit_icon from '../../../assets/img/edit.png';

import Button from 'src/components/Button';
const BookConfig = () => {
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
            <span className='text-[24px] font-semibold mr-5'>Reader card</span>
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
              id='member-minimum-age-input'
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='member_minimum-age'
                id='member-label'
                className='text-[22px] font-semibold w-[400px]'
              >
                Minimum age
              </label>
              <input
                type='number'
                min={0}
                className='custom-input mt-1'
                id='member_minium_age'
                placeholder='Minimum age'
              />
            </div>
            <div
              id='member-max-age-input'
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='member-max-age'
                id='member-max-age'
                className='text-[22px] font-semibold w-[400px]'
              >
                Maximum age
              </label>
              <input
                type='text'
                className='custom-input mt-1'
                id='member_max-age-input'
                placeholder='Max age'
              />
            </div>

            <div
              id='member-card-expiration'
              className='ml-auto mr-auto flex flex-row items-center align-middle'
            >
              <label
                htmlFor='member-card-expi-label'
                id='member-label'
                className='text-[22px] font-semibold w-[400px]'
              >
                Card expiration time
              </label>
              <input
                type='number'
                className='custom-input mt-1'
                id='member_card_expire_time'
                placeholder='Enter card expiration time'
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

export default BookConfig;
