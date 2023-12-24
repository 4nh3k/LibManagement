type ReturnCard = {
  _id: string;
  borrower: {
    _id: string;
    fullName: string;
  };
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
    expectedReturnDate: string;
  };
  fee: number;
  returnDate: string;
};
