import { URL_BORROW_CARD } from 'src/constants/endpoint';
import { BorrowCardType } from 'src/types/borrow-card.type';
import CreateBorrowCardDto from 'src/types/create-borrow-card.dto';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const borrowCardApi = {
  getAllBorrowCard(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: BorrowCardType[];
      }>
    >(URL_BORROW_CARD, { params });
  },
  createBorrowCard(data: CreateBorrowCardDto) {
    return http.post<SuccessResponse<BorrowCardType>>(URL_BORROW_CARD, data);
  }
};
