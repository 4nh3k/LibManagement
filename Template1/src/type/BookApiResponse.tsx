import Book from './Book';

export default interface BookApiResponse {
  status: string;
  data: {
    doc: Book;
  };
}
