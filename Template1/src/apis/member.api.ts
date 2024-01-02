import { URL_READERS } from 'src/constants/endpoint';
import Member from 'src/types/readerMember.type';
import { SuccessResponse } from 'src/types/utils.type';
import { Validation } from 'src/types/validation.type';
import http from 'src/utils/http';

export const memberApi = {
  getAllMembers() {
    return http.get<
      SuccessResponse<{
        doc: Member[];
      }>
    >(URL_READERS);
  },
  getUserMember(id: string) {
    return http.get<SuccessResponse<{ doc: Member[] }>>(`${URL_READERS}?user=${id}`);
  },
  createMember(data: CreateMemberDto) {
    return http.post<
      SuccessResponse<{
        doc: Member;
      }>
    >(URL_READERS, data);
  },
  updateMember(id: string, data: Partial<CreateMemberDto>) {
    return http.patch<
      SuccessResponse<{
        doc: Member;
      }>
    >(`${URL_READERS}/${id}`, data);
  },
  deleteMember(id: string) {
    return http.delete(`${URL_READERS}/${id}`);
  },
  getValidation() {
    return http.get<{ validation: Validation }>(`api/v1/validation`);
  },
  updateValidation(data: Validation) {
    return http.post<{ validation: Validation }>(`api/v1/validation`, data);
  }
};
