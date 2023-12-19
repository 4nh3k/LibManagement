import { BorrowCard } from 'src/types/borrow-card.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const borrowCardApi = {
  getAllBorrowCard() {
    return http.get<
      SuccessResponse<{
        doc: BorrowCard[];
      }>
    >('/api/v1/borrow-book-forms');
  }
};
