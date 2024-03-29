import { Link } from 'react-router-dom';
import BookListItem from 'src/components/BookListItem/BookListItem';
import Button from 'src/components/Button/Button';
import User from 'src/components/User/User';
import useBook from 'src/hooks/useBook';

const BookList = () => {
  const { getAllBooksQuery } = useBook();
  const { data: booksData, isLoading } = getAllBooksQuery;
  const books = booksData?.data.data.doc;

  return (
    <div className='flex flex-col'>
      <div id='horizontal-header' className='pl-5 pr-5 lg:pr-10 pt-6 pb-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xl lg:text-2xl font-bold'>Book List</span>
          <User />
        </div>
      </div>
      <div className='flex justify-end pl-5 pr-5 lg:pr-10 py-2'>
        <Link to={`/admin/book`}>
          <Button label='Add book' bg_color='#5632a1 ' color='white'></Button>
        </Link>
      </div>
      <div className='flex flex-col space-y-5 pl-5 pr-5 lg:pr-10 py-2'>
        {!isLoading &&
          books &&
          books.map(book => (
            <BookListItem
              key={book._id}
              id={book._id}
              coverImg={book.photoUrls[0]}
              title={book.nameBook}
              description={book.description}
            />
          ))}
      </div>
    </div>
  );
};

export default BookList;
