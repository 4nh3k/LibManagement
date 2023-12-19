import Book from 'src/types/book.type';
import CreateBookDto from 'src/types/create-book.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const bookApi = {
  getAllBooks() {
    return http.get<
      SuccessResponse<{
        doc: Book[];
      }>
    >('/api/v1/books');
  },
  getBook(id: string) {
    return http.get<SuccessResponse<{ doc: Book }>>(`/api/v1/books/${id}`);
  },
  createBook(book: CreateBookDto) {
    return http.post<SuccessResponse<{ doc: Book }>>('/api/v1/books', book);
  },
  updateImageBook(id: string, image: File) {
    const formData = new FormData();
    formData.append('photos', image);
    return http.put<SuccessResponse<{ doc: Book }>>(`/api/v1/books/${id}/image`, formData);
  }
};
