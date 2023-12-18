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
function AddBookForm({ onToggle }: Props) {
  return (
    <form className='flex flex-col mb-10'>
      <div id='horizontal-header' className='flex items-center relative mt-5 mb-10'>
        <h2 className='font-bold text-xl'>Add book</h2>
      </div>
      <div className='flex flex-col gap-y-5 lg:flex-row gap-x-20'>
        <div className='flex flex-col items-center mr-3 shrink-0'>
          <img className='text-center h-48 mb-4 lg:h-96' alt='upload' src={upload_img}></img>
          <Button
            label='Submit'
            icon={submit_img}
            bg_color='#ffffff'
            color='#4BB543'
            border_color='#4bb543'
            onclick={onToggle}
          />
        </div>
        <div className='grow flex flex-col gap-2'>
          <div className='flex flex-col gap-y-5 lg:flex-row'>
            <div className='w-30 lg:w-72 lg:mr-11'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-title'
              >
                Book title
              </label>
              <input
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='member_name'
                placeholder='Enter book title'
              />
            </div>
            <div className='w-30 lg:w-72'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-publisher'
              >
                Book publisher
              </label>
              <input
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='member_id'
                placeholder='Enter book publisher'
              />
            </div>
          </div>

          <div className='w-30 lg:w-72'>
            <label
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              htmlFor='book-publisher'
            >
              Book author
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
              id='member_id'
              placeholder='Enter book author'
            />
          </div>

          <div className='w-30 lg:w-72'>
            <label
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              htmlFor='book-order-list'
            >
              Description
            </label>
            <div className=''>
              <textarea
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='book-description'
              />
            </div>
          </div>

          <div className='flex-col gap-y-5 gap-x-20'>
            <label
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              htmlFor='book-published-date'
            >
              Published date
            </label>
            <div className='flex flex-col gap-x-20 lg:flex-row'>
              <div className='w-20 lg:w-30 mt-5'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  htmlFor='book-year'
                >
                  Year
                </label>
                <input
                  type='number'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                  id='member_name'
                  placeholder='Year'
                  min={1}
                />
              </div>
              <div className='w-20 lg:w-30 mt-5'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  htmlFor='book-month'
                >
                  Month
                </label>
                <input
                  type='number'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                  id='member_id'
                  placeholder='Month'
                  min={1}
                  max={12}
                />
              </div>
              <div className='w-20 lg:w-30 mt-5'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  htmlFor='book-day'
                >
                  Day
                </label>
                <input
                  type='number'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                  id='member_id'
                  placeholder='Day'
                  min={1}
                  max={31}
                />
              </div>
            </div>
          </div>

          <div className='flex-col sm:flex-row inline-flex gap-x-10'>
            <div className='w-30 lg:w-72 mt-5'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-page'
              >
                Page
              </label>
              <input
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='member_name'
                placeholder='Enter number of pages'
              />
            </div>
            <div className='w-30 lg:w-72 mt-5'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-price'
              >
                Price
              </label>
              <input
                type='number'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='member_id'
                placeholder='Enter book price'
                min={0}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddBookForm;
