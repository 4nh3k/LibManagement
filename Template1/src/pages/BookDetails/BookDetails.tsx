import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'src/components/Button';
import RatingStar from 'src/components/RatingStar/RatingStar';
import user_icon from '../../assets/img/user.png';
import { ArrowLeft } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { bookApi } from 'src/apis/book.api';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: bookData, isLoading } = useQuery({
    queryKey: ['books', id],
    queryFn: () => bookApi.getBook(id || '1')
  });

  const book = bookData?.data.data.doc;

  return (
    <div className='p-4'>
      <div className='mr-14 mb-10 mt-4 flex items-center justify-between ml-'>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={32} />
        </button>
        <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black' />
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
          <div className='flex flex-col items-center md:items-start md:flex-row gap-y-3 shadow-[0_0px_10px_rgba(0,0,0,0.25)] mt-12 mr-14 p-6'>
            <img
              className='w-40 h-60 lg:w-60 lg:h-80 shrink-0'
              crossOrigin='anonymous'
              src={book.coverImg}
              alt={book.title}
            />

            <div className='flex flex-col gap-2 md:ml-6'>
              <h1 className='block text-3xl font-bold'>
                {book.title}
                <span className='font-medium text-gray-700 text-xl'>
                  {` - ${book.publishDate}`}
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
                <p className='text-xl font-semibold'>{book.rating || 4}</p>
                <RatingStar className='ml-5 scale-125' rating={book.rating || 4} />
              </div>
              <p className='text-justify leading-6 font-normal'>{book.description}</p>
            </div>
          </div>

          <section className='bg-white dark:bg-gray-900 mt-4 antialiased'>
            <div className='max-w-2xl mx-auto'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                  Discussion (20)
                </h2>
              </div>

              <form>
                <RatingStar className='' rating={book.rating || 4} />
                <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                  <label htmlFor='comment' className='sr-only'>
                    Your comment
                  </label>
                  <textarea
                    id='comment'
                    rows={6}
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

              <article className='p-6 text-base bg-white rounded-lg dark:bg-gray-900'>
                <footer className='flex justify-between items-center mb-2'>
                  <div className='flex items-center'>
                    <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
                      <img
                        className='mr-2 w-6 h-6 rounded-full'
                        src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                        alt='Michael Gough'
                      />
                      Michael Gough
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      <time dateTime='2022-02-08' title='February 8th, 2022'>
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                  <button
                    id='dropdownComment1Button'
                    data-dropdown-toggle='dropdownComment1'
                    className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
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
                  {/* Dropdown menu */}
                  <div
                    id='dropdownComment1'
                    className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                  >
                    <ul
                      className='py-1 text-sm text-gray-700 dark:text-gray-200'
                      aria-labelledby='dropdownMenuIconHorizontalButton'
                    >
                      <li>
                        <Link
                          to='#'
                          className='block py-2 px-4 hover:bg-gray-100
                            dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='#'
                          className='block py-2 px-4 hover:bg-gray-100
                            dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Remove
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='#'
                          className='block py-2 px-4 hover:bg-gray-100
                            dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Report
                        </Link>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className='text-gray-500 dark:text-gray-400'>
                  Very straight-to-point article. Really worth time reading. Thank you! But tools
                  are just the instruments for the UX designers. The knowledge of the design tools
                  are as important as the creation of the design strategy.
                </p>
                <div className='flex items-center mt-4 space-x-4'></div>
              </article>

              <article className='p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900'>
                <footer className='flex justify-between items-center mb-2'>
                  <div className='flex items-center'>
                    <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
                      <img
                        className='mr-2 w-6 h-6 rounded-full'
                        src='https://flowbite.com/docs/images/people/profile-picture-3.jpg'
                        alt='Bonnie Green'
                      />
                      Bonnie Green
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      <time dateTime='2022-03-12' title='March 12th, 2022'>
                        Mar. 12, 2022
                      </time>
                    </p>
                  </div>
                  <button
                    id='dropdownComment3Button'
                    data-dropdown-toggle='dropdownComment3'
                    className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
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
                  {/* Dropdown menu */}
                  <div
                    id='dropdownComment3'
                    className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                  >
                    <ul
                      className='py-1 text-sm text-gray-700 dark:text-gray-200'
                      aria-labelledby='dropdownMenuIconHorizontalButton'
                    >
                      <li>
                        <Link
                          to='#'
                          className='block py-2 px-4 hover:bg-gray-100
                            dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='#'
                          className='block py-2 px-4 hover:bg-gray-100
                            dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Remove
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='#'
                          className='block py-2 px-4 hover:bg-gray-100
                            dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Report
                        </Link>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className='text-gray-500 dark:text-gray-400'>
                  The article covers the essentials, challenges, myths and stages the UX designer
                  should consider while creating the design strategy.
                </p>
                <div className='flex items-center mt-4 space-x-4'></div>
              </article>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
export default BookDetails;
