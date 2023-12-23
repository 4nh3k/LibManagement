import { URL_BORROW_CARD } from 'src/constants/endpoint';
import { BorrowCardType } from 'src/types/borrow-card.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const borrowCardApi = {
  getAllBorrowCard(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: BorrowCardType[];
      }>
    >(URL_BORROW_CARD, { params });
  }
};
