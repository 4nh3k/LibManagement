import { URL_BOOKS } from 'src/constants/endpoint';
import Book from 'src/types/book.type';
import { CreateBookDto } from 'src/types/create-book.dto';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const bookApi = {
  getAllBooks(keyword?: string, signal?: AbortSignal) {
    return http.get<
      SuccessResponse<{
        doc: Book[];
      }>
    >(URL_BOOKS, {
      params: {
        q: keyword
      },
      signal
    });
  },
  getBook(id: string) {
    return http.get<SuccessResponse<{ doc: Book }>>(`${URL_BOOKS}/${id}`);
  },
  createBook(book: CreateBookDto) {
    return http.post<SuccessResponse<{ doc: Book }>>(URL_BOOKS, book);
  },
  deleteBook(id: string) {
    return http.delete<SuccessResponse<{ doc: Book }>>(`${URL_BOOKS}/${id}`);
  },
  updateBook(id: string, book: CreateBookDto) {
    return http.patch<SuccessResponse<{ doc: Book }>>(`${URL_BOOKS}/${id}`, book);
  },
  updateImageBook(data: { id: string; image: File }) {
    const formData = new FormData();
    console.log(data.image.name);
    formData.append('photos', data.image);
    console.log(formData.get('photos'));
    return http.patch<SuccessResponse<{ doc: Book }>>(`${URL_BOOKS}/${data.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
