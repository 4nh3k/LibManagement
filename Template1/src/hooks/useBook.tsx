import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { bookApi } from 'src/apis/book.api';
import Book from 'src/types/book.type';
import { CreateBookDto } from 'src/types/create-book.dto';

const useBook = () => {
  const createBookMutation = useMutation({
    mutationFn: (body: CreateBookDto) => bookApi.createBook(body)
  });

  const deleteBookMutation = useMutation({
    mutationFn: (id: string) => bookApi.deleteBook(id),
    onSuccess: data => {
      toast.success('Delete book successfully!');
      getAllBooksQuery.refetch();
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error(error.respone.data.message);
    }
  });

  const getAllBooksQuery = useQuery({
    queryKey: ['books'],
    queryFn: ({ signal }) => {
      return bookApi.getAllBooks('' || undefined, signal);
    }
  });

  const updateBookMutation = useMutation({
    mutationFn: (data: { id: string; book: Book }) => bookApi.updateBook(data.id, data.book),
    onSuccess: data => {
      getAllBooksQuery.refetch();
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error(error.respone.data.message);
    }
  });

  const createBookImageMutation = useMutation({
    mutationFn: (data: { id: string; image: File }) => bookApi.updateImageBook(data),
    onSuccess: data => {
      toast.success('Create book successfully!');
      getAllBooksQuery.refetch();
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error(error.respone.data.message);
    }
  });

  const updateBookImageMutation = useMutation({
    mutationFn: (data: { id: string; image: File }) => bookApi.updateImageBook(data),
    onSuccess: data => {
      toast.success('Update book image successfully!');
      getAllBooksQuery.refetch();
      console.log(data);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error(error.respone.data.message);
    }
  });

  return {
    createBookMutation,
    createBookImageMutation,
    updateBookImageMutation,
    updateBookMutation,
    deleteBookMutation,
    getAllBooksQuery
  };
};

export default useBook;
