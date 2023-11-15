import axios from 'axios';
import { useQuery } from 'react-query';

const fetchBook = (bookId: string) => {
  return axios.get(`https://book-library-management.onrender.com/api/v1/books/${bookId}`);
};

export const useBookDetails = (bookId: string) => {
  return useQuery(['book-details', bookId], () => fetchBook(bookId), {
    select(data) {
      return data.data.data.doc;
    }
  });
};
