import Member from 'src/types/readerMember.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import { URL_READERS } from 'src/constants/endpoint';
import { Validation } from 'src/types/validation.type';

export const memberApi = {
  getAllMembers() {
    return http.get<
      SuccessResponse<{
        doc: Member[];
      }>
    >(URL_READERS);
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
  }
};
