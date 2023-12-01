import RatingStar from '../RatingStar/RatingStar';

interface BookProps {
  coverImg: string;
  title: string;
  overview: string;
  rating: number;
}

function BookCard({ coverImg, title, overview, rating }: BookProps) {
  return (
    <div className='flex items-center'>
      <img className='w-32 h-45' src={coverImg} alt={title} />
      <div className='w-32 ml-2'>
        <h2 className='text-primary2 text-lg font-bold'>{title}</h2>
        <RatingStar rating={rating}></RatingStar>
        <p className='text-gray-500 text-xs mt-1 font-semibold line-clamp-2'>{overview}</p>
        <button className='primary-btn-fit mt-1'>See more</button>
      </div>
    </div>
  );
}

export default BookCard;
