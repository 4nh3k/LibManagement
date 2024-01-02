import { useQuery } from '@tanstack/react-query';
import { borrowCardApi } from 'src/apis/borrow-card.api';
import Table from 'src/components/Table/Table';
import { useAppContext } from 'src/contexts/app.contexts';
import useBorrowCard from 'src/hooks/useBorrowCard';
import { BorrowCardType } from 'src/types/borrow-card.type';
import { shortenID } from 'src/utils/utils';

interface BorrowCardProps {
  onToggle?: () => void;
  memberId?: string;
}

const BorrowCard: React.FC<BorrowCardProps> = ({ onToggle, memberId }: BorrowCardProps) => {
  const headers = [
    { title: 'Borrow Card ID', dataIndex: 'borrowCardId' },
    { title: 'Borrower', dataIndex: 'borrower' },
    { title: 'Borrow Date', dataIndex: 'borrowDate' },
    { title: 'Expected Return Date', dataIndex: 'expectedReturnDate' },
    { title: 'Status', dataIndex: 'isReturned' },
    { title: 'Action', dataIndex: 'action' }
  ];
  const searchBy = [
    { label: 'Borrower', dataIndex: 'borrower' },
    { label: 'Borrow Card ID', dataIndex: 'borrowCardId' },
    { label: 'Borrow Date', dataIndex: 'borrowDate' },
    { label: 'Expected Return Date', dataIndex: 'expectedReturnDate' },
    { label: 'Status', dataIndex: 'isReturned' }
  ];
  const { getAllBorrowCardQuery, deleteBorrowCardMutation } = useBorrowCard();
  const { data: BorrowCardData, isLoading } = getAllBorrowCardQuery;
  const { profile } = useAppContext();

  const getUserBorrowCardQuery = useQuery({
    queryKey: ['UserBorrowCardType', memberId],
    queryFn: () => borrowCardApi.getAllBorrowCard({ borrower: memberId }),
    enabled: false,
    select: data => {
      return data.data.data.doc.map((item: BorrowCardType) => {
        return {
          borrowCardId: shortenID(item._id),
          _id: item._id,
          borrower: item.borrower != null ? item.borrower.fullName : 'N/A',
          borrowDate: new Date(item.borrowDate).toLocaleDateString('en-GB'),
          expectedReturnDate: new Date(item.expectedReturnDate).toLocaleDateString('en-GB'),
          isReturned: item.isReturned ? 'Returned' : 'Borrowing'
        };
      });
    }
  });
  const { data: UserBorrowCardData, isLoading: isUserBorrowCardLoading } = getUserBorrowCardQuery;

  const isAdmin = profile?.role === 'admin';
  if (isAdmin) getAllBorrowCardQuery.refetch();
  else getUserBorrowCardQuery.refetch();

  if (isAdmin && isLoading) return <div>Loading...</div>;
  if (!isAdmin && isUserBorrowCardLoading) return <div>Loading...</div>;

  console.log(UserBorrowCardData);
  const sortingData = isAdmin ? BorrowCardData : UserBorrowCardData;
  const sortedBorrowCardData = sortingData.sort((a, b) => {
    const dateA = new Date(a.borrowDate.split('/').reverse().join('-'));
    const dateB = new Date(b.borrowDate.split('/').reverse().join('-'));

    return dateB - dateA;
  });

  const handleDelete = (row: any) => {
    console.log(row);
    deleteBorrowCardMutation.mutate(row._id);
  };

  return (
    <div id='body' className='mt-5 m-3 lg:mr-20'>
      <Table
        headers={headers}
        data={sortedBorrowCardData}
        onToggle={onToggle}
        searchBy={searchBy}
        deleteAction={handleDelete}
        editAction={() => {
          console.log('edit');
        }}
      />
    </div>
  );
};

export default BorrowCard;
