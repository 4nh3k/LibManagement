import { useQuery } from '@tanstack/react-query';
import { returnCardApi } from 'src/apis/return-form.api';
import Table from 'src/components/Table/Table';
import { useAppContext } from 'src/contexts/app.contexts';
import useReturnCard from 'src/hooks/useReturnCard';
import { shortenID } from 'src/utils/utils';

interface ReturnCardProps {
  onToggle?: () => void;
  memberId?: string;
}

const ReturnCardPage: React.FC<ReturnCardProps> = ({ onToggle, memberId }: ReturnCardProps) => {
  const headers = [
    { title: 'Return Card ID', dataIndex: 'returnCardId' },
    { title: 'Borrower', dataIndex: 'username' },
    { title: 'Expired Date', dataIndex: 'expectedReturnDate' },
    { title: 'Return Date', dataIndex: 'returnDate' },
    { title: 'Lost Book', dataIndex: 'lostBook' },
    { title: 'Fee', dataIndex: 'fee' }
  ];
  const searchBy = [
    { label: 'Borrower', dataIndex: 'username' },
    { label: 'Return Card ID', dataIndex: 'returnCardId' }
  ];

  const { getAllReturnCardQuery } = useReturnCard();

  const { data: ReturnCardData, isLoading } = getAllReturnCardQuery;
  const { profile } = useAppContext();
  const isAdmin = profile?.role === 'admin';

  const getUserReturnCardQuery = useQuery({
    queryKey: ['UserReturnCardType', memberId],
    queryFn: () => returnCardApi.getAllReturnCard({ borrower: memberId }),
    enabled: false,
    select: data => {
      return data.data.data.doc.map((item: ReturnCard) => {
        const totalAmount = item.lostBooks.reduce((acc, cur) => acc + cur.quantity, 0);
        return {
          returnCardId: shortenID(item._id),
          _id: item._id,
          username: item.borrower != null ? item.borrower.fullName : 'N/A',
          expectedReturnDate: new Date(item.expectedReturnDate ?? '').toLocaleDateString('en-GB'),
          returnDate: new Date(item.returnDate).toLocaleDateString('en-GB'),
          lostBook: totalAmount,
          fee: item.fee
        };
      });
    }
  });
  const { data: UserReturnCardData, isLoading: isUserReturnCardLoading } = getUserReturnCardQuery;

  if (isAdmin) getAllReturnCardQuery.refetch();
  else getUserReturnCardQuery.refetch();

  if (isAdmin && isLoading) return <div>Loading...</div>;
  if (!isAdmin && isUserReturnCardLoading) return <div>Loading...</div>;
  console.log(ReturnCardData);

  return (
    <div>
      <div id='body' className='mt-5 m-3 lg:mr-20'>
        <Table
          headers={headers}
          onAdd={isAdmin}
          data={isAdmin ? ReturnCardData : UserReturnCardData}
          onToggle={onToggle}
          searchBy={searchBy}
        />
      </div>
    </div>
  );
};

export default ReturnCardPage;
