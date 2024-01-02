import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import SimpleTable from 'src/components/Table/SimpleTable';
import useBorrowCard from 'src/hooks/useBorrowCard';
import useReturnCard from 'src/hooks/useReturnCard';

interface Props {
  id?: string;
  onToggle?: () => void;
}
const headers = [
  { dataIndex: 'bookName', title: 'Book Name' },
  { dataIndex: 'quantity', title: 'Quantity' },
  { dataIndex: 'lostQuantity', title: 'Lost Quantity' }
];
interface OrderList {
  bookId: string;
  bookName: string;
  quantity: number;
  lostQuantity: React.ReactNode;
}
// eslint-disable-next-line no-empty-pattern
const ReturnCardForm: React.FC<Props> = ({ onToggle }) => {
  const [selectedBorrowCard, setSelectedBorrowCard] = useState(null);
  const [orderList, setOrderList] = useState<OrderList[]>([]);
  const { createReturnCardMutation } = useReturnCard();
  const { getAllNotReturnedBorrowCardQuery } = useBorrowCard();
  const { data: borrowCardData } = getAllNotReturnedBorrowCardQuery;
  getAllNotReturnedBorrowCardQuery.refetch();

  console.log('render');
  useEffect(() => {
    console.log('mounted');
  }, []);
  useEffect(() => {
    console.log('Order list changed:', orderList);
  }, [orderList]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, bookId: string) => {
    setOrderList(prevOrderList =>
      prevOrderList.map(item => {
        if (item.bookId === bookId) {
          return {
            ...item,
            lostQuantity: (
              <input
                className='w-10 sm:w-20 md:w-40'
                name='init'
                type='number'
                min={0}
                max={item.quantity}
                required
                onChange={e => handleQuantityChange(e, item.bookId)}
                value={event.target.value}
              />
            )
          };
        }
        return item;
      })
    );
  };

  const handleBorrowCardChange = (value: any) => {
    const newOrderList = value.books.map(item => {
      return {
        bookId: item.bookId,
        bookName: item.bookName,
        quantity: item.quantity,
        lostQuantity: (
          <input
            className='w-10 sm:w-20 md:w-40'
            name='init'
            type='number'
            min={0}
            max={item.quantity}
            required
            onChange={e => handleQuantityChange(e, item.bookId)}
            value={0}
          />
        )
      };
    });
    setOrderList(newOrderList);
    setSelectedBorrowCard(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBorrowCard) {
      toast.error('Please select a borrow card');
      return;
    }
    const data = {
      lostBooks: orderList
        .filter(item => parseInt(item.lostQuantity.props.value) > 0)
        .map(item => {
          return { bookId: item.bookId, quantity: parseInt(item.lostQuantity.props.value) };
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
      <div className='md:flex'>
        <div className='md:w-[32rem] mt-5 md:mr-4'>
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
        <div className='md:w-[32rem] mt-5'>
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
      <div className=' mt-5'>
        <label className='custom-label' htmlFor='book-order-list'>
          Borrowed Book List
        </label>
        <SimpleTable
          headers={headers}
          data={orderList}
          className='shadow-gray-400 shadow-sm rounded-md mt-2'
        />
      </div>
      {createReturnCardMutation.isLoading && (
        <div className='w-20 mx-auto mt-9'>
          <LoadingIndicator />
        </div>
      )}
      {!createReturnCardMutation.isLoading && (
        <div className='flex mt-9 w-60 space-x-6 mx-auto'>
          <button type='submit' className='primary-btn-fit p-4 w-20 block'>
            Create
          </button>
          <button type='button' onClick={onToggle} className='secondary-btn p-4 w-20 block '>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default ReturnCardForm;
