import user_icon from '../../assets/img/user.png';
import { PencilSimple, UploadSimple } from '@phosphor-icons/react';
import { FileDrop } from 'react-file-drop';
import Button from 'src/components/Button';
import { useRef, useState } from 'react';
import { userApi } from 'src/apis/user.api';
import { useQuery } from '@tanstack/react-query';
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

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return userApi.getCurrentUserInformation();
    }
  });
  // Get the data based on json object structure
  const user = userInfo?.data.data.doc;

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
      <div className='flex items-center align-middle space-x-12 mt-20 ml-5'>
        <div className='flex flex-col items-center space-y-4'>
          <FileDrop
            className='lg:w-48 lg:h-48 m-auto rounded-full cursor-pointer block'
            targetClassName={`w-48 h-48 border-2 mx-auto ${
              file === null ? 'border-dashed' : 'border-solid'
            } overflow-hidden bg-gray-50 border-gray-400 rounded-full md-4 flex flex-col items-center justify-center`}
            onTargetClick={onTargetClick}
            draggingOverFrameClassName='bg-gray-200 scale-110 border-primary2'
            draggingOverTargetClassName='bg-primary2/20 scale-110 border-primary2'
            onFrameDragEnter={event => console.log('onFrameDragEnter', event)}
            onFrameDragLeave={event => console.log('onFrameDragLeave', event)}
            onFrameDrop={event => console.log('onFrameDrop', event)}
            onDragOver={event => console.log('onDragOver', event)}
            onDragLeave={event => console.log('onDragLeave', event)}
            onDrop={onFileDrop}
          >
            {file === null ? (
              <>
                <UploadSimple size={64} className='text-gray-400 mx-auto' />
                <p className='text-center mx-6 text-sm font-semibold'>
                  Drop files to upload or <span className='underline text-primary'>browse</span>
                </p>
              </>
            ) : (
              <img src={URL.createObjectURL(file)} alt='Uploaded File' className='w-full h-full ' />
            )}
          </FileDrop>
          <h3 id='usernameLabel' className='custom-label'>
            {!isLoading && user.firstName + ' ' + user.lastName}
          </h3>
        </div>
        <div className='flex flex-col'>
          <div className='flex space-x-0 flex-col lg:flex-row lg:space-x-20'>
            <div className='w-18 lg:w-72 mb-5'>
              <h3 className='custom-label' id='firstname'>
                First Name
              </h3>
              <div className='flex space-x-3'>
                <input className='custom-input' value={!isLoading && user.firstName}></input>
                <PencilSimple className='inline' size={24} />
              </div>
            </div>
            <div className='w-18 lg:w-72 mb-5'>
              <h3 className='custom-label' id='lastname'>
                Last Name
              </h3>
              <div className='flex space-x-3'>
                <input className='custom-input' value={!isLoading && user.lastName}></input>
                <PencilSimple className='inline' size={24} />
              </div>
            </div>
          </div>
          <div className='w-18 lg:w-72 mb-5'>
            <h3 className='custom-label' id='email'>
              Email
            </h3>
            <div className='flex space-x-3'>
              <input className='custom-input' value={!isLoading && user.email}></input>
              <PencilSimple className='inline' size={24} />
            </div>
          </div>
          <div className='w-18 lg:w-72 mb-5'>
            <h3 className='custom-label' id='readertype'>
              Reader type
            </h3>
            <div className='flex space-x-3'>
              <input className='custom-input' value={!isLoading && user.readerType}></input>
              <PencilSimple className='inline' size={24} />
            </div>
          </div>
          <div className='w-18 lg:w-72 mb-5'>
            <h3 className='custom-label' id='password'>
              Password
            </h3>
            <div className='flex space-x-3'>
              <input className='custom-input' value={!isLoading && '********'}></input>
              <PencilSimple className='inline' size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
