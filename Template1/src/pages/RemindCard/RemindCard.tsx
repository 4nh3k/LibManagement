import Table from 'src/components/Table/Table';

interface Props {
  onToggle?: () => void;
}

const RemindCard: React.FC<Props> = ({ onToggle }) => {
  const headers = [
    { title: 'Remind Card ID', dataIndex: 'remindCardID' },
    { title: 'Admin ID', dataIndex: 'adminID' },
    { title: 'Action', dataIndex: 'action' }
  ];

  const data = [
    {
      remindCardID: '#20462',
      adminID: 'Hat',
      action: ''
    },
  ];

  return (
    <div id='body' className='mt-5 mr-20'>
      <span className='text-xl font-bold'>Borrow Card List</span>
      <Table headers={headers} data={data} onToggle={onToggle}></Table>
    </div>
  );
};

export default RemindCard;
