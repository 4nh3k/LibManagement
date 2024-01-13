import { ArrowLeft } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookApi } from 'src/apis/book.api';
import RatingStar from 'src/components/RatingStar/RatingStar';
import User from 'src/components/User/User';
import { formatDate } from 'src/utils/helper';

interface FormData {
  comment: string;
}
const BookDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(0);
  const onRatingChange = (value: number) => {
    setRating(value);
  };
  const { data: bookData, isLoading } = useQuery({
    queryKey: ['books', id],
    queryFn: () => bookApi.getBook(id || '1')
  });
  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => bookApi.getReviews(id || '1')
  });

  const reviews = reviewsData?.data.data.reviews || [];
  const addCommentMutation = useMutation({
    mutationFn: (data: { comment: string }) => {
      return bookApi.addComment({
        bookId: id || '1',
        comment: data.comment,
        rating: rating
      });
    },
    onSuccess: () => {
      toast.success('Add comment successfully');
      queryClient.invalidateQueries({
        queryKey: ['reviews', id]
      });
      reset();
    },
    onError: () => {
      reset();
      toast.error('You only can add comment once');
    }
  });
  const { handleSubmit, reset, register } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    if (rating === 0) {
      toast.error('Please rate this book');
      return;
    }
    addCommentMutation.mutate({
      comment: data.comment
    });
  });
  const book = bookData?.data.data.doc;

  return (
    <div className='p-10 pr-8'>
      <div className='mb-10 flex items-center justify-between ml-'>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={32} />
        </button>
        <User />
      </div>

      {isLoading && (
        <div role='status'>
          <svg
            aria-hidden='true'
            className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      )}

      {!isLoading && book && (
        <>
          <div className='flex flex-col items-center md:items-start md:flex-row gap-y-3 shadow-[0_0px_10px_rgba(0,0,0,0.25)] mt-12 mr-0 lg:mr-0 p-6'>
            <img
              className='w-40 h-60 lg:w-60 lg:h-80 shrink-0'
              crossOrigin='anonymous'
              src={book.photoUrls[0]}
              alt={book.nameBook}
            />

            <div className='flex flex-col gap-2 md:ml-6'>
              <h1 className='block text-3xl font-bold'>
                {book.nameBook}
                <span className='font-medium text-gray-700 text-xl'>
                  {` - ${book.publicationYear}`}
                </span>
              </h1>
              <h2 className='text-sm font-semibold'>
                by <span className='text-linkText text-base font-semibold'>{book.author}</span>
              </h2>
              <h2 className='text-sm font-semibold'>{book.pages} pages</h2>
              <h2 className='text-sm font-semibold'>
                Publisher:{' '}
                <span className='text-linkText text-base font-semibold'>{book.publisher}</span>
              </h2>
              <h2 className='text-sm font-semibold'>
                Genres:{' '}
                <span className='text-linkText text-base font-semibold'>
                  {book.genres.join(', ')}
                </span>
              </h2>

              <div className='flex items-center'>
                <p className='text-xl font-semibold'>{book.ratingsAverage || 4}</p>
                <RatingStar
                  className='ml-5 scale-125'
                  initialValue={book.ratingsAverage}
                  readonly
                />
              </div>
              <p className='text-justify leading-6 font-normal'>{book.description}</p>
            </div>
          </div>

          <section className='bg-white  mt-4 antialiased'>
            <div className='max-w-2xl mx-auto'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                  Discussion ({reviews.length})
                </h2>
              </div>

              <form onSubmit={onSubmit}>
                <RatingStar initialValue={rating} onClick={onRatingChange} />
                <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                  <label htmlFor='comment' className='sr-only'>
                    Your comment
                  </label>
                  <textarea
                    id='comment'
                    rows={6}
                    {...register('comment')}
                    className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                    placeholder='Write a comment...'
                    required
                    defaultValue={''}
                  />
                </div>
                <button
                  type='submit'
                  className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-white bg-blue-500 rounded-lg active:opacity-90'
                >
                  Post comment
                </button>
              </form>

              {reviews.map(review => {
                const fullName =
                  review.user.username ?? `${review.user.firstName} ${review.user.lastName}`;
                return (
                  <article className='p-6 text-base bg-white rounded-lg' key={review._id}>
                    <footer className='flex justify-between items-center mb-2'>
                      <div className='flex items-center'>
                        <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
                          <img
                            className='mr-2 w-6 h-6 rounded-full'
                            src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                            alt='Michael Gough'
                          />
                          {fullName}
                        </p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          <time dateTime='2022-02-08' title='February 8th, 2022'>
                            {formatDate(review.createdAt)}
                          </time>
                        </p>
                      </div>
                      <button
                        id='dropdownComment1Button'
                        data-dropdown-toggle='dropdownComment1'
                        className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                        type='button'
                      >
                        <svg
                          className='w-4 h-4'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 16 3'
                        >
                          <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                        </svg>
                        <span className='sr-only'>Comment settings</span>
                      </button>
                    </footer>
                    <p className='text-gray-500'>{review.review}</p>
                    <div className='flex items-center mt-4 space-x-4'></div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
export default BookDetails;
