import Table from 'src/components/Table/Table';
import useBorrowCard from 'src/hooks/useBorrowCard';

interface BorrowCardProps {
  onToggle?: () => void;
}

const BorrowCard: React.FC<BorrowCardProps> = ({ onToggle }) => {
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

  if (isLoading) return <div>Loading...</div>;

  const sortedBorrowCardData = BorrowCardData.sort((a, b) => {
    const dateA = new Date(a.borrowDate.split('/').reverse().join('-'));
    const dateB = new Date(b.borrowDate.split('/').reverse().join('-'));

    return dateB - dateA;
  });

  const handleDelete = (row: any) => {
    console.log(row);
    deleteBorrowCardMutation.mutate(row.borrowCardId);
  };

  return (
    <div id='body' className='mt-5 m-3 lg:mr-20'>
      <Table
        headers={headers}
        data={sortedBorrowCardData}
        onToggle={onToggle}
        searchBy={searchBy}
        deleteAction={handleDelete}
      />
    </div>
  );
};

export default BorrowCard;
