import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import { URL_USERS, URL_USERS_ME } from 'src/constants/endpoint';
import { User, UserInfo } from 'src/types/user.type';

export const userApi = {
  getAllUser() {
    return http.get<
      SuccessResponse<{
        doc: User[];
      }>
    >(URL_USERS);
  },
  getCurrentUserInformation(params?: any) {
    return http.get<
      SuccessResponse<{
        doc: UserInfo[];
      }>
    >(URL_USERS_ME, { params });
  }
};
