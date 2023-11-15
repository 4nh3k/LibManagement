import Table from 'src/components/Table/Table';

const ReturnCardList = () => {
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
      <div id='body' className='mt-5 mr-20'>
        <span className='text-xl font-bold'>Return Card List</span>
        <Table headers={headers} data={data}></Table>
      </div>
    </div>
  );
};

export default ReturnCardList;
