import { URL_BORROW_CARD, URL_RETURN_CARD } from 'src/constants/endpoint';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import ReturnCardDto from './../types/return-card.dto';

export const returnCardApi = {
  getAllReturnCard(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: ReturnCard[];
      }>
    >(URL_RETURN_CARD, { params });
  },
  createReturnCard(borrowCardId: string, data: ReturnCardDto) {
    return http.post<SuccessResponse<ReturnCard>>(
      `${URL_BORROW_CARD}/${borrowCardId}/return-book-forms`,
      data
    );
  }
};
