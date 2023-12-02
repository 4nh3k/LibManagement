import search_icon from '../../assets/img/icons8-search-128.png';
import user_icon from '../../assets/img/user.png';

import DropdownList from 'src/components/BookFilterDropdown/BookFilterDropdown';
import InputBox from 'src/components/InputBox';
import Button from 'src/components/Button';

import { bookApi } from 'src/apis/book.api';
import BookCard from 'src/components/BookCard/BookCard';
import { useQuery } from '@tanstack/react-query';

export default function Library() {
  const { data: booksData } = useQuery({
    queryKey: ['books'],
    queryFn: () => bookApi.getAllBooks()
  });

  const books = booksData?.data.data.doc;

  return (
    <div className='bg-background pt-2 pl-[7rem] lg:pl-[9rem] w-full h-screen overflow-auto'>
      <div id='horizontal-header' className='mb-10 mt-2 lg: relative'>
        <DropdownList
          list={['All books', 'Genre', 'Subject', 'Author', 'Publisher']}
        ></DropdownList>

        <div id='keyword-search-input' className='mr-10 flex flex-col lg:inline'>
          <label htmlFor='keyword' className='mt-2 mb-2 lg:ml-20 lg:mr-5'>
            Keywords
          </label>
          <InputBox placeholder='Enter keywords' type='text'></InputBox>
        </div>

        <div id='input-search-quantity' className='mb-5 mr-10 flex flex-col lg:inline'>
          <label htmlFor='quantity' className='mt-2 mb-2 lg:ml-20 lg:mr-5'>
            Quantity
          </label>
          <InputBox placeholder='1' type='number'></InputBox>
        </div>

        <div id='button-container' className='inline space-x-[1.5rem] lg:absolute right-10'>
          <Button
            label='Search'
            bg_color='#5632A1'
            icon={search_icon}
            color='white'
            border_color='#D7C9FF'
          ></Button>
          <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
        </div>
      </div>

      {books && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-10 mr-10'>
          {books.map(book => (
            <BookCard
              key={book._id}
              coverImg={book.photoUrls[0]}
              overview={book.description}
              title={book.nameBook}
              rating={Math.floor(book.ratingsAverage) || 4}
            />
          ))}
        </div>
      )}
    </div>
  );
}
