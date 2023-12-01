import Table from 'src/components/Table/Table';

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

  const data = [
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      readerID: 'Matt Dickerson',
      date: '13/05/2022',
      status: 'delivered',
      action: ''
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      readerID: 'Matt Dickerson',
      date: '13/05/2022',
      status: 'delivered',
      action: []
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      readerID: 'Matt Dickerson',
      date: '13/05/2022',
      status: 'delivered',
      action: ''
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      readerID: 'Matt Dickerson',
      date: '13/05/2022',
      status: 'delivered',
      action: ''
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      readerID: 'Matt Dickerson',
      date: '13/05/2022',
      status: 'delivered',
      action: ''
    }
  ];

  return (
    <div id='body' className='mt-5 m-3 lg:mr-20'>
      <span className='text-xl font-bold'>Borrow Card List</span>
      <Table headers={headers} data={data} onToggle={onToggle}></Table>
    </div>
  );
};

export default BorrowCard;
