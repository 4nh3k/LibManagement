import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import transactionSuccess from 'src/assets/img/transactionSuccess.png';
import http from 'src/utils/http';
const TransactionSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    navigate('/');
  }
  useEffect(() => {
    http.post('/api/v1/user-transactions', undefined, {
      params: {
        user: id,
        status: 'success'
      }
    });
  }, [id]);

  return (
    <div className='p-4 w-full h-full overflow-y-auto lg:overflow-y-hidden flex items-center justify-center'>
      <div className='pt-10 flex flex-col items-center align-middle space-y-8'>
        <img alt='transaction-success' src={transactionSuccess} className='w-32 h-32'></img>
        <span className='text-4xl font-bold text-[#4aaf79]'>Transaction successfully</span>
        <span className='text-normal text-center font-medium'>
          Your transaction has been completed successfully.<br></br>Please check your wallet again
        </span>

        <button
          onClick={() => navigate('/')}
          className='w-32 h-10 rounded-lg bg-slate-500 text-white font-medium hover:opacity-90'
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default TransactionSuccess;
