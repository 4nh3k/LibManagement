import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { userApi } from 'src/apis/user.api';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import money_icon from '../../../assets/icons/dollar.svg';
const TopUp = () => {
  const { data: financialData, isLoading } = useQuery({
    queryKey: ['financial-me'],
    queryFn: userApi.getFinancialMe
  });
  const [amount, setAmount] = useState<number>(0);

  const userFinancial = financialData?.data.userFinancials;

  const topUpMutation = useMutation({
    mutationFn: (body: { money: number }) => userApi.topUpAccount(body.money),
    onSuccess: data => {
      window.location.replace(`${data.data.session.url}`);
    }
  });

  return (
    <>
      {isLoading && (
        <div className='w-full flex justify-center items-center'>
          <LoadingIndicator />
        </div>
      )}
      {!isLoading && (
        <div>
          <div id='current-balance' className='text-center space-y-[1.5rem] mt-5 mb-5'>
            <span className='text-[1.5rem] block'>Current balance</span>
            <span className='text-[2.5rem] block'>{userFinancial?.balance}$</span>
          </div>

          <div id='top-up-account' className='mb-5'>
            <div
              id='top-up-account-label'
              className='inline-flex flex-row items-center align-middle text-2xl'
            >
              <div
                id='top-up-label-header'
                className='inline w-[0.25rem] h-[2.5625rem] bg-[#8352fd] rounded mr-3 items-center align-middle'
              >
                &nbsp;
              </div>
              Top up
            </div>
          </div>
          <div className='flex flex-col text-center'>
            <div id='top-up-container' className='ml-auto desktop:ml-auto mr-auto mb-3'>
              <div
                id='price'
                className='w-64 flex h-[2.1875rem] items-center align-middle bg-white px-5 py-6 rounded-lg border-1 border-[#1F78E8] mb-5'
              >
                <input
                  className='w-full text-[1.25rem] border-none outline-0 font-semibold'
                  type='number'
                  min={0}
                  id='top-up-amount'
                  placeholder='5'
                  value={amount}
                  onChange={e => {
                    // Clear 0 such as 02 03
                    if (e.target.value[0] === '0') {
                      e.target.value = e.target.value.slice(1);
                    }
                    setAmount(Number(e.target.value));
                  }}
                />
                <img
                  src={money_icon}
                  className='inline text-right'
                  width={16}
                  height={16}
                  alt='vietnamese currency icon'
                />
              </div>
              <button
                className='h-10 w-24 bg-slate-500 font-semibold text-white rounded hover:opacity-90'
                onClick={() => topUpMutation.mutate({ money: amount })}
              >
                Top up
              </button>
            </div>
            <span className='ml-auto mr-auto'>
              Your balance will be{' '}
              <span className='font-semibold'>{(userFinancial?.balance || 0) + amount}$</span> after
              top up
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default TopUp;
