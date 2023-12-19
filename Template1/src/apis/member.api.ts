import Member from 'src/types/readerMember.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const memberApi = {
  getAllMembers() {
    return http.get<
      SuccessResponse<{
        doc: Member[];
      }>
    >('/api/v1/readers');
  }
};
