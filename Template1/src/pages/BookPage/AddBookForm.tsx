import React from 'react';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
import upload_img from '../../assets/img/upload-img.png';
import submit_img from '../../assets/img/submit.png';
interface Props {
  id?: string;
  onToggle?: () => void;
}

// eslint-disable-next-line no-empty-pattern
const AddBookForm: React.FC<Props> = ({ onToggle }) => {
  return (
    <div className='flex-row mr-10'>
      <div id='horizontal-header' className='flex items-center relative mt-5 mb-10'>
        <h2 className='font-bold text-xl'>Add book</h2>
      </div>
      <div
        id='img-submit'
        className='inline-block text-center flex-col items-center space-y-10 align-middle mr-10'
      >
        <img className='text-center ml-auto mr-auto' alt='upload image' src={upload_img}></img>
        <Button
          label='Submit'
          icon={submit_img}
          bg_color='#ffffff'
          color='#4BB543'
          border_color='#4bb543'
          onclick={onToggle}
        ></Button>
      </div>
      <div className='inline-block align-middle'>
        <div className='flex-row inline-flex gap-x-20'>
          <div className='w-72 mt-5'>
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
          <div className='w-72 mt-5'>
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
        <div className='w-72 mt-5'>
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
        <div className=' mt-5'>
          <label className='custom-label' htmlFor='book-order-list'>
            Description
          </label>
          <div className='flex items-center'>
            <textarea
              className='w-72 focus:outline-none focus:border-2 focus:border-primary rounded py-1 px-3 border-1 text-sm border-textboxBorder mt-1'
              id='book-description'
              rows={6}
              cols={50}
            />
          </div>
        </div>
        <div className='flex-col gap-x-20'>
          <label className='custom-label' htmlFor='book-published-date'>
            Published date
          </label>
          <div className='flex-row inline-flex gap-x-20'>
            <div className='w-72 mt-5'>
              <label className='custom-label' htmlFor='book-year'>
                Year
              </label>
              <input
                type='number'
                className='custom-input mt-1'
                id='member_name'
                placeholder='Enter year'
              />
            </div>
            <div className='w-72 mt-5'>
              <label className='custom-label' htmlFor='book-month'>
                Month
              </label>
              <input
                type='number'
                className='custom-input mt-1'
                id='member_id'
                placeholder='Enter month'
              />
            </div>
            <div className='w-72 mt-5'>
              <label className='custom-label' htmlFor='book-day'>
                Day
              </label>
              <input
                type='number'
                className='custom-input mt-1'
                id='member_id'
                placeholder='Enter day'
              />
            </div>
          </div>
        </div>
        <div className='flex-row inline-flex gap-x-20'>
          <div className='w-72 mt-5'>
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
          <div className='w-72 mt-5'>
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
      </div>
    </div>
  );
};

export default AddBookForm;
