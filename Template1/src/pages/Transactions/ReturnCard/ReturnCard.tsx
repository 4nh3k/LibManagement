import { useQuery } from '@tanstack/react-query';
import { returnCardApi } from 'src/apis/return-form.api';
import Table from 'src/components/Table/Table';

interface ReturnCardProps {
  onToggle?: () => void;
}

const ReturnCard: React.FC<ReturnCardProps> = ({ onToggle }) => {
  const headers = [
    { title: 'Return Card ID', dataIndex: 'returnCardId' },
    { title: 'Username', dataIndex: 'username' },
    { title: 'Return Date', dataIndex: 'returnDate' },
    { title: 'Fee', dataIndex: 'fee' }
  ];

  const { data: ReturnCardData, isLoading } = useQuery({
    queryKey: ['ReturnCard'],
    queryFn: () => returnCardApi.getAllReturnCard(),
    select: data => {
      console.log(data);
      return data.data.data.doc.map((item: ReturnCard) => {
        return {
          returnCardId: item._id,
          username: item.borrower.fullName,
          returnDate: new Date(item.returnDate).toLocaleDateString('en-GB'),
          fee: item.fee.toFixed(2),
          action: (
            <button type='button' className='primary-btn'>
              auto
            </button>
          )
        };
      });
    }
  });

  if (isLoading) return <div>Loading...</div>;
  console.log(ReturnCardData);

  return (
    <div>
      <div id='body' className='mt-5 m-3 lg:mr-20'>
        <span className='text-xl font-bold'>Return Card List</span>
        <Table headers={headers} data={ReturnCardData} onToggle={onToggle}></Table>
      </div>
    </div>
  );
};

export default ReturnCard;
