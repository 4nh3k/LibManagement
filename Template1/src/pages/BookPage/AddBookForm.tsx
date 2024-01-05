import React, { useRef, useState } from 'react';
import Button from 'src/components/Button';
// import user_icon from '../../assets/img/user.png';
import { useQuery } from '@tanstack/react-query';
import { FileDrop } from 'react-file-drop';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { bookApi } from 'src/apis/book.api';
import genresOptions from 'src/assets/json/genres.json';
import languagesOptions from 'src/assets/json/lang.json';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useBook from 'src/hooks/useBook';
import { CreateBookDto } from 'src/types/create-book.dto';
import submit_img from '../../assets/img/submit.png';
import upload_img from '../../assets/img/upload-img.png';

interface Props {
  id?: string;
  onToggle?: () => void;
}

// eslint-disable-next-line no-empty-pattern
function AddBookForm({ onToggle }: Props) {
  const { id } = useParams();
  console.log(id);

  const fileInputRef = useRef<File | null>(null);

  const [file, setFile] = useState<File | null>(null); // array of currently uploaded files

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const [book, setBook] = useState<CreateBookDto>({
    nameBook: '',
    pages: 0,
    genres: [],
    language: '',
    author: '',
    publicationYear: 0,
    publisher: '',
    price: '',
    description: '',
    numberOfBooks: 0
  });

  const { data: bookData, isLoading: isBookLoading } = useQuery({
    queryKey: ['book', { id }],
    queryFn: () => {
      return bookApi.getBook(id || '');
    },
    enabled: id !== undefined,
    staleTime: 0,
    onSuccess: data => {
      const book = data.data.data.doc;
      const genres = book.genres.map(genre => ({ value: genre, label: genre }));
      const language = { value: book.language, label: book.language };
      setSelectedGenres(genres);
      setSelectedLanguage(language);

      setBook({
        nameBook: book.nameBook,
        pages: book.pages,
        genres: book.genres,
        language: book.language,
        author: book.author,
        publicationYear: book.publicationYear,
        publisher: book.publisher,
        price: book.price,
        description: book.description,
        numberOfBooks: book.numberOfBooks
      });
      console.log(data);
    }
  });

  const onFileDrop = (files, event) => {
    setFile(files[0]);
    // do something with your files...
  };
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    setFile(files[0]);
    // do something with your files...
  };
  const onTargetClick = () => {
    fileInputRef?.current.click();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const {
    createBookMutation,
    createBookImageMutation,
    updateBookImageMutation,
    updateBookMutation
  } = useBook();

  const handleGenreChange = (newValue: any) => {
    setSelectedGenres(newValue);
    setBook(prevBook => ({ ...prevBook, genres: newValue.map(genre => genre.value) }));
  };

  const handleLanguageChange = (newValue: any) => {
    setSelectedLanguage(newValue);
    setBook(prevBook => ({ ...prevBook, language: newValue.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file === null && !id) {
      toast.error('Please upload book image!', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    console.log('Submitted book:', book);
    if (id) {
      updateBookMutation.mutate(
        { id, book },
        {
          onSuccess: data => {
            if (file) {
              updateBookImageMutation.mutate({ id, image: file });
            } else {
              toast.success('Update book successfully!');
            }
          },
          onError: error => {
            toast.error(error.response.data.message);
          }
        }
      );
      return;
    }
    createBookMutation.mutate(book, {
      onSuccess: data => {
        setBook({
          nameBook: '',
          pages: 0,
          genres: [],
          language: '',
          author: '',
          publicationYear: 0,
          publisher: '',
          price: '',
          description: '',
          numberOfBooks: 0
        });
        setSelectedGenres([]);
        setSelectedLanguage([]);
        createBookImageMutation.mutate({ id: data.data.data.doc._id, image: file });
      },
      onError: error => {
        toast.error(error.response.data.message);
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col '>
      <div id='horizontal-header' className='flex items-center relative mt-5 mb-4'>
        <h2 className='font-bold text-xl'>{id ? 'Update Book' : 'Add Book'}</h2>
      </div>
      <div className='flex flex-col gap-y-5 lg:flex-row gap-x-20'>
        <div className='flex flex-col items-center mr-3 shrink-0'>
          <FileDrop
            className='text-center h-48 mb-4 lg:h-96 cursor-pointer'
            onTargetClick={onTargetClick}
            draggingOverFrameClassName='bg-gray-200 scale-110 border-primary2'
            draggingOverTargetClassName='bg-primary2/20 scale-110 border-primary2'
            onDrop={onFileDrop}
          >
            {file === null ? (
              <>
                {bookData?.data.data.doc.photoUrls[0] ? (
                  <img
                    src={bookData?.data.data.doc.photoUrls[0]}
                    alt='Uploaded File'
                    className='h-48 mb-4 w-32 lg:w-64 lg:h-96'
                  />
                ) : (
                  <img className='text-center h-48 mb-4 lg:h-96' alt='upload' src={upload_img} />
                )}
              </>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt='Uploaded File'
                className='h-48 mb-4 w-32 lg:w-64 lg:h-96'
              />
            )}
          </FileDrop>
          <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            accept='image/png, image/gif, image/jpeg'
            type='file'
            className='hidden'
          />
          {createBookMutation.isLoading ||
            (updateBookImageMutation.isLoading ? (
              <LoadingIndicator />
            ) : (
              <Button
                label={id ? 'Update' : 'Submit'}
                icon={submit_img}
                bg_color='#ffffff'
                color='#4BB543'
                border_color='#4bb543'
                onclick={onToggle}
              />
            ))}
        </div>
        <div className='grow flex flex-col gap-2'>
          <div className='flex flex-col gap-y-5 lg:flex-row'>
            <div className='w-30 lg:w-72 lg:mr-11'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-title'
              >
                Book title
              </label>
              <input
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                name='nameBook'
                required
                value={book.nameBook}
                onChange={handleInputChange}
                id='name_book'
                placeholder='Enter book title'
              />
            </div>
            <div className='w-30 lg:w-72'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-publisher'
              >
                Book publisher
              </label>
              <input
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='book-publisher'
                required
                name='publisher'
                value={book.publisher}
                onChange={handleInputChange}
                placeholder='Enter book publisher'
              />
            </div>
          </div>
          <div className='flex flex-col gap-y-5 lg:flex-row'>
            <div className='w-30 lg:w-72 lg:mr-11'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-author'
              >
                Book author
              </label>
              <input
                type='text'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                name='author'
                value={book.author}
                required
                onChange={handleInputChange}
                id='book-author'
                placeholder='Enter book author'
              />
            </div>
            <div className='w-30 lg:w-72 lg:mr-11'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-author'
              >
                Language
              </label>
              <Select
                classNames={{
                  control: state => 'p-0.5'
                }}
                required
                name='language'
                value={selectedLanguage}
                onChange={handleLanguageChange}
                options={languagesOptions}
                classNamePrefix='select'
              />
            </div>
          </div>
          <div className='flex flex-col gap-y-5 lg:flex-row '>
            <div className='w-30 lg:w-72  lg:mr-11'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-order-list'
              >
                Description
              </label>
              <textarea
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1 h-64'
                id='book-description'
                name='description'
                required
                value={book.description}
                onChange={handleInputChange}
              />
            </div>
            <div className='w-30 lg:w-72'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-order-list'
              >
                Genres
              </label>
              <Select
                isMulti
                name='colors'
                required
                value={selectedGenres}
                onChange={handleGenreChange}
                options={genresOptions}
                className='basic-multi-select'
                classNamePrefix='select'
              />
            </div>
          </div>
          <div className='flex flex-col gap-y-5 lg:flex-row '>
            <div className='w-30 lg:w-72  lg:mr-11'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-published-date'
              >
                Published year
              </label>
              <input
                type='number'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                name='publicationYear'
                value={book.publicationYear}
                onChange={handleInputChange}
                id='book-published-year'
                placeholder='Year'
                min={1900}
                max={new Date().getFullYear()}
              />
            </div>
            <div className='w-30 lg:w-72  lg:mr-11'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-pages'
              >
                Number of pages
              </label>
              <input
                type='number'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                name='pages'
                value={book.pages}
                onChange={handleInputChange}
                id='book-published-year'
                placeholder='Year'
                min={0}
              />
            </div>
          </div>
          <div className='flex-col sm:flex-row inline-flex gap-x-10'>
            <div className='w-30 lg:w-72 mt-5'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-num'
              >
                Quantity
              </label>
              <input
                type='number'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='book-num'
                name='numberOfBooks'
                value={book.numberOfBooks}
                onChange={handleInputChange}
                min={1}
                placeholder='Enter number of books'
              />
            </div>
            <div className='w-30 lg:w-72 mt-5'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='book-price'
              >
                Price
              </label>
              <input
                type='number'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='member_id'
                name='price'
                step={0.01}
                value={book.price}
                onChange={handleInputChange}
                min={1}
                placeholder='Enter book price'
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddBookForm;
