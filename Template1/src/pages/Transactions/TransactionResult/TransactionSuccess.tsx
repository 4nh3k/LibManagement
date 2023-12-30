import { useNavigate } from 'react-router-dom';
import transactionSuccess from 'src/assets/img/transactionSuccess.png';
const TransactionSuccess = () => {
  const navigate = useNavigate();
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
