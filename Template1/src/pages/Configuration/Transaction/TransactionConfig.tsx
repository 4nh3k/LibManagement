import { memberApi } from 'src/apis/member.api';
import edit_icon from '../../../assets/img/edit.png';

import Button from 'src/components/Button';
import { Validation } from 'src/types/validation.type';
import { useQuery } from '@tanstack/react-query';
import Spinner from 'src/components/Spinner';
const TransactionConfig = () => {
  const { data: validationData, isLoading } = useQuery({
    queryKey: ['validation'],
    queryFn: () => {
      return memberApi.getValidation();
    }
  });

  const validation = validationData?.data.validation as Validation;
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div>
          <div id='top-up-account' className='mb-5 w-full pr-10 flex-col'>
            <div
              id='top-up-account-label'
              className='inline-flex flex-row lg:items-center align-middle mb-10'
            >
              <div
                id='top-up-label-header'
                className='inline w-[0.25rem] h-[2.5625rem] bg-[#8352fd] rounded mr-3 items-center align-middle'
              >
                &nbsp;
              </div>
              <span className='text-[1.375rem] font-semibold mr-5'>Borrow card</span>
              <img
                alt='edit-icon'
                src={edit_icon}
                width={20}
                height={20}
                className='block shrink-0 w-5 h-5'
              />
            </div>

            <div className='flex flex-col gap-10'>
              <div
                id='member-max-publication-year-input'
                className='flex lg:flex-row flex-col ml-[1rem] lg:items-center align-middle'
              >
                <label
                  htmlFor='max-publication'
                  id='max-publicaton-label'
                  className='text-[1.375rem] font-semibold lg:basis-48 shrink-0'
                >
                  Maximum borrowing days:
                </label>
                <input
                  type='number'
                  min={0}
                  className='custom-input mt-1 max-w-[25rem] h-10 text-black font-medium'
                  id='max-publication-year-input'
                  placeholder='Max years'
                  value={validation.publicationYear}
                />
              </div>
            </div>

            <div
              id='pay-button-container'
              className='flex ml-auto mr-auto lg:ml-[4rem] space-x-10 mt-10'
            >
              <button className='rounded-full h-10 w-20 bg-slate-500 text-white font-medium text-sm hover:opacity-90'>
                Save
              </button>
              <button className='rounded-full h-10 w-20 bg-slate-500 text-white font-medium text-sm hover:opacity-90'>
                Undo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionConfig;
