import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchBook = (bookId: string) => {
  return axios.get(`http://localhost:3001/api/v1/books/${bookId}`);
};

export const useBookDetails = (bookId: string) => {
  return useQuery(['book-details', bookId], () => fetchBook(bookId), {
    select(data) {
      return data.data.data.doc;
    }
  });
};
