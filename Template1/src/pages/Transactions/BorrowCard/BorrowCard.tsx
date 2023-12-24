import Table from 'src/components/Table/Table';
import { borrowCardApi } from 'src/apis/borrow-card.api';
import { useQuery } from '@tanstack/react-query';
import { BorrowCardType } from 'src/types/borrow-card.type';
import useBorrowCard from 'src/hooks/useBorrowCard';

interface BorrowCardProps {
  onToggle?: () => void;
}

const BorrowCard: React.FC<BorrowCardProps> = ({ onToggle }) => {
  const headers = [
    { title: 'Borrower', dataIndex: 'borrower' },
    { title: 'Borrow Card ID', dataIndex: 'borrowCardId' },
    { title: 'Borrow Date', dataIndex: 'borrowDate' },
    { title: 'Expected Return Date', dataIndex: 'expectedReturnDate' },
    { title: 'Status', dataIndex: 'isReturned' },
    { title: 'Action', dataIndex: 'action' }
  ];
  const { getAllBorrowCardQuery } = useBorrowCard();
  const { data: BorrowCardData, isLoading } = getAllBorrowCardQuery;

  if (isLoading) return <div>Loading...</div>;
  console.log(BorrowCardData);
  const sortedBorrowCardData = BorrowCardData.sort((a, b) => {
    const dateA = new Date(a.borrowDate.split('/').reverse().join('-'));
    const dateB = new Date(b.borrowDate.split('/').reverse().join('-'));

    return dateB - dateA;
  });
  return (
    <div id='body' className='mt-5 m-3 lg:mr-20'>
      <span className='text-xl font-bold'>Borrow Card List</span>
      <Table headers={headers} data={sortedBorrowCardData} onToggle={onToggle}></Table>
    </div>
  );
};

export default BorrowCard;
