import { URL_UPDATE_ME, URL_USERS, URL_USERS_ME } from 'src/constants/endpoint';
import { User, UserInfo } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import { getProfileFromLS } from 'src/utils/auth';
import http from 'src/utils/http';

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
  },
  updateUserInformation(data: FormData) {
    const profile = getProfileFromLS();
    return http.patch<SuccessResponse<{ doc: UserInfo }>>(`${URL_UPDATE_ME}/${profile._id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getFinancialMe() {
    return http.get<{
      success: true;
      userFinancials: {
        _id: string;
        user: string;
        balance: number;
        totalDebt: number;
      };
    }>('/api/v1/user-financials/me');
  },
  topUpAccount(money: number) {
    return http.post<{
      session: {
        url: string;
      };
    }>(`/api/v1/users/top-up`, {
      money
    });
  },
  payDebt({
    balance,
    totalDebt,
    amountPaid
  }: {
    balance: number;
    totalDebt: number;
    amountPaid: number;
  }) {
    return http.post('/api/v1/fee-receipts', {
      balance,
      totalDebt,
      amountPaid
    });
  }
};
