import { useQuery } from '@tanstack/react-query';
import { userApi } from 'src/apis/user.api';

export function useUser() {
  const getAllUserQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => userApi.getAllUser(),
    select: data => {
      return data.data.data.doc.map((item: User) => {
        return {
          value: item._id,
          label: item.email
        };
      });
    }
  });

  return {
    getAllUserQuery
  };
}
