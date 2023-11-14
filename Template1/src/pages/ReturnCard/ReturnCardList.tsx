import React from 'react';
import Table from 'src/components/Table/Table';

const ReturnCardList = () => {
  const data = [
    { returnCardId: 1, adminId: 1, action: 'Return' },
    { returnCardId: 2, adminId: 2, action: 'Return' },
    { returnCardId: 3, adminId: 3, action: 'Return' }
  ];

  return (
    <div>
      <h2>Borrow Card List</h2>
      <Table
        headers={[
          { title: 'Return Card ID', dataIndex: 'returnCardId' },
          { title: 'Admin ID', dataIndex: 'adminId' },
          { title: 'Action', dataIndex: 'action' }
        ]}
        data={data}
      />
    </div>
  );
};

export default ReturnCardList;
