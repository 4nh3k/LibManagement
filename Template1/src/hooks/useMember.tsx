import { useMutation, useQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { memberApi } from 'src/apis/member.api';
import Member from 'src/types/readerMember.type';
import { SuccessResponse } from 'src/types/utils.type';

const useMember = () => {
  const getMemberQuery = useQuery({
    queryKey: ['readers'],
    queryFn: () => memberApi.getAllMembers()
  });
  const { refetch } = getMemberQuery;

  const createMemberMutation = useMutation({
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

  return { getMemberQuery, createMemberMutation, updateMemberMutation, deleteMemberMutation };
};

export default useMember;
