import edit_icon from '../../../assets/img/edit.png';

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
            />
          </div>

          <div className='flex flex-col gap-10'>
            <div
              id='member-max-publication-year-input'
              className='flex lg:flex-row flex-col ml-[1rem] lg:items-center align-middle'
            >
              <label
                htmlFor='max-publication'
                id='max-publicaton-label'
                className='text-[1.375rem] font-semibold lg:basis-48 shrink-0'
              >
                Maxium years:
              </label>
              <input
                type='number'
                min={0}
                className='custom-input mt-1 max-w-[25rem] h-10 text-black font-medium'
                id='max-publication-year-input'
                placeholder='Max years'
              />
            </div>

            <div className='flex flex-col gap-10'>
              <div
                id='member-max-amount-book-input'
                className='flex w-18 ml-flex flex-col lg:flex-row ml-[1rem] lg:items-center align-middle'
              >
                <label
                  htmlFor='max-book-amount'
                  id='max-book-amount'
                  className='text-[1.375rem] font-semibold lg:basis-48'
                >
                  Maxium amount of a book:
                </label>
                <input
                  type='number'
                  min={0}
                  className='custom-input mt-1 max-w-[25rem] h-10 text-black font-medium'
                  id='max-amount-book-input'
                  placeholder='Max book'
                />
              </div>
            </div>

            <div id='pay-button-container' className='flex ml-auto mr-auto lg:ml-[4rem] space-x-10'>
              <button className='rounded-full h-10 w-20 bg-slate-500 text-white font-medium text-sm hover:opacity-90'>
                Save
              </button>

              <button className='rounded-full h-10 w-20 bg-slate-500 text-white font-medium text-sm hover:opacity-90'>
                Undo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderConfig;
