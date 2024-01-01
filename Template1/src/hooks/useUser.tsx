import { useQuery } from '@tanstack/react-query';
import { userApi } from 'src/apis/user.api';
import { User } from 'src/types/user.type';

export function useUser() {
  const getAllUserQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => userApi.getAllUser(),
    select: data => {
      return data.data.data.doc.map((item: User) => {
        return {
          value: item._id,
          label: item.email,
          fullName: item.firstName + ' ' + item.lastName
        };
      });
    }
  });
  return {
    getAllUserQuery
  };
}
