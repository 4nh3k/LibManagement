import React from 'react';
import Button from 'src/components/Button';
// import user_icon from '../../assets/img/user.png';
import upload_img from '../../assets/img/upload-img.png';
import submit_img from '../../assets/img/submit.png';
interface Props {
  id?: string;
  onToggle?: () => void;
}

// eslint-disable-next-line no-empty-pattern
const AddBookForm: React.FC<Props> = ({ onToggle }) => {
  return (
    <div className='flex flex-col mr-10 mb-10'>
      <div id='horizontal-header' className='flex items-center relative mt-5 mb-10'>
        <h2 className='font-bold text-xl'>Add book</h2>
      </div>
      <div className='flex flex-col gap-y-5 desktop:flex-row gap-x-20'>
        <div className='flex flex-col items-center mr-3 shrink-0'>
          <img className='text-center h-48 mb-4 desktop:h-96' alt='upload' src={upload_img}></img>
          <Button
            label='Submit'
            icon={submit_img}
            bg_color='#ffffff'
            color='#4BB543'
            border_color='#4bb543'
            onclick={onToggle}
          ></Button>
        </div>
        <div className='grow flex flex-col gap-2'>
          <div className='flex flex-col gap-y-5 desktop:flex-row'>
            <div className='w-30 desktop:w-72 desktop:mr-11'>
              <label className='custom-label' htmlFor='book-title'>
                Book title
              </label>
              <input
                type='text'
                className='custom-input mt-1'
                id='member_name'
                placeholder='Enter book title'
              />
            </div>
            <div className='w-30 desktop:w-72'>
              <label className='custom-label' htmlFor='book-publisher'>
                Book publisher
              </label>
              <input
                type='text'
                className='custom-input mt-1'
                id='member_id'
                placeholder='Enter book publisher'
              />
            </div>
          </div>

          <div className='w-30 desktop:w-72'>
            <label className='custom-label' htmlFor='book-publisher'>
              Book author
            </label>
            <input
              type='text'
              className='custom-input mt-1'
              id='member_id'
              placeholder='Enter book author'
            />
          </div>

          <div className='w-30 desktop:w-72'>
            <label className='custom-label' htmlFor='book-order-list'>
              Description
            </label>
            <div className=''>
              <textarea
                className='w-full desktop:w-72 focus:outline-none focus:border-2 focus:border-primary rounded py-1 px-3 border-1 text-sm border-textboxBorder mt-1'
                id='book-description'
              />
            </div>
          </div>

          <div className='flex-col gap-y-5 gap-x-20'>
            <label className='custom-label' htmlFor='book-published-date'>
              Published date
            </label>
            <div className='flex flex-col gap-x-20 desktop:flex-row'>
              <div className='w-20 desktop:w-30 mt-5'>
                <label className='custom-label' htmlFor='book-year'>
                  Year
                </label>
                <input
                  type='number'
                  className='custom-input mt-1'
                  id='member_name'
                  placeholder='Year'
                  min={1}
                />
              </div>
              <div className='w-20 desktop:w-30 mt-5'>
                <label className='custom-label' htmlFor='book-month'>
                  Month
                </label>
                <input
                  type='number'
                  className='custom-input mt-1'
                  id='member_id'
                  placeholder='Month'
                  min={1}
                  max={12}
                />
              </div>
              <div className='w-20 desktop:w-30 mt-5'>
                <label className='custom-label' htmlFor='book-day'>
                  Day
                </label>
                <input
                  type='number'
                  className='custom-input mt-1'
                  id='member_id'
                  placeholder='Day'
                  min={1}
                  max={31}
                />
              </div>
            </div>
          </div>

          <div className='flex-col tablet:flex-row inline-flex gap-x-10'>
            <div className='w-30 desktop:w-72 mt-5'>
              <label className='custom-label' htmlFor='book-page'>
                Page
              </label>
              <input
                type='text'
                className='custom-input mt-1'
                id='member_name'
                placeholder='Enter number of pages'
              />
            </div>
            <div className='w-30 desktop:w-72 mt-5'>
              <label className='custom-label' htmlFor='book-price'>
                Price
              </label>
              <input
                type='number'
                className='custom-input mt-1'
                id='member_id'
                placeholder='Enter book price'
                min={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;
