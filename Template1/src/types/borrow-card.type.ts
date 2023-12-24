export interface BorrowCardType {
  _id: string;
  books: {
    bookId: {
      _id: string;
      nameBook: string;
    };
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
