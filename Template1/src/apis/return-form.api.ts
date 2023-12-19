import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const returnCardApi = {
  getAllReturnCard(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: ReturnCard[];
      }>
    >('/api/v1/return-book-forms', { params });
  }
};
