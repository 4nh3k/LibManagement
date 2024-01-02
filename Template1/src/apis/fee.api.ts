import { URL_FEE } from 'src/constants/endpoint';
import Fee from 'src/types/fee.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const feeApi = {
  getAllFeeCard(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: Fee[];
      }>
    >(URL_FEE, { params });
  },
};
