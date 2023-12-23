import Member from 'src/types/readerMember.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import { URL_READERS } from 'src/constants/endpoint';

export const memberApi = {
  getAllMembers() {
    return http.get<
      SuccessResponse<{
        doc: Member[];
      }>
    >(URL_READERS);
  }
};
