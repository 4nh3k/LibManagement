import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import edit_icon from '../../../assets/img/edit.png';
import { memberApi } from 'src/apis/member.api';
import { Validation } from 'src/types/validation.type';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const BookConfig = () => {
  const { data: validationData, isLoading } = useQuery({
    queryKey: ['validation'],
    queryFn: () => {
      return memberApi.getValidation();
    }
  });
  const [regulation, setRegulation] = useState<Validation>({} as Validation);

  const validation = validationData?.data.validation as Validation;

  useEffect(() => {
    setRegulation(validation);
  }, [validation]);

  const onChange = (name: keyof Validation) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegulation({ ...regulation, [name]: Number(event.target.value) });
  };

  const updateRegulationMutation = useMutation({
    mutationFn: () => {
      return memberApi.updateValidation(regulation);
    }
  });
  const queryClient = useQueryClient();
  const onSubmit = () => {
    updateRegulationMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries(['validation']);
        toast.success('Update successfully!');
      }
    });
  };
  return (
    <>
      {isLoading && (
        <div role='status'>
          <svg
            aria-hidden='true'
            className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
        </div>
      )}
      {!isLoading && (
        <div>
          <div id='top-up-account' className='mb-5 w-full pr-10'>
            <div
              id='top-up-account-label'
              className='inline-flex flex-row items-center align-middle mb-10'
            >
              <div
                id='top-up-label-header'
                className='inline w-[0.25rem] h-[2.5625rem] bg-[#8352fd] rounded mr-3 items-center align-middle'
              >
                &nbsp;
              </div>
              <span className='text-[1.375rem] font-semibold mr-5'>Reader card</span>
              <img
                alt='edit-icon'
                src={edit_icon}
                width={20}
                height={20}
                className='inline items-center align-middle'
              />
            </div>
            <div className='flex flex-col gap-10'>
              <div
                id='member-minimum-age-input'
                className='w-18 ml-flex flex-col lg:flex-row lg:mr-auto ml-[1rem] items-center align-middle flex'
              >
                <label
                  htmlFor='member_minimum-age'
                  id='member-label'
                  className='text-[1.375rem] font-semibold w-[25rem]'
                >
                  Minimum age
                </label>
                <input
                  type='number'
                  min={0}
                  value={regulation?.ageMin}
                  className='custom-input mt-1 max-w-[25rem] h-10 text-black font-medium'
                  id='member_minium_age'
                  placeholder='Minimum age'
                  onChange={onChange('ageMin')}
                />
              </div>

              <div
                id='member-max-age-input'
                className='w-18 ml-flex flex-col lg:flex-row lg:mr-auto ml-[1rem] items-center align-middle flex'
              >
                <label
                  htmlFor='member-max-age'
                  id='member-max-age'
                  className='text-[1.375rem] font-semibold w-[25rem]'
                >
                  Maximum age
                </label>
                <input
                  type='text'
                  className='custom-input mt-1 max-w-[25rem] h-10 text-black font-medium'
                  id='member_max-age-input'
                  placeholder='Max age'
                  value={regulation?.ageMax}
                  onChange={onChange('ageMax')}
                />
              </div>

              <div
                id='member-card-expiration'
                className='flex w-18 ml-flex flex-col lg:flex-row lg:mr-auto ml-[1rem] items-center align-middle'
              >
                <label
                  htmlFor='member-card-expi-label'
                  id='member-label'
                  className='text-[1.375rem] font-semibold w-[25rem]'
                >
                  Card expiration time (<span>month</span>)
                </label>
                <input
                  type='number'
                  className='custom-input mt-1 max-w-[25rem] h-10 text-black font-medium'
                  id='member_card_expire_time'
                  placeholder='Enter card expiration time'
                  value={regulation?.expiredMonth}
                  onChange={onChange('expiredMonth')}
                  min={0}
                />
              </div>

              <div
                id='pay-button-container'
                className='flex ml-auto mr-auto lg:ml-[4rem] space-x-10'
              >
                <button
                  className='rounded-full h-10 w-20 bg-slate-500 text-white font-medium text-sm hover:opacity-90'
                  onClick={onSubmit}
                >
                  Save
                </button>
                {/* <button className='rounded-full h-10 w-20 bg-slate-500 text-white font-medium text-sm hover:opacity-90'>
                  Undo
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookConfig;
