import { URL_RETURN_CARD } from 'src/constants/endpoint';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const returnCardApi = {
  getAllReturnCard(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: ReturnCard[];
      }>
    >(URL_RETURN_CARD, { params });
  }
};
