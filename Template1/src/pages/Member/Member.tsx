import { DotsThreeOutline, PencilSimple, Trash, UploadSimple } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import Input from 'src/components/Input';
import SimpleTable from 'src/components/Table/SimpleTable';
import { useQuery } from '@tanstack/react-query';
import { memberApi } from 'src/apis/member.api';

interface MemberProps {
  name: string;
  age: number;
}

export default function Member() {
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
  const dummyHeaders = [
    { title: 'ID', dataIndex: 'memberId' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Member date', dataIndex: 'memberDate' }
  ];

  const dummyData = [
    { memberId: 21520579, name: 'John Doe', memberDate: '2021-01-01' },
    { memberId: 2, name: 'Jane Smith', memberDate: '2021-02-15' },
    { memberId: 3, name: 'Bob Johnson', memberDate: '2021-03-10' }
  ];

  const headers = [
    { title: 'Name', dataIndex: 'fullName' },
    { title: 'Address', dataIndex: 'address' },
    { title: 'Email', dataIndex: 'email' }
  ];

  const { data: readerMemberData, isLoading } = useQuery({
    queryKey: ['readers'],
    queryFn: () => memberApi.getAllMembers()
  });

  const data = readerMemberData?.data.data.doc;
  const onTargetClick = () => {
    console.log('onTargetClick');

    fileInputRef?.current.click();
  };

  const [selectedMember, setSelectedMember] = useState({
    id: '',
    name: '',
    dob: '',
    address: '',
    email: '',
    date: ''
  });

  const onRowClick = row => {
    setSelectedMember({
      id: row._id.toString(),
      name: row.fullName,
      dob: row.dateOfBirth, // Replace with the actual property name in your data
      address: row.address, // Replace with the actual property name in your data
      email: row.email, // Replace with the actual property name in your data
      date: row.cardCreatedAt // Replace with the actual property name in your data
    });
  };

  const [onEditMember, setEditMember] = useState(false);
  const onEditMemberClick = () => {
    setEditMember(true);
  };

  return (
    <div className='w-full min-h-screen overflow-y-auto lg:overflow-y-hidden'>
      <select className='custom-select ml-5 mt-5'>
        <option value='1'>All Members</option>
      </select>
      <div className='w-full flex flex-col lg:flex-row'>
        <div className='ml-5 mt-5 w-5/6 lg:w-2/5'>
          <h2 className='text-xl lg:text-3xl text-primary2 font-bold'>All Members</h2>
          {!isLoading && data && (
            <SimpleTable
              className='overflow-x-auto rounded-md overflow-hidden shadow-md mt-4'
              headers={headers}
              data={data}
              onRowClick={onRowClick}
            ></SimpleTable>
          )}
          <button type='button' className='primary-btn-fit block mt-5 ml-auto'>
            See more
          </button>
        </div>
        <div className='ml-4 lg:ml-12 mr-9 mt-5 w-5/6 lg:w-3/5'>
          <div className='flex items-center'>
            <h2 className='text-xl lg:text-3xl text-primary2 font-bold'>Member latest record</h2>
            <ul className='ml-auto flex space-x-4 text-primary2'>
              <li>
                <button onClick={onEditMemberClick}>
                  <PencilSimple size={24} />
                </button>
              </li>
              <li>
                <Trash size={24} />
              </li>
              <li>
                <DotsThreeOutline size={24} />
              </li>
            </ul>
          </div>
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
          <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            accept='image/png, image/gif, image/jpeg'
            type='file'
            className='hidden'
          />
          <div className='space-y-5 mt-5'>
            <div className='flex flex-col lg:flex-row justify-between'>
              <label htmlFor='member-id' className='member-label text-lg mr-16'>
                Member ID
              </label>
              <Input
                id='member-id'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[32rem]'
                readOnly={!onEditMember}
                value={selectedMember.id}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between'>
              <label htmlFor='member-name' className='member-label mr-16'>
                Name
              </label>
              <Input
                id='member-name'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[32rem]'
                readOnly={!onEditMember}
                value={selectedMember.name}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between'>
              <label htmlFor='member-email' className='member-label mr-16'>
                Email
              </label>
              <Input
                id='member-email'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[32rem]'
                readOnly={!onEditMember}
                value={selectedMember.email}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between'>
              <label htmlFor='member-dob' className='member-label mr-16'>
                Date of birth
              </label>
              <Input
                id='member-dob'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[32rem]'
                readOnly={!onEditMember}
                value={selectedMember.dob}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between'>
              <label htmlFor='member-address' className='member-label mr-16'>
                Address
              </label>
              <Input
                id='member-address'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[32rem]'
                readOnly={!onEditMember}
                value={selectedMember.address}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between'>
              <label htmlFor='member-date' className='member-label mr-16'>
                Member date
              </label>
              <Input
                id='member-date'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[32rem]'
                readOnly={!onEditMember}
                value={selectedMember.date}
              />
            </div>
          </div>

          {onEditMember && (
            <div className='flex mt-4'>
              <button type='button' className='primary-btn-fit ml-auto w-20'>
                Save
              </button>
              <button type='button' className='secondary-btn w-20 ml-5'>
                Cancel
              </button>
            </div>
          )}
          <div className='flex mt-8'>
            <h2 className='text-xl lg:text-3xl text-primary2 font-bold'>Borrowed History</h2>
            <select className='custom-select ml-auto'>
              <option value='1'>All</option>
            </select>
          </div>
          <div>
            <SimpleTable
              className='rounded-md overflow-hidden shadow-md mt-4'
              headers={dummyHeaders}
              data={dummyData}
            ></SimpleTable>
          </div>
        </div>
      </div>
    </div>
  );
}
