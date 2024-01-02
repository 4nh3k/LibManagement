import { useState } from 'react';
import { feeApi } from 'src/apis/fee.api';
import Table from 'src/components/Table/Table';
import { useQuery } from '@tanstack/react-query';
import Fee from 'src/types/fee.type';
interface Props {
  onToggle?: () => void;
}

const FeeCard: React.FC<Props> = ({ onToggle }) => {
  const headers = [
    { title: 'Fee Card ID', dataIndex: '_id' },
    { title: 'User Financials ID', dataIndex: 'userFinancials' },
    { title: 'Total Debt', dataIndex: 'totalDebt' },
    { title: 'Amount Paid', dataIndex: 'amountPaid' }
  ];

  const { data: feeData, isLoading } = useQuery({
    queryKey: ['feeData'],
    queryFn: () => feeApi.getAllFeeCard(),
    select: data => {
      return data.data.data.doc.map((item: Fee) => {
        return {
          _id: item._id,
          userFinancials: item.userFinancials,
          totalDebt: item.totalDebt.toFixed(2) + '$',
          amountPaid: item.amountPaid.toFixed(2) + '$'
        };
      });
    }
  });

  const searchBy = [
    { label: 'Fee Card ID', dataIndex: '_id' },
    { label: 'User Financials ID', dataIndex: 'userFinancials' }
  ];

  return (
    <div id='body' className='mt-5 m-3 lg:mr-20'>
      <span className='text-xl font-bold'>Fee Card List</span>
      {!isLoading && feeData && (
        <Table
          headers={headers}
          data={feeData}
          onToggle={onToggle}
          onAdd={false}
          searchBy={searchBy}
        ></Table>
      )}
    </div>
  );
};

export default FeeCard;
