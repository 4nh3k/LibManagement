import React from 'react';
import book from 'src/assets/img/book.png';
import { DotsThreeOutline, PencilSimple, Trash, UploadSimple } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface BookItemProps {
  coverImg: string;
  title: string;
  overview: string;
}

const BookListItem = ({ coverImg, title, overview }: BookItemProps) => {
  return (
    <div className='flex justify-between items-center align-middle space-x-2'>
      <div className='flex items-center align-middle space-x-3'>
        <img src={coverImg} alt='book_picture' className='w-8 h-8'></img>
        <div className='flex flex-col space-y-1'>
          <span className='text-xl'>{title}</span>
          <span className='text-sm max-w-[50ch] truncate'>{overview}</span>
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
