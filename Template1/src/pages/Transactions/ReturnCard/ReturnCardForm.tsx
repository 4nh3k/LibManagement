import React, { useState } from 'react';
import SimpleTable from 'src/components/Table/SimpleTable';
import Select from 'react-select';

interface Props {
  id?: string;
  onToggle?: () => void;
}
const headers = [
  { dataIndex: 'bookName', title: 'Book Name' },
  { dataIndex: 'quantity', title: 'Quantity' }
];
// eslint-disable-next-line no-empty-pattern
const ReturnCardForm: React.FC<Props> = ({ onToggle }) => {
  const [selectedBorrowId, setSelectedBorrowId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <form>
      <h2 className='font-bold text-xl'>Borrow Card</h2>
      <div className='lg:flex'>
        <div>
          <div className='flex flex-col lg:flex-row lg:inline-flex gap-x-6'>
            <div className='w-80 mt-5'>
              <label className='custom-label' htmlFor='member-id'>
                Borrow Card ID
              </label>
              <Select
                classNames={{
                  control: () => 'w-full'
                }}
                value={selectedBorrowId}
                placeholder='Select a user'
                required={true}
                onChange={setSelectedBorrowId}
                // options={memberData?.data.data.doc.map(item => {
                //   return { value: item._id, label: item.email, fullName: item.fullName };
                // })}
              />
            </div>
            <div className='w-72 mt-5'>
              <label className='custom-label' htmlFor='member-name'>
                Member name
              </label>
              <input
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2 outline-none focus:ring-1'
                disabled={true}
                //value={selectedMember?.fullName}
                id='member-name'
                placeholder='Enter member name'
              />
            </div>
          </div>
          <div className='mt-6'>
            <label className='custom-label' htmlFor='book-name'>
              Book Name:
            </label>
            <div className='flex items-center'>
              <Select
                classNames={{
                  control: () => 'w-80'
                }}
                value={selectedBook}
                placeholder='Select a book'
                required={true}
                onChange={setSelectedBook}
                //options={bookData}
              />
              <button type='button' className='ml-6 secondary-btn'>
                Add
              </button>
            </div>
          </div>
          <div className='w-80 mt-5'>
            <label className='custom-label' htmlFor='number-of-book'>
              Number of book
            </label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2 outline-none focus:ring-1'
              type='number'
              value={quantity}
              onChange={e => setQuantity(+e.target.value)}
              min={1}
              id='number-of-book'
              placeholder='Enter number of book'
            />
          </div>
        </div>
        <div className='lg:ml-5 mt-5'>
          <label className='custom-label' htmlFor='book-order-list'>
            Book Order List
          </label>
          <SimpleTable
            headers={headers}
            data={[]}
            className='shadow-gray-400 shadow-sm rounded-md lg:w-[40rem]'
          />
          <button
            type='button'
            className='secondary-btn mt-4 lg:ml-auto block'
            // onClick={handleUndo}
          >
            Undo
          </button>
        </div>
      </div>
      <button type='submit' className='primary-btn-fit p-4 mt-9 w-20 block mx-auto'>
        Create
      </button>
    </form>
  );
};

export default ReturnCardForm;
