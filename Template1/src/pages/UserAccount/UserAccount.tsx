import { Link } from 'react-router-dom';
import Input from 'src/components/Input';
import user_icon from '../../assets/img/user.png';
import { DotsThreeOutline, PencilSimple, Trash, UploadSimple } from '@phosphor-icons/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Button from 'src/components/Button';

const UserAccount = () => {
  return (
    <div className='bg-gray-100 w-full h-screen overflow-auto px-4'>
      <div id='horizontal-header' className='pl-5 pr-5 lg:pr-10 py-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xl lg:text-2xl font-bold'>User information</span>
          <div className='inline'>
            <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-20 ml-5'>
        <div className='flex space-x-0 flex-col lg:flex-row lg:space-x-20'>
          <div className='w-18 lg:w-72 mb-5'>
            <h3 className='custom-label' id='firstname'>
              First Name
            </h3>
            <div className='flex space-x-3'>
              <input className='custom-input'></input>
              <PencilSimple className='inline' size={24} />
            </div>
          </div>
          <div className='w-18 lg:w-72 mb-5'>
            <h3 className='custom-label' id='lastname'>
              Last Name
            </h3>
            <div className='flex space-x-3'>
              <input className='custom-input'></input>
              <PencilSimple className='inline' size={24} />
            </div>
          </div>
        </div>
        <div className='w-18 lg:w-72 mb-5'>
          <h3 className='custom-label' id='email'>
            Email
          </h3>
          <div className='flex space-x-3'>
            <input className='custom-input'></input>
            <PencilSimple className='inline' size={24} />
          </div>
        </div>
        <div className='w-18 lg:w-72 mb-5'>
          <h3 className='custom-label' id='password'>
            Password
          </h3>
          <div className='flex space-x-3'>
            <input className='custom-input'></input>
            <PencilSimple className='inline' size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
