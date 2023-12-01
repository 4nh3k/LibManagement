import edit_icon from '../../../assets/img/edit.png';

import Button from 'src/components/Button';
const ReaderConfig = () => {
  return (
    <div>
      <div className=''>
        <div id='top-up-account' className='mb-5 w-full pr-10'>
          <div
            id='top-up-account-label'
            className='inline-flex flex-row items-center align-middle mb-10'
          >
            <div
              id='top-up-label-header'
              className='inline w-[0.25rem] h-[2.5625rem] bg-[#8352fd] rounded mr-3 items-center align-middle'
            >
              &nbsp;
            </div>
            <span className='text-[1.375rem] font-semibold mr-5'>Publication year</span>
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
              id='member-max-publication-year-input'
              className='w-18 desktop:w-72 ml-flex flex-col desktop:flex-row desktop:mr-auto ml-[1rem] items-center align-middle'
            >
              <label
                htmlFor='max-publication'
                id='max-publicaton-label'
                className='text-[1.375rem] font-semibold w-[25rem]'
              >
                Maxium years:
              </label>
              <input
                type='number'
                min={0}
                className='custom-input mt-1 w-[25rem]'
                id='max-publication-year-input'
                placeholder='Max years'
              />
            </div>

            <div className='flex flex-col gap-10'>
              <div
                id='member-max-amount-book-input'
                className='w-18 desktop:w-72 ml-flex flex-col desktop:flex-row desktop:mr-auto ml-[1rem] items-center align-middle'
              >
                <label
                  htmlFor='max-book-amount'
                  id='max-book-amount'
                  className='text-[1.375rem] font-semibold w-[10rem]'
                >
                  Maxium amount of a book:
                </label>
                <input
                  type='number'
                  min={0}
                  className='custom-input mt-1 w-[25rem]'
                  id='max-amount-book-input'
                  placeholder='Max book'
                />
              </div>

              <div
                id='pay-button-container'
                className='flex ml-auto mr-auto desktop:ml-[4rem] space-x-10'
              >
                <Button label='Save' bg_color='#FFD900' color='black'></Button>
                <Button label='Undo' bg_color='#FFEC80' color='black'></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderConfig;
