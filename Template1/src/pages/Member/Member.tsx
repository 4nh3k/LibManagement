import { DotsThreeOutline, PencilSimple, Trash, UploadSimple } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import Input from 'src/components/Input';
import SimpleTable from 'src/components/Table/SimpleTable';
import { useQuery } from '@tanstack/react-query';
import { memberApi } from 'src/apis/member.api';
import { borrowCardApi } from 'src/apis/borrow-card.api';
import { BorrowCard } from 'src/types/borrow-card.type';

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

  const borrowHeaders = [
    { title: 'Borrow Card ID', dataIndex: 'borrowId' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Status', dataIndex: 'status' }
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
  const [id, setId] = useState<number | null>(null);
  const {
    data: memberData,
    isLoading: isMemberDataLoading,
    isFetching: isMemberDataFetching,
    refetch
  } = useQuery({
    queryKey: ['borrowers'],
    queryFn: () => borrowCardApi.getAllBorrowCard({ borrower: id }),
    select: data => {
      return data.data.data.doc.map((item: BorrowCard) => {
        return {
          borrowId: item._id,
          date: new Date(item.borrowDate).toLocaleDateString('en-GB'),
          status: item.isReturned ? 'Returned' : 'Borrowing'
        };
      });
    },
    enabled: false
  });

  const onRowClick = row => {
    setSelectedMember({
      id: row._id.toString(),
      name: row.fullName,
      dob: new Date(row.dateOfBirth).toLocaleDateString('en-GB'),
      address: row.address,
      email: row.email,
      date: new Date(row.cardCreatedAt).toLocaleDateString('en-GB')
    });
    setId(row._id);
    refetch();
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
          <div hidden={selectedMember.id === ''}>
            {(isMemberDataLoading || isMemberDataFetching) && (
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
                <span className='sr-only'>Loading...</span>
              </div>
            )}
            {!(isMemberDataLoading || isMemberDataFetching) && (
              <SimpleTable
                className='rounded-md overflow-hidden shadow-md mt-4'
                headers={borrowHeaders}
                data={memberData}
              ></SimpleTable>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
