import React, { useState } from 'react';
import SimpleTable from 'src/components/Table/SimpleTable';
import Select from 'react-select';
import useBorrowCard from 'src/hooks/useBorrowCard';
import { toast } from 'react-toastify';
import useReturnCard from 'src/hooks/useReturnCard';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';

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
const ReturnCardForm: React.FC<Props> = ({ onToggle }) => {
  const [selectedBorrowCard, setSelectedBorrowCard] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { getAllNotReturnedBorrowCardQuery } = useBorrowCard();

  const handleBorrowCardChange = (value: any) => {
    setSelectedBorrowCard(value);
    setSelectedBook(null);
    setQuantity(1);
    setOrderList([]);
  };
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
    if (quantity + existingOrder?.quantity > selectedBook?.quantity) {
      toast.error('Please enter quantity less than book quantity');
      return;
    }

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
  const { data: borrowCardData } = getAllNotReturnedBorrowCardQuery;
  const { createReturnCardMutation } = useReturnCard();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBorrowCard) {
      toast.error('Please select a borrow card');
      return;
    }
    const data = {
      lostBooks: orderList.map(item => {
        return { bookId: item.bookId, quantity: item.quantity };
      })
    };
    console.log(data);
    createReturnCardMutation.mutate(
      { borrowCardId: selectedBorrowCard.value, data },
      {
        onSuccess: () => {
          onToggle && onToggle();
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='font-bold text-xl'>Return Card</h2>
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
                value={selectedBorrowCard}
                placeholder='Select a user'
                required={true}
                onChange={handleBorrowCardChange}
                options={borrowCardData}

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
                value={selectedBorrowCard?.fullName}
                id='member-name'
                placeholder='Enter member name'
              />
            </div>
          </div>
          <div className='mt-6'>
            <label className='custom-label' htmlFor='book-name'>
              Lost Book Name:
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
                options={selectedBorrowCard?.books || []}
                //options={bookData}
              />
              <button type='button' className='ml-6 secondary-btn' onClick={handleAddBook}>
                Add
              </button>
            </div>
          </div>
          <div className='w-80 mt-5'>
            <label className='custom-label' htmlFor='number-of-book'>
              Number Of Book Lost
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
            Book Lost List
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
      {createReturnCardMutation.isLoading && (
        <div className='w-20 mx-auto'>
          <LoadingIndicator />
        </div>
      )}
      {!createReturnCardMutation.isLoading && (
        <button type='submit' className='primary-btn-fit p-4 mt-9 w-20 block mx-auto'>
          Create
        </button>
      )}
    </form>
  );
};

export default ReturnCardForm;
