import React, { useRef, useState } from 'react';
import Button from 'src/components/Button';
// import user_icon from '../../assets/img/user.png';
import upload_img from '../../assets/img/upload-img.png';
import submit_img from '../../assets/img/submit.png';
import { FileDrop } from 'react-file-drop';
import { CreateBookDto } from 'src/types/create-book.dto';
import { useMutation } from '@tanstack/react-query';
import { bookApi } from 'src/apis/book.api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
interface Props {
  id?: string;
  onToggle?: () => void;
}

// eslint-disable-next-line no-empty-pattern
function AddBookForm({ onToggle }: Props) {
  const fileInputRef = useRef<File | null>(null);

  const [file, setFile] = useState<File | null>(null); // array of currently uploaded files

  const [book, setBook] = useState<CreateBookDto>({
    nameBook: '',
    typeBook: 'A',
    author: '',
    publicationYear: 0,
    publisher: '',
    price: '',
    description: '',
    numberOfBooks: 0
  });

  const onFileDrop = (files, event) => {
    console.log('onFileDrop!', files, event);
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
    console.log('onTargetClick');

    fileInputRef?.current.click();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const createBookMutation = useMutation({
    mutationFn: (body: CreateBookDto) => bookApi.createBook(body)
  });

  const updateImageBookMutation = useMutation({
    mutationFn: (data: { id: string; image: File }) => bookApi.updateImageBook(data),
    onSuccess: data => {
      toast.success('Create book successfully!');
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
    }
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file === null) {
      toast.error('Please upload book image!', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    console.log(file);
    console.log('Submitted book:', book);
    createBookMutation.mutate(book, {
      onSuccess: data => {
        updateImageBookMutation.mutate({ id: data.data.data.doc._id, image: file });
      }
      // onError: (error: AxiosError) => {
      //   console.log(error);
      //   toast.error(error.response.data.message);
      // }
    });
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col mb-10'>
      <div id='horizontal-header' className='flex items-center relative mt-5 mb-10'>
        <h2 className='font-bold text-xl'>Add book</h2>
      </div>
      <div className='flex flex-col gap-y-5 lg:flex-row gap-x-20'>
        <div className='flex flex-col items-center mr-3 shrink-0'>
          <FileDrop
            className='text-center h-48 mb-4 lg:h-96 cursor-pointer'
            onTargetClick={onTargetClick}
            draggingOverFrameClassName='bg-gray-200 scale-110 border-primary2'
            draggingOverTargetClassName='bg-primary2/20 scale-110 border-primary2'
            onFrameDragEnter={event => console.log('onFrameDragEnter', event)}
            onFrameDragLeave={event => console.log('onFrameDragLeave', event)}
            onFrameDrop={event => console.log('onFrameDrop', event)}
            onDragOver={event => console.log('onDragOver', event)}
            onDragLeave={event => console.log('onDragLeave', event)}
            onDrop={onFileDrop}
          >
            {file === null ? (
              <>
                <img className='text-center h-48 mb-4 lg:h-96' alt='upload' src={upload_img}></img>
              </>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt='Uploaded File'
                className='h-48 mb-4 h-96 w-64 lg:h-96'
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
          <Button
            label='Submit'
            icon={submit_img}
            bg_color='#ffffff'
            color='#4BB543'
            border_color='#4bb543'
            onclick={onToggle}
          />
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
                name='publisher'
                value={book.publisher}
                onChange={handleInputChange}
                placeholder='Enter book publisher'
              />
            </div>
          </div>

          <div className='w-30 lg:w-72'>
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
              onChange={handleInputChange}
              id='book-author'
              placeholder='Enter book author'
            />
          </div>

          <div className='w-30 lg:w-72'>
            <label
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              htmlFor='book-order-list'
            >
              Description
            </label>
            <div className=''>
              <textarea
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none focus:ring-1'
                id='book-description'
                name='description'
                value={book.description}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='w-30 lg:w-72 mt-5'>
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
                max={200}
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
