import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import { userApi } from 'src/apis/user.api';
import User from 'src/components/User/User';
const UserAccount = () => {
  const [userInformation, setUserInformation] = useState({
    firstName: '',
    lastName: '',
    readerType: '',
    email: '',
    password: ''
  });

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return userApi.getCurrentUserInformation();
    }
  });
  // Get the data based on json object structure
  const user = userInfo?.data.data.doc;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      const nameArray = user.username?.split(' ');

      setUserInformation({
        firstName: nameArray?.[0] ?? user.firstName ?? '',
        lastName: nameArray?.slice(1).join(' ') ?? user.lastName ?? '',
        readerType: user.readerType || '',
        email: user.email || '',
        password: user.password || ''
      });
    }
  }, [user]);

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setUserInformation(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const resetUserInformation = () => {
    const nameArray = user.username?.split(' ');

    setUserInformation({
      firstName: nameArray?.[0] ?? user.firstName ?? '',
      lastName: nameArray?.slice(1).join(' ') ?? user.lastName ?? '',
      readerType: user.readerType || '',
      email: user.email || '',
      password: user.password || ''
    });
  };

  const updateUserInfo = useMutation({
    mutationFn: (data: FormData) => {
      return userApi.updateUserInformation(data);
    },
    onSuccess: () => {
      toast.success('Update user information successfully');
    },
    onError: error => {
      toast.error(error.response.data.message);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('username', userInformation.firstName + ' ' + userInformation.lastName);
    formdata.append('readerType', userInformation.readerType);
    updateUserInfo.mutate(formdata);
    console.log('submit');
  };

  const changePassword = useMutation({
    mutationFn: () => {
      return authApi.changePassword({
        confirmPassword: confirmNewPassword,
        password: newPassword,
        passwordCurrent: currentPassword
      });
    },
    onSuccess: () => {
      toast.success('Change password successfully');
    },
    onError: error => {
      toast.error(error.response.data.message);
    }
  });

  const handlePasswordSubmit = e => {
    e.preventDefault();
    changePassword.mutate();
  };

  return (
    <div className='w-full h-screen overflow-auto p-4'>
      <div id='horizontal-header' className='pl-5 pr-5 lg:pr-10 py-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xl lg:text-2xl font-bold'>Account</span>
          <div className='inline'>
            <User></User>
          </div>
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Change password</Tab>
        </TabList>
        <TabPanel>
          <form onSubmit={handleSubmit} className='lg:mx-auto mx-4 lg:w-[41rem] mt-10 lg:mt-20  '>
            <div className='md:w-18 lg:w-[41rem] mb-5'>
              <h3 className='custom-label' id='firstname'>
                First Name
              </h3>
              <div className='flex space-x-3'>
                <input
                  className='custom-input mt-1 h-10 text-black font-medium'
                  value={userInformation.firstName}
                  onChange={e => handleInputChange(e, 'firstName')}
                ></input>
              </div>
            </div>
            <div className='w-18 lg:w-[41rem] mb-5'>
              <h3 className='custom-label' id='lastname'>
                Last Name
              </h3>
              <div className='flex space-x-3'>
                <input
                  className='custom-input mt-1 h-10 text-black font-medium'
                  value={userInformation.lastName}
                  onChange={e => handleInputChange(e, 'lastName')}
                ></input>
              </div>
            </div>
            <div className='w-18 lg:w-[41rem] mb-5'>
              <h3 className='custom-label' id='email'>
                Email
              </h3>
              <div className='flex space-x-3'>
                <input
                  className='custom-input mt-1 h-10 text-black font-medium'
                  disabled
                  value={userInformation.email}
                  onChange={e => handleInputChange(e, 'email')}
                ></input>
              </div>
            </div>
            <div className='w-18 lg:w-[41rem] mb-5'>
              <h3 className='custom-label' id='readertype'>
                Reader type
              </h3>
              <div className='flex space-x-3'>
                <input
                  className='custom-input mt-1 h-10 text-black font-medium'
                  value={userInformation.readerType}
                  disabled
                  onChange={e => handleInputChange(e, 'readerType')}
                ></input>
              </div>
            </div>
            <div className='flex '>
              <button
                color={'white'}
                type={'button'}
                className='secondary-btn w-20 ml-auto'
                onClick={resetUserInformation}
              >
                Reset
              </button>
              <button color={'white'} type='submit' className='primary-btn-fit w-20 ml-4'>
                Submit
              </button>
            </div>
          </form>
        </TabPanel>
        <TabPanel>
          <form
            onSubmit={handlePasswordSubmit}
            className='lg:mx-auto mx-4 lg:w-[41rem] mt-10 lg:mt-20  '
          >
            <div className='w-18 lg:w-[41rem] mb-5'>
              <h3 className='custom-label' id='firstname'>
                Current Password
              </h3>
              <div className='flex space-x-3'>
                <input
                  type='password'
                  required
                  className='custom-input mt-1 h-10 text-black font-medium'
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='w-18 lg:w-[41rem] mb-5'>
              <h3 className='custom-label' id='lastname'>
                New Password
              </h3>
              <div className='flex space-x-3'>
                <input
                  type='password'
                  required
                  className='custom-input mt-1 h-10 text-black font-medium'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='w-18 lg:w-[41rem] mb-5'>
              <h3 className='custom-label' id='lastname'>
                Confirm New Password
              </h3>
              <div className='flex space-x-3'>
                <input
                  type='password'
                  required
                  className='custom-input mt-1 h-10 text-black font-medium'
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>
            <button color={'white'} type='submit' className='primary-btn-fit w-20 mx-auto'>
              Submit
            </button>
          </form>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default UserAccount;
