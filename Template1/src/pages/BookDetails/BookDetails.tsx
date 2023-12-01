import { useParams } from 'react-router-dom';
import Button from 'src/components/Button';
import RatingStar from 'src/components/RatingStar/RatingStar';
import Sidebar from 'src/components/Sidebar/Sidebar';
import user_icon from '../../assets/img/user.png';
import { useBookDetails } from 'src/hooks/useBookDetails';
import { ArrowLeft } from '@phosphor-icons/react';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useBookDetails(id || '');
  return (
    <>
      {!isLoading ? (
        <div className='w-screen h-screen overflow-auto bg-background'>
          <Sidebar></Sidebar>
          <div className='bg-background pt-2 pl-[7rem] desktop:pl-[8rem] w-full h-screen overflow-auto'>
            <div id='horizontal-header' className='mb-10 mt-4 flex w-full items-center relative'>
              <ArrowLeft size={32}></ArrowLeft>
              <div id='button-container' className='absolute right-5'>
                <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
              </div>
            </div>
            <div className='flex flex-col desktop:flex-row items-center gap-y-3 shadow-md mt-12 mr-14 p-3'>
              <img
                className='w-32 h-32 desktop:w-60 desktop:h-[23rem]'
                crossOrigin='anonymous'
                // src={data.photoUrls[0]}
                src='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
                alt={data.nameBook}
              />
              <div className='ml-10'>
                <h1 className='block text-2xl font-bold'>{data.nameBook}</h1>
                <h2>
                  by <span className='text-linkText font-semibold'>{data.author}</span>
                </h2>
                <p className='text-lg'>{data.publicationYear}</p>
                <div className='flex items-center'>
                  <p className='text-xl font-semibold'>{data.ratingsAverage}</p>
                  <RatingStar className='ml-5 scale-125' rating={data.ratingsAverage}></RatingStar>
                </div>
                <p className='mt-2 text-justify mr-2 leading-6'>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default BookDetails;
