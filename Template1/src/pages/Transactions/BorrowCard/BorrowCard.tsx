import Table from 'src/components/Table/Table';
import { borrowCardApi } from 'src/apis/borrow-card.api';
import { useQuery } from '@tanstack/react-query';
import { BorrowCardType } from 'src/types/borrow-card.type';

interface BorrowCardProps {
  onToggle?: () => void;
}

const BorrowCard: React.FC<BorrowCardProps> = ({ onToggle }) => {
  const headers = [
    { title: 'Borrow Card ID', dataIndex: 'borrowCardID' },
    { title: 'Admin ID', dataIndex: 'adminID' },
    { title: 'Reader ID', dataIndex: 'readerID' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Action', dataIndex: 'action' }
  ];

  const { data: BorrowCardData, isLoading } = useQuery({
    queryKey: ['BorrowCardType'],
    queryFn: () => borrowCardApi.getAllBorrowCard(),
    select: data => {
      return data.data.data.doc.map((item: BorrowCardType) => {
        return {
          borrowCardId: item._id,
          borrower: item.borrower.fullName ? item.borrower.fullName : ""  ,
          borrowDate: new Date(item.borrowDate).toLocaleDateString('en-GB'),
          expectedReturnDate: new Date(item.expectedReturnDate).toLocaleDateString('en-GB'),
          isReturned: item.isReturned ? 'Returned' : 'Not returned'
        };
      });
    }
  });

  if (isLoading) return <div>Loading...</div>;
  console.log(BorrowCardData);

  return (
    <div id='body' className='mt-5 m-3 lg:mr-20'>
      <span className='text-xl font-bold'>Borrow Card List</span>
      <Table headers={headers} data={BorrowCardData} onToggle={onToggle}></Table>
    </div>
  );
};

export default BorrowCard;
