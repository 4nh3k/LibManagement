export interface BorrowCard {
  _id: string;
  books: {
    bookId: string;
    quantity: number;
    _id: string;
  }[];
  borrower: {
    _id: string;
    fullName: string;
  };
  expectedReturnDate: string;
  isReturned: boolean;
  borrowDate: string;
}
