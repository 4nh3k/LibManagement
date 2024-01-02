type ReturnCard = {
  _id: string;
  borrower: {
    _id: string;
    fullName: string;
  } | null;
  lostBooks: {
    bookId: {
      _id: string;
      nameBook: string;
      id: string;
    };
    quantity: number;
    _id: string;
  }[];
  borrowBookForm: {
    _id: string;
    borrower: {
      _id: string;
      fullName: string;
    };
    borrowDate: string;
  };
  fee: number;
  returnDate: string;
  __v?: number;
  expectedReturnDate?: string;
};
