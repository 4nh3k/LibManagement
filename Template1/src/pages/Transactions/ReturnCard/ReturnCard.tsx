import Table from 'src/components/Table/Table';
import useReturnCard from 'src/hooks/useReturnCard';

interface ReturnCardProps {
  onToggle?: () => void;
}

const ReturnCard: React.FC<ReturnCardProps> = ({ onToggle }) => {
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

  if (isLoading) return <div>Loading...</div>;
  console.log(ReturnCardData);

  return (
    <div>
      <div id='body' className='mt-5 m-3 lg:mr-20'>
        <span className='text-xl font-bold'>Return Card List</span>
        <Table headers={headers} data={ReturnCardData} onToggle={onToggle} searchBy={searchBy} />
      </div>
    </div>
  );
};

export default ReturnCard;
