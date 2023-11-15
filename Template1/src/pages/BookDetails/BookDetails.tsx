import { useParams } from 'react-router-dom';
import RatingStar from 'src/components/RatingStar/RatingStar';
import { useBookDetails } from 'src/hooks/useBookDetails';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useBookDetails(id || '');
  return (
    <>
      {!isLoading ? (
        <div className='flex shadow-md'>
          <img
            className='w-60 h-[23rem]'
            crossOrigin='anonymous'
            src={data.photoUrls[0]}
            alt={data.nameBook}
          />
          <div className='ml-10'>
            <h1 className='text-2xl font-bold'>{data.nameBook}</h1>
            <h2>
              by <span className='text-linkText font-semibold'>{data.author}</span>
            </h2>
            <p className='text-lg'>{data.publicationYear}</p>
            <div className='flex items-center'>
              <p className='text-xl font-semibold'>{data.ratingsAverage}</p>
              <RatingStar className='ml-5 scale-125' rating={data.ratingsAverage}></RatingStar>
            </div>
            <p className='mt-2'>{data.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default BookDetails;
