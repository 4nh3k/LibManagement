type CreateBorrowCardDto = {
  books: {
    bookId: string;
    quantity: number;
  }[];
  borrower: string;
};
export default CreateBorrowCardDto;
