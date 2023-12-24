import React, { useState } from 'react';
import useBorrowCard from 'src/hooks/useBorrowCard';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { bookApi } from 'src/apis/book.api';
import SimpleTable from 'src/components/Table/SimpleTable';
import { toast } from 'react-toastify';
import useMember from 'src/hooks/useMember';

interface Props {
  id?: string;
  onToggle?: () => void;
}
const headers = [
  { dataIndex: 'bookName', title: 'Book Name' },
  { dataIndex: 'quantity', title: 'Quantity' }
];
interface OrderList {
  bookId: string;
  bookName: string;
  quantity: number;
}
// eslint-disable-next-line no-empty-pattern
const BorrowCardForm: React.FC<Props> = ({ onToggle }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { createBorrowCardMutation } = useBorrowCard();
  const { getMemberQuery } = useMember();
  const { data: memberData } = getMemberQuery;
  const { data: bookData } = useQuery({
    queryKey: ['book'],
    queryFn: () => bookApi.getAllBooks(),
    select: data => {
      const books = data.data.data.doc;
      return books.map(item => {
        return { value: item._id, label: item.nameBook };
      });
    }
  });
  const [orderList, setOrderList] = useState<OrderList[]>([]);

  const handleAddBook = () => {
    if (!selectedBook) {
      toast.error('Please select a book');
      return;
    }
    if (!quantity) {
      toast.error('Please enter quantity');
      return;
    }
    if (quantity < 1) {
      toast.error('Please enter quantity greater than 0');
      return;
    }

    const book = selectedBook;
    const existingOrder = orderList.find(item => item.bookId === book.value);

    if (existingOrder) {
      const updatedOrderList = orderList.map(item => {
        if (item.bookId === book.value) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setOrderList(updatedOrderList);
    } else {
      const newOrderList = [...orderList, { bookId: book.value, bookName: book.label, quantity }];
      setOrderList(newOrderList);
    }
  };

  const handleUndo = () => {
    const lastOrder = orderList[orderList.length - 1];
    const updatedOrderList = orderList.filter(item => item !== lastOrder);
    setOrderList(updatedOrderList);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!selectedMember) {
      toast.error('Please select a member');
      return;
    }
    if (!orderList.length) {
      toast.error('Please add a book');
      return;
    }
    const data = {
      borrower: selectedMember.value,
      books: orderList.map(item => {
        return { bookId: item.bookId, quantity: item.quantity };
      })
    };
    console.log(data);
    createBorrowCardMutation.mutate(data, {
      onSuccess: () => {
        onToggle && onToggle();
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='font-bold text-xl'>Borrow Card</h2>
      <div className='lg:flex'>
        <div>
          <div className='flex flex-col lg:flex-row lg:inline-flex gap-x-6'>
            <div className='w-80 mt-5'>
              <label className='custom-label' htmlFor='member-id'>
                Member ID
              </label>
              <Select
                classNames={{
                  control: () => 'w-full'
                }}
                value={selectedMember}
                placeholder='Select a user'
                required={true}
                onChange={setSelectedMember}
                options={memberData?.data.data.doc.map(item => {
                  return { value: item._id, label: item.email, fullName: item.fullName };
                })}
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
                value={selectedMember?.fullName}
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
                options={bookData}
              />
              <button type='button' className='ml-6 secondary-btn' onClick={handleAddBook}>
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
            data={orderList}
            className='shadow-gray-400 shadow-sm rounded-md lg:w-[40rem]'
          />
          <button
            type='button'
            className='secondary-btn mt-4 lg:ml-auto block'
            onClick={handleUndo}
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

export default BorrowCardForm;
