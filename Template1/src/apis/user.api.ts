import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import { URL_USERS } from 'src/constants/endpoint';
import { User } from 'src/types/user.type';

export const userApi = {
  getAllUser() {
    return http.get<
      SuccessResponse<{
        doc: User[];
      }>
    >(URL_USERS);
  }
};

export const userInfoApi = {
  getCurrentUserInformation(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: UserInfo[];
      }>
    >(URL_USER, { params });
  }
};
