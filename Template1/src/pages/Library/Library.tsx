import search_icon from '../../assets/img/icons8-search-128.png';
import user_icon from '../../assets/img/user.png';

import DropdownList from 'src/components/BookFilterDropdown/BookFilterDropdown';
import InputBox from 'src/components/InputBox';
import Button from 'src/components/Button';

import { bookApi } from 'src/apis/book.api';
import BookCard from 'src/components/BookCard/BookCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import Search from 'src/components/Search';
import { useState } from 'react';
import authApi from 'src/apis/auth.api';
import { clearLS } from 'src/utils/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Pagination from 'src/components/Pagination/Pagination';
import { useAppContext } from 'src/contexts/app.contexts';
import Popover from 'src/components/Popover';

export default function Library() {
  const navigate = useNavigate();

  const groupList = ['All books', 'Author', 'Publisher'];
  const [isAllBook, setAllBook] = useState(true);
  const [isAuthorGrouped, setAuthorGroup] = useState(true);
  const [isPublishGrouped, setPublishGroup] = useState(true);
  const [filter, setFilter] = useState<string>('');

  const { setIsAuthenticated } = useAppContext();

  const { data: booksData, isLoading } = useQuery({
    queryKey: ['library', { filter }],
    queryFn: ({ signal }) => {
      return bookApi.getAllBooks(filter || undefined, signal);
    }
  });
  const books = booksData?.data.data.doc;

  return (
    <div className='w-full h-screen overflow-auto px-5'>
      <div
        id='horizontal-header'
        className='mb-10 mt-2 relative flex flex-col space-y-3 lg:flex-row lg:space-y-0 items-center justify-between ml-2 mr-6'
      >
        {/* <DropdownList list={groupList}/> */}

        <Search query={filter} onChange={setFilter} />

        <div id='button-container' className='inline space-x-[1.5rem] right-10'>
          <Popover
            placement='bottom'
            hasArrow
            renderPopover={
              <ul className='bg-white p-2 rounded'>
                <button className='font-medium' onClick={() => logoutMutation.mutate()}>
                  Log out
                </button>
              </ul>
            }
          >
            <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black' />
          </Popover>
        </div>
      </div>

      <div className='flex flex-col items-center md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-5 mr-10'>
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

        {isAllBook &&
          !isLoading &&
          books &&
          books.map(book => (
            <BookCard
              key={book._id}
              id={book._id}
              coverImg={book.photoUrls[0]}
              overview={book.description}
              title={book.nameBook}
              rating={Math.floor(book.ratingsAverage) || 4}
            />
          ))}
      </div>
      {(!isLoading || (books != undefined && books.length > 0)) && (
        <div className='align-center'>
          <Pagination totalPages={10} currentPage={1} onPageChange={null}></Pagination>
        </div>
      )}
    </div>
  );
}
