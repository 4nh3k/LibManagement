import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { bookApi } from 'src/apis/book.api';
import SimpleTable from 'src/components/Table/SimpleTable';
import { useAppContext } from 'src/contexts/app.contexts';
import useBorrowCard from 'src/hooks/useBorrowCard';
import useMember from 'src/hooks/useMember';

interface Props {
  id?: string;
  onToggle?: () => void;
}
const headers = [
  { dataIndex: 'bookName', title: 'Book Name' },
  { dataIndex: 'quantityInput', title: 'Quantity' },
  { dataIndex: 'action', title: 'Action' }
];

interface OrderList {
  bookId: string;
  bookName: string;
  quantityInput?: React.ReactNode;
}
// eslint-disable-next-line no-empty-pattern
const BorrowCardForm: React.FC<Props> = ({ onToggle }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantityList, setQuantityList] = useState<Map<string, number>>(new Map());
  const { createBorrowCardMutation } = useBorrowCard();
  const { getMemberQuery } = useMember();
  const { data: memberData } = getMemberQuery;
  const { profile } = useAppContext();
  const isAdmin = profile?.role === 'admin';
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
        return { bookId: item.bookId, quantity: quantityList.get(item.bookId) };
      })
    };
    console.log(data);
    createBorrowCardMutation.mutate(data, {
      onSuccess: () => {
        onToggle && onToggle();
      }
    });
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, bookId: string) => {
    const newQuantityList = new Map(quantityList);
    newQuantityList.set(bookId, Number(event.target.value));
    setQuantityList(newQuantityList);
    setOrderList(prevOrderList =>
      prevOrderList.map(item =>
        item.bookId === bookId
          ? {
              ...item,
              quantityInput: (
                <input
                  className='w-10 sm:w-20 md:w-40'
                  type='number'
                  min={1}
                  required
                  onChange={e => handleQuantityChange(e, item.bookId)}
                  value={event.target.value}
                />
              )
            }
          : item
      )
    );
  };

  const handleBookSelect = (selectedBook: any) => {
    const book = selectedBook;
    const existingOrder = orderList.find(item => item.bookId === book.value);

    if (existingOrder) {
      toast.warning('Book already added');
    } else {
      console.log(book.value);

      const newOrderList = [
        ...orderList,
        {
          bookId: book.value,
          bookName: book.label,
          quantityInput: (
            <input
              className='w-10 sm:w-20 md:w-40'
              type='number'
              min={1}
              required
              onChange={e => handleQuantityChange(e, book.value)}
              value={1}
            />
          )
        }
      ];

      const newQuantityList = new Map(quantityList);
      newQuantityList.set(book.value, 1);

      setQuantityList(newQuantityList);
      setOrderList(newOrderList);
    }

    setSelectedBook(null);
  };

  const handleDelete = (order: OrderList) => {
    const updatedOrderList = orderList.filter(item => item.bookId !== order.bookId);
    const updatedQuantityList = new Map(quantityList);
    updatedQuantityList.delete(order.bookId);
    setQuantityList(updatedQuantityList);
    setOrderList(updatedOrderList);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='lg:flex'>
        <div>
          <div className='lg:grid lg:grid-cols-3 gap-4 mt-5'>
            <div>
              <label className='custom-label' htmlFor='book-name'>
                Book Name:
              </label>
              <Select
                classNames={{
                  control: () => 'lg:w-[20rem]'
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
                value={isAdmin ? selectedMember : { value: profile?._id, label: profile?.email }}
                placeholder='Select a user'
                isDisabled={!isAdmin}
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
                value={
                  isAdmin ? selectedMember?.fullName : profile?.firstName + ' ' + profile?.lastName
                }
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
          deleteAction={handleDelete}
          nullMessage='No book added yet'
          className='shadow-gray-400 shadow-sm rounded-md w-full mt-2'
        />
      </div>
      <div className='flex mt-9 w-60 space-x-6 mx-auto'>
        <button type='submit' className='primary-btn-fit p-4  w-20 block '>
          Create
        </button>
        <button type='button' onClick={onToggle} className='secondary-btn p-4 w-20 block '>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BorrowCardForm;
