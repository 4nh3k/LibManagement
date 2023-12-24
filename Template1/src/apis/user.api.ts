import { URL_USER } from 'src/constants/endpoint';
import { UserInfo } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const userInfoApi = {
  getCurrentUserInformation(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: UserInfo[];
      }>
    >(URL_USER, { params });
  }
};