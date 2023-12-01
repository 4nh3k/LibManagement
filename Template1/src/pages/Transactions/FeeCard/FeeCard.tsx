import Table from 'src/components/Table/Table';

interface Props {
  onToggle?: () => void;
}

const FeeCard: React.FC<Props> = ({ onToggle }) => {
  const headers = [
    { title: 'Borrow Card ID', dataIndex: 'borrowCardID' },
    { title: 'Admin ID', dataIndex: 'adminID' },
    { title: 'Overtime book', dataIndex: 'overtimeBook' },
    { title: 'Overtime day', dataIndex: 'overtimeDay' },
    { title: 'Fee Charge', dataIndex: 'feeCharge' },
    { title: 'Action', dataIndex: 'action' }
  ];

  const data = [
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      overtimeBook: '5',
      overtimeDay: '2',
      feeCharge: '10,000đ',
      action: ''
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      overtimeBook: '5',
      overtimeDay: '2',
      feeCharge: '10,000đ',
      action: ''
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      overtimeBook: '5',
      overtimeDay: '2',
      feeCharge: '10,000đ',
      action: ''
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      overtimeBook: '5',
      overtimeDay: '2',
      feeCharge: '10,000đ',
      action: ''
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      overtimeBook: '5',
      overtimeDay: '2',
      feeCharge: '10,000đ',
      action: ''
    },
    {
      borrowCardID: '#20462',
      adminID: 'Hat',
      overtimeBook: '5',
      overtimeDay: '2',
      feeCharge: '10,000đ',
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

export default FeeCard;
