import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { bookApi } from 'src/apis/book.api';
import BookCard from 'src/components/BookCard/BookCard';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import Pagination from 'src/components/Pagination/Pagination';
import Search from 'src/components/Search';
import User from 'src/components/User/User';

export default function Library() {
  // const groupList = ['All books', 'Author', 'Publisher'];
  // const [isAllBook, setAllBook] = useState(true);
  // const [isAuthorGrouped, setAuthorGroup] = useState(true);
  // const [isPublishGrouped, setPublishGroup] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: booksData, isLoading } = useQuery({
    queryKey: ['library', { filter, currentPage }],
    queryFn: ({ signal }) => {
      return bookApi.getBookByPage(currentPage, filter || undefined, signal);
    }
  });
  const books = booksData?.data.data.doc;
  const handleChange = (value: string) => {
    setFilter(value);
    console.log(value);
    setCurrentPage(1);
  };

  return (
    <div className='w-full h-screen overflow-auto px-5'>
      <div
        id='horizontal-header'
        className='mb-4 mt-6 relative flex lg:flex-row lg:space-y-0 items-center justify-between ml-2 mr-7 align-middle'
      >
        <Search query={filter} onChange={handleChange} />

        <User />
      </div>

      {isLoading && (
        <div className=' w-full flex justify-center items-center'>
          <LoadingIndicator />
        </div>
      )}

      <div className='flex flex-col items-center md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-5 mr-10'>
        {!isLoading &&
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

      {((!isLoading && books?.length === 12) || currentPage != 1) && (
        <div className='align-center'>
          <Pagination totalPages={4} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}
