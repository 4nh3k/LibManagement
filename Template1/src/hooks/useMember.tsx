import { useMutation, useQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { memberApi } from 'src/apis/member.api';
import { useAppContext } from 'src/contexts/app.contexts';
import Member from 'src/types/readerMember.type';
import { SuccessResponse } from 'src/types/utils.type';

const useMember = () => {
  const getMemberQuery = useQuery({
    queryKey: ['readers'],
    queryFn: () => memberApi.getAllMembers()
  });
  const { refetch } = getMemberQuery;
  const { profile } = useAppContext();

  const getUserMemberCardQuery = useQuery({
    queryKey: ['userReaders', profile?._id],
    queryFn: () => memberApi.getUserMember(profile?._id ?? ''),
    select: data => data?.data.data.doc[0],
    enabled: false
  });

  const createMemberMutation = useMutation({
    mutationKey: ['createMember'],
    mutationFn: (data: CreateMemberDto) => memberApi.createMember(data),
    onSuccess: data => {
      toast.success('Create member successfully');
      refetch();
    },
    onError: error => {
      toast.error(error.response.data.message);
    }
  });

  const updateMemberMutation = useMutation<
    AxiosResponse<
      SuccessResponse<{
        doc: Member;
      }>,
      any
    >,
    Error,
    {
      id: string;
      data: Partial<CreateMemberDto>;
    }
  >({
    mutationKey: ['updateMember'],
    mutationFn: (props: { id: string; data: Partial<CreateMemberDto> }) =>
      memberApi.updateMember(props.id, props.data),
    onSuccess: data => {
      toast.success('Update member successfully');
      refetch();
    },
    onError: error => {
      toast.error(error.response.data.message);
    }
  });

  const deleteMemberMutation = useMutation<AxiosResponse<any, any>, Error, string>(
    ['deleteMember'],
    (userId: string) => memberApi.deleteMember(userId),
    {
      onSuccess: () => {
        toast.success('Delete member successfully');
        refetch();
      },
      onError: error => {
        toast.error(error.response.data.message);
      }
    }
  );

  return {
    getMemberQuery,
    getUserMemberCardQuery,
    createMemberMutation,
    updateMemberMutation,
    deleteMemberMutation
  };
};

export default useMember;
