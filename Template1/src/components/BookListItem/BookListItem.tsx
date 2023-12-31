import React from 'react';
import book from 'src/assets/img/book.png';
import { DotsThreeOutline, PencilSimple, Trash, UploadSimple } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import useBook from 'src/hooks/useBook';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface BookItemProps {
  id: string;
  coverImg: string;
  title: string;
  description: string;
}

const BookListItem = ({ coverImg, title, description, id }: BookItemProps) => {
  const { deleteBookMutation } = useBook();

  const handleDeleteClick = () => {
    const confirmBox = window.confirm('Do you really want to delete this book?');
    console.log('delete clicked'
    )
    if (confirmBox === true) {
      deleteBookMutation.mutate(id);
    }
  };

  if (deleteBookMutation.isLoading) return <LoadingIndicator />;
  return (
    <div className='flex justify-between items-center align-middle space-x-2'>
      <div className='flex items-center align-middle space-x-3'>
        <img src={coverImg} alt='book_picture' className='h-20'></img>
        <div className='flex flex-col space-y-1'>
          <span className='text-primary2 text-lg font-bold line-clamp-3'>{title}</span>
          <p className='w-[10rem] lg:w-[40rem] text-gray-500 text-xs font-semibold line-clamp-3 text-ellipsis overflow-hidden ... text-justify'>
            {description}
          </p>
        </div>
      </div>
      <div className='flex space-x-5'>
        <Link to={`/admin/book/${id}`}>
          <PencilSimple size={24}></PencilSimple>
        </Link>
        <button onClick={() => handleDeleteClick}>
          <Trash size={24}></Trash>
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
