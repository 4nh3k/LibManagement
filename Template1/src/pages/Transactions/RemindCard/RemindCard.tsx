import Table from 'src/components/Table/Table';

interface Props {
  onToggle?: () => void;
}

const RemindCard: React.FC<Props> = ({ onToggle }) => {
  const headers = [
    { title: 'Remind Card ID', dataIndex: 'remindCardID' },
    { title: 'Violate time', dataIndex: 'violateTime' },
    { title: 'Action', dataIndex: 'action' }
  ];

  const data = [
    {
      remindCardID: '#20462',
      violateTime: '1',
      action: ''
    }
  ];

  return (
    <div id='body' className='mt-5 m-3 lg:mr-20'>
      <span className='text-xl font-bold'>Remind Card List</span>
      <Table headers={headers} data={data} onToggle={onToggle} onAdd={true}></Table>
    </div>
  );
};

export default RemindCard;
