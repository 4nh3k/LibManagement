import Book from 'src/types/book.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const bookApi = {
  getAllBooks() {
    return http.get<
      SuccessResponse<{
        doc: Book[];
      }>
    >('/api/v1/books');
  }
};
