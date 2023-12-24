import React from 'react';
import book from 'src/assets/img/book.png';
import { DotsThreeOutline, PencilSimple, Trash, UploadSimple } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface BookItemProps {
  coverImg: string;
  title: string;
  description: string;
}

const BookListItem = ({ coverImg, title, description }: BookItemProps) => {
  return (
    <div className='flex justify-between items-center align-middle space-x-2'>
      <div className='flex items-center align-middle space-x-3'>
        <img src={coverImg} alt='book_picture' className='w-8 h-8'></img>
        <div className='flex flex-col space-y-1'>
          <span className='text-primary2 text-lg font-bold line-clamp-3'>{title}</span>
          <span className='max-w-[50ch] truncate text-gray-500 text-xs font-semibold line-clamp-3'>{description}</span>
        </div>
      </div>
      <div className='flex space-x-5'>
        <Link to={`/admin/editBook`}>
          <PencilSimple size={24}></PencilSimple>
        </Link>
        <Trash size={24}></Trash>
      </div>
    </div>
  );
};

export default BookListItem;
