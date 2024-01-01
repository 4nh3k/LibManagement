import user_icon from '../../assets/img/user.png';
import { PencilSimple, UploadSimple } from '@phosphor-icons/react';
import { FileDrop } from 'react-file-drop';
import Button from 'src/components/Button';
import { useEffect, useRef, useState } from 'react';
import { userApi } from 'src/apis/user.api';
import { useQuery } from '@tanstack/react-query';
import User from 'src/components/User/User';
const UserAccount = () => {
  const fileInputRef = useRef<File | null>(null);
  const [file, setFile] = useState(null); // array of currently uploaded files
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    // setFile(files[0]);
    // do something with your files...
  };
  const onFileDrop = (files, event) => {
    console.log('onFileDrop!', files, event);
    setFile(files[0]);
    // do something with your files...
  };

  const onTargetClick = () => {
    console.log('onTargetClick');

    fileInputRef?.current.click();
  };

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

  useEffect(() => {
    if (user) {
      setUserInformation({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
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

  const [onEdit, setOnEdit] = useState<boolean>(false);
  const toggleEditUser = () => {
    setOnEdit(!onEdit);
  };

  const resetUserInformation = () => {
    setUserInformation({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      readerType: user.readerType || '',
      email: user.email || '',
      password: user.password || ''
    });
  };

  return (
    <div className='bg-white w-full h-screen overflow-auto px-4'>
      <div id='horizontal-header' className='pl-5 pr-5 lg:pr-10 py-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xl lg:text-2xl font-bold'>Account</span>
          <div className='inline'>
            <User></User>
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row items-center align-middle lg:space-x-12 mt-5 lg:mt-20 lg:ml-5 space-y-5'>
        <div className='flex flex-col '>
          <div className='ml-auto'>
            <PencilSimple size={24} onClick={toggleEditUser}></PencilSimple>
          </div>
          <div className='flex space-x-0 flex-col lg:flex-row lg:space-x-20'>
            <div className='w-18 lg:w-72 mb-5'>
              <h3 className='custom-label' id='firstname'>
                First Name
              </h3>
              <div className='flex space-x-3'>
                <input
                  className='custom-input bg-white'
                  value={userInformation.firstName}
                  readOnly={!onEdit}
                  onChange={e => handleInputChange(e, 'firstName')}
                ></input>
              </div>
            </div>
            <div className='w-18 lg:w-72 mb-5'>
              <h3 className='custom-label' id='lastname'>
                Last Name
              </h3>
              <div className='flex space-x-3'>
                <input
                  className='custom-input'
                  value={userInformation.lastName}
                  readOnly={!onEdit}
                  onChange={e => handleInputChange(e, 'lastName')}
                ></input>
              </div>
            </div>
          </div>
          <div className='w-18 lg:w-[41rem] mb-5'>
            <h3 className='custom-label' id='email'>
              Email
            </h3>
            <div className='flex space-x-3'>
              <input
                className='custom-input'
                value={userInformation.email}
                readOnly={!onEdit}
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
                className='custom-input'
                value={userInformation.readerType}
                readOnly={!onEdit}
                onChange={e => handleInputChange(e, 'readerType')}
              ></input>
            </div>
          </div>
          <div className='w-18 lg:w-[41rem] mb-5'>
            <h3 className='custom-label' id='password'>
              Password
            </h3>
            <div className='flex space-x-3'>
              <input
                className='custom-input'
                value={'********'}
                readOnly={!onEdit}
                onChange={e => handleInputChange(e, 'password')}
              ></input>
            </div>
          </div>
          <div className='flex space-x-2 lg:space-x-5 lg:flex-row  m-auto lg:ml-auto lg:mr-0'>
            <Button
              label={'Reset'}
              color={'white'}
              bg_color={'#738296'}
              onclick={resetUserInformation}
            ></Button>
            <Button label={'Save change'} color={'white'} bg_color={'#738296'}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
