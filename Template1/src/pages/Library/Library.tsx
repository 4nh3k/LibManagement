import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookApi } from 'src/apis/book.api';
import BookCard from 'src/components/BookCard/BookCard';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import Pagination from 'src/components/Pagination/Pagination';
import Search from 'src/components/Search';
import User from 'src/components/User/User';
import { useAppContext } from 'src/contexts/app.contexts';

export default function Library() {
  const navigate = useNavigate();

  const groupList = ['All books', 'Author', 'Publisher'];
  const [isAllBook, setAllBook] = useState(true);
  const [isAuthorGrouped, setAuthorGroup] = useState(true);
  const [isPublishGrouped, setPublishGroup] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
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
        className='mb-4 mt-5 relative flex flex-col space-y-3 lg:flex-row lg:space-y-0 items-center justify-between ml-2 mr-6'
      >
        <Search query={filter} onChange={setFilter} />

        <User />
      </div>

      {isLoading && (
        <div className=' w-full flex justify-center items-center'>
          <LoadingIndicator />
        </div>
      )}
      <div className='flex flex-col items-center md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-5 mr-10'>
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

      {(!isLoading || books != undefined || (books?.length || 0) > 0) && (
        <div className='align-center'>
          <Pagination totalPages={10} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}
