import Table from 'src/components/Table/Table';

interface ReturnCardProps {
  onToggle?: () => void;
}

const ReturnCard: React.FC<ReturnCardProps> = ({ onToggle }) => {
  const headers = [
    { title: 'Return Card ID', dataIndex: 'returnCardId' },
    { title: 'Admin ID', dataIndex: 'adminId' },
    { title: 'Action', dataIndex: 'action' }
  ];

  const data = [
    { returnCardId: 1, adminId: 1, action: 'Return' },
    { returnCardId: 2, adminId: 2, action: 'Return' },
    { returnCardId: 2, adminId: 2, action: 'Return' },
    {
      returnCardId: 3,
      adminId: 3,
      action: (
        <button type='button' className='primary-btn'>
          auto
        </button>
      )
    }
  ];

  return (
    <div>
      <div id='body' className='mt-5 m-3 lg:mr-20'>
        <span className='text-xl font-bold'>Return Card List</span>
        <Table headers={headers} data={data} onToggle={onToggle}></Table>
      </div>
    </div>
  );
};

export default ReturnCard;
