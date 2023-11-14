import React from 'react';

interface Props {
  id?: string;
}

const ReturnCard: React.FC<Props> = ({ id }) => {
  return (
    <div>
      <h2 className='font-bold text-xl'>Return Card</h2>
      <div className='mt-9'>
        <label className='custom-label' htmlFor='borrow-card-id'>
          Borrow Card ID:
        </label>
        <select className='w-56 custom-select mt-1' id='borrow-card-id'>
          <option value='1'>Borrow Card 1</option>
          <option value='2'>Borrow Card 2</option>
          <option value='3'>Borrow Card 3</option>
        </select>
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
        <input
          type='text'
          className='custom-input mt-1'
          id='book-id'
          placeholder='Enter number of pages'
        />
      </div>
      <div className=' mt-5'>
        <label className='custom-label' htmlFor='book-order-list'>
          Book ID
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
      <button type='button' className=' secondary-btn mt-9 mx-auto ml-24'>
        Create
      </button>
    </div>
  );
};

export default ReturnCard;
