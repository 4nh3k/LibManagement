import { Link } from 'react-router-dom';
import RatingStar from '../RatingStar/RatingStar';

interface BookProps {
  coverImg: string;
  title: string;
  overview: string;
  rating: number;
}

function BookCard({ coverImg, title, overview, rating }: BookProps) {
  return (
    <Link className='flex' to='#'>
      <img className='w-32 h-45' src={coverImg} alt={title} crossOrigin='anonymous' />
      <div className='w-32 ml-2 flex flex-col justify-between'>
        <h2 className='text-primary2 text-lg font-bold'>{title}</h2>
        <RatingStar rating={rating} />
        <p className='text-gray-500 h-12 text-xs mt-1 font-semibold line-clamp-3'>{overview}</p>
        <button className='primary-btn-fit mt-1'>See more</button>
      </div>
    </Link>
  );
}

export default BookCard;
