import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import money_icon from '../../assets/icons/dollar.svg';
import { userApi } from 'src/apis/user.api';
import { useState } from 'react';
import Spinner from 'src/components/Spinner';
import { toast } from 'react-toastify';
function PaymentForm() {
  const {
    data: financialData,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['financial-me'],
    queryFn: userApi.getFinancialMe
  });
  const queryClient = useQueryClient();
  const userFinancial = financialData?.data.userFinancials;

  const [amount, setAmount] = useState<number>(5);
  const paymentMutation = useMutation({
    mutationFn: (body: { money: number }) =>
      userApi.payDebt({
        balance: userFinancial?.balance as number,
        totalDebt: userFinancial?.totalDebt as number,
        amountPaid: body.money
      })
  });

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div>
          <div id='current-balance' className='text-center space-y-[1.5rem] mb-5'>
            <span className='text-[1.5rem] block'>Current balance</span>
            <span className='text-[2.5rem] block'>{userFinancial?.balance}$</span>
          </div>
          <div className=''>
            <div id='top-up-account' className='mb-5 w-full pr-10'>
              <div
                id='top-up-account-label'
                className='inline-flex flex-row items-center align-middle mb-10 text-2xl'
              >
                <div
                  id='top-up-label-header'
                  className='inline w-[0.25rem] h-[2.5625rem] bg-[#8352fd] rounded mr-3 items-center align-middle'
                >
                  &nbsp;
                </div>
                Money receipt
              </div>
              <div className='ml-auto mr-auto flex flex-col gap-10 w-18 lg:w-72'>
                <span className='ml-auto mr-auto text-[1.5rem] font-bold'>Payment Detail</span>
                <div
                  id='top-up-container'
                  className='flex flex-col mr-auto ml-auto lg:ml-auto mb-3'
                >
                  <label
                    htmlFor='member-price'
                    id='member-price'
                    className='text-[1.375rem] block font-semibold'
                  >
                    Money paid
                  </label>

                  <div
                    id='price'
                    className='w-64 flex h-10 items-center align-middle bg-white px-5 py-6 rounded-lg border-1 border-[#1F78E8]'
                  >
                    <input
                      className='w-full block text-lg font-semibold border-none outline-0'
                      type='number'
                      min={0}
                      id='top-up-amount'
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
                      className=''
                      width={16}
                      height={16}
                      alt='vietnamese currency icon'
                    />
                  </div>
                </div>
                <div
                  id='total-fee-container'
                  className='w-18 lg:w-72 flex lg:mr-auto ml-[1rem] lg:ml-auto items-center justify-between'
                >
                  <label
                    htmlFor='total-fee'
                    id='member-label'
                    className='inline text-[1.375rem] font-semibold w-[10rem]'
                  >
                    Total Fee
                  </label>
                  <span className='text-[1.5rem]'>{userFinancial?.totalDebt}$</span>
                </div>

                <div
                  id='wallet-container'
                  className='w-18 lg:w-72 flex lg:mr-auto ml-[1rem] lg:ml-auto items-center justify-between'
                >
                  <label
                    htmlFor='wallet'
                    id='wallet-label'
                    className='inline text-[1.375rem] font-semibold w-[10rem]'
                  >
                    Your Wallet
                  </label>
                  <span className='inline text-[1.5rem]'>{userFinancial?.balance}$</span>
                </div>

                <span>
                  Money after payment will be{' '}
                  <span className='text-normal font-semibold'>
                    {(userFinancial?.balance || 0) - amount < 0
                      ? 0
                      : (userFinancial?.balance || 0) - amount}
                    $
                  </span>
                </span>
                <div className='flex items-center justify-center'>
                  <button
                    className='text-white font-medium w-36 h-10 bg-slate-500 rounded hover:opacity-90'
                    onClick={() =>
                      paymentMutation.mutate(
                        { money: amount },
                        {
                          onSuccess: () => {
                            setAmount(5);
                            toast.success('Payment successfully!');
                            queryClient.invalidateQueries({
                              queryKey: ['financial-me']
                            });
                          }
                        }
                      )
                    }
                  >
                    Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentForm;
