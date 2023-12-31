import { Link } from 'react-router-dom';
import RatingStar from '../RatingStar/RatingStar';

interface BookProps {
  coverImg: string;
  title: string;
  overview: string;
  rating: number;
  id: string;
}

function BookCard({ coverImg, title, overview, rating, id }: BookProps) {
  return (
    <Link className='flex p-2 rounded-sm hover:shadow-xl transition-all' to={`/books/${id}`}>
      <img className='w-32 h-48' src={coverImg} alt={title} crossOrigin='anonymous' />
      <div className='w-32 ml-2 flex flex-col justify-between flex-grow'>
        <h2 className='text-primary2 text-lg font-bold line-clamp-3'>{title}</h2>
        <RatingStar initialValue={rating} readonly />
        <p className='text-gray-500 h-12 text-xs font-semibold line-clamp-3'>{overview}</p>
        <button className='bg-gray-500 hover:opacity-80 text-white w-24 text-sm font-medium h-8 rounded-md'>
          See more
        </button>
      </div>
    </Link>
  );
}

export default BookCard;
