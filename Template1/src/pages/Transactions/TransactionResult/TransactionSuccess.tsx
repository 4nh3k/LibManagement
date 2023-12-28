import React from 'react';
import transactionSuccess from 'src/assets/img/transactionSuccess.png';
import Button from 'src/components/Button';
const TransactionSuccess = () => {
  return (
    <div className='p-4 w-full h-screen overflow-y-auto lg:overflow-y-hidden'>
      <div className='pt-10 flex flex-col items-center align-middle space-y-8'>
        <img alt='transaction-success' src={transactionSuccess} className='w-32 h-32'></img>
        <span className='text-4xl font-bold text-[#4aaf79]'>Transaction successfully</span>
        <span className='text-2xl text-center'>
          Your transaction has been completed successfully.<br></br>Please check your wallet again
        </span>
        <Button label={'Close'} color={'white'} bg_color={'#48bccc'}></Button>
      </div>
    </div>
  );
};

export default TransactionSuccess;
