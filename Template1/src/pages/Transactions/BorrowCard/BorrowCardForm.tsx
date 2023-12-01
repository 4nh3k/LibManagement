import React from 'react';

interface Props {
  id?: string;
  onToggle?: () => void;
}

// eslint-disable-next-line no-empty-pattern
const BorrowCardForm: React.FC<Props> = ({ onToggle }) => {
  return (
    <div>
      <h2 className='font-bold text-xl'>Borrow Card</h2>
      <div className='flex flex-col lg:flex-row lg:inline-flex gap-x-20'>
        <div className='w-72 mt-5'>
          <label className='custom-label' htmlFor='book-id'>
            Member name
          </label>
          <input
            type='text'
            className='custom-input mt-1'
            id='member_name'
            placeholder='Enter member name'
          />
        </div>
        <div className='w-72 mt-5'>
          <label className='custom-label' htmlFor='book-id'>
            Book ID
          </label>
          <input
            type='text'
            className='custom-input mt-1'
            id='member_id'
            placeholder='Enter member id'
          />
        </div>
      </div>
      <div className='mt-6'>
        <label className='custom-label' htmlFor='book-name'>
          Book Name:
        </label>
        <div className='flex items-center'>
          <select className=' w-56 custom-select mt-1' id='book-name'>
            <option value='book1'>Book 1</option>
            <option value='book2'>Book 2</option>
            <option value='book3'>Book 3</option>
          </select>
          <button type='button' className='ml-4 secondary-btn'>
            Add
          </button>
        </div>
      </div>
      <div className='w-72 mt-5'>
        <label className='custom-label' htmlFor='book-id'>
          Book ID
        </label>
        <input type='text' className='custom-input mt-1' id='book-id' placeholder='Enter book ID' />
      </div>
      <div className=' mt-5'>
        <label className='custom-label' htmlFor='book-order-list'>
          Book Order List
        </label>
        <div className='flex items-center'>
          <textarea
            className='w-72 focus:outline-none focus:border-2 focus:border-primary rounded py-1 px-3 border-1 text-sm border-textboxBorder mt-1'
            id='book-order-list'
            rows={6}
            cols={50}
          />
          <button type='button' className='primary-btn-fit ml-4'>
            Undo
          </button>
        </div>
      </div>
      <button type='button' className=' secondary-btn mt-9 mx-auto ml-24' onClick={onToggle}>
        Create
      </button>
    </div>
  );
};

export default BorrowCardForm;
