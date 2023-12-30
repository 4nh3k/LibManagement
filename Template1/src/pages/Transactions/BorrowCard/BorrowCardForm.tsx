import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { bookApi } from 'src/apis/book.api';
import SimpleTable from 'src/components/Table/SimpleTable';
import useBorrowCard from 'src/hooks/useBorrowCard';
import useMember from 'src/hooks/useMember';

interface Props {
  id?: string;
  onToggle?: () => void;
}
const headers = [
  { dataIndex: 'bookName', title: 'Book Name' },
  { dataIndex: 'quantity', title: 'Quantity' },
  { dataIndex: 'quantityInput', title: 'Quantity' },
  { dataIndex: 'action', title: 'Action' }
];
interface OrderList {
  bookId: string;
  bookName: string;
  quantity: number;
  quantityInput?: React.ReactNode;
}
// eslint-disable-next-line no-empty-pattern
const BorrowCardForm: React.FC<Props> = ({ onToggle }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
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

  const handleBookSelect = (selectedBook: any) => {
    const book = selectedBook;
    const existingOrder = orderList.find(item => item.bookId === book.value);

    if (existingOrder) {
      const updatedOrderList = orderList.map(item => {
        if (item.bookId === book.value) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setOrderList(updatedOrderList);
    } else {
      const newOrderList = [
        ...orderList,
        {
          bookId: book.value,
          bookName: book.label,
          quantity: 1,
          quantityInput: <input type='number' min={1} value={1} />
        }
      ];
      setOrderList(newOrderList);
    }
    setSelectedBook(null);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='lg:flex'>
        <div>
          <div className='grid grid-cols-3 gap-4 mt-5'>
            <div>
              <label className='custom-label' htmlFor='book-name'>
                Book Name:
              </label>
              <Select
                classNames={{
                  control: () => 'w-[25rem]'
                }}
                value={selectedBook}
                placeholder='Select a book'
                onChange={handleBookSelect}
                options={bookData}
              />
            </div>
            <div>
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
            <div>
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
        </div>
        <div className='mt-6'></div>
      </div>
      <div className='mt-5'>
        <label className='custom-label' htmlFor='book-order-list'>
          Book Order List
        </label>
        <SimpleTable
          headers={headers}
          data={orderList}
          nullMessage='No book added yet'
          className='shadow-gray-400 shadow-sm rounded-md w-full '
        />
        <button type='button' className='secondary-btn mt-4 lg:ml-auto block' onClick={handleUndo}>
          Undo
        </button>
      </div>
      <button type='submit' className='primary-btn-fit p-4 mt-9 w-20 block mx-auto'>
        Create
      </button>
    </form>
  );
};

export default BorrowCardForm;
