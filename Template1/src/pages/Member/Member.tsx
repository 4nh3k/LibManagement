import { DotsThreeOutline, PencilSimple, Trash } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Select from 'react-select';
import { borrowCardApi } from 'src/apis/borrow-card.api';
import Input from 'src/components/Input';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import SimpleTable from 'src/components/Table/SimpleTable';
import useMember from 'src/hooks/useMember';
import { useUser } from 'src/hooks/useUser';
import { BorrowCardType } from 'src/types/borrow-card.type';
import { calculateMinMaxDates, shortenID } from 'src/utils/utils';

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

  const onTargetClick = () => {
    console.log('onTargetClick');

    fileInputRef?.current.click();
  };

  const headers = [
    { title: 'Name', dataIndex: 'fullName' },
    { title: 'Address', dataIndex: 'address' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Reader Type', dataIndex: 'readerType' }
  ];

  const borrowHeaders = [
    { title: 'Borrow Card ID', dataIndex: 'borrowId' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Status', dataIndex: 'status' }
  ];

  const { getMemberQuery, deleteMemberMutation, createMemberMutation, updateMemberMutation } =
    useMember();

  const { data: readerMemberData, isLoading } = getMemberQuery;

  const data = readerMemberData?.data.data.doc;
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedMember, setSelectedMember] = useState({
    id: '',
    name: '',
    dob: '',
    address: '',
    readerType: '',
    date: new Date().toLocaleDateString('en-GB')
  });

  const [id, setId] = useState<number | null>(null);

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const {
    data: memberData,
    isLoading: isMemberDataLoading,
    isFetching: isMemberDataFetching,
    refetch
  } = useQuery({
    queryKey: ['borrowers'],
    queryFn: () => borrowCardApi.getAllBorrowCard({ borrower: id }),
    select: data => {
      return data.data.data.doc.map((item: BorrowCardType) => {
        return {
          borrowId: shortenID(item._id),
          date: new Date(item.borrowDate).toLocaleDateString('en-GB'),
          status: item.isReturned ? 'Returned' : 'Borrowing'
        };
      });
    }
  });

  const { getAllUserQuery } = useUser();

  const { data: userData } = getAllUserQuery;

  const handleDeleteMember = () => {
    if (selectedMember.id === '') return;
    deleteMemberMutation.mutate(selectedMember.id);
  };

  const onRowSelected = (row, index) => {
    if (index === selectedRow) {
      onCancelEditMemberClick();
      return;
    }
    setSelectedRow(index);
    setSelectedMember({
      id: row._id.toString(),
      name: row.fullName,
      dob: row.dateOfBirth.split('T')[0],
      address: row.address,
      readerType: row.readerType,
      date: new Date(row.cardCreatedAt).toLocaleDateString('en-GB')
    });
    console.log(row);
    setSelectedOption(userData.find(item => item.value === row.user) || null);
    setId(row._id);
    // refetch();
  };

  const [onEditMember, setEditMember] = useState(false);
  const onEditMemberClick = () => {
    setEditMember(true);
  };

  const onCancelEditMemberClick = () => {
    setEditMember(false);
    setSelectedOption(null);
    setSelectedMember({
      id: '',
      name: '',
      dob: '',
      address: '',
      readerType: '',
      date: new Date().toLocaleDateString('en-GB')
    });
    setSelectedRow(null);
  };
  const { min, max } = calculateMinMaxDates();

  const onSubmit = event => {
    event.preventDefault();

    if (selectedRow === null) {
      createMemberMutation.mutate({
        fullName: selectedMember.name,
        dateOfBirth: selectedMember.dob,
        address: selectedMember.address,
        user: selectedOption.value,
        readerType: selectedMember.readerType
      });
    } else {
      updateMemberMutation.mutate({
        id: selectedMember.id,
        data: {
          fullName: selectedMember.name,
          dateOfBirth: selectedMember.dob,
          address: selectedMember.address,
          user: selectedOption.value,
          readerType: selectedMember.readerType
        }
      });
    }

    console.log('submit');
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setSelectedMember(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div className='w-full min-h-screen overflow-y-auto  lg:overflow-y-hidden'>
      <div className='w-full flex flex-col lg:flex-row'>
        <div className='pl-5 mt-5 w-5/6 lg:w-1/2'>
          <h2 className='text-xl lg:text-3xl  font-bold'>All Members</h2>

          {!isLoading && data && (
            <SimpleTable
              className='overflow-x-auto rounded-md overflow-hidden shadow-md mt-4'
              headers={headers}
              data={data}
              selectedRow={selectedRow}
              onSelect={onRowSelected}
            ></SimpleTable>
          )}
        </div>
        <div className='pl-8 pr-9 mt-5 w-5/6 lg:w-1/2'>
          <div className='flex items-center'>
            <h2 className='text-xl lg:text-3xl  font-bold'>Member latest record</h2>
            {selectedRow !== null && (
              <ul className='ml-auto flex space-x-4 '>
                <li>
                  <button type='button' onClick={onEditMemberClick}>
                    <PencilSimple size={24} />
                  </button>
                </li>
                <li>
                  <button type='button' onClick={handleDeleteMember}>
                    <Trash size={24} />
                  </button>
                </li>
                <li>
                  <DotsThreeOutline size={24} />
                </li>
              </ul>
            )}
          </div>

          <form onSubmit={onSubmit} className='space-y-5 mt-5'>
            {/* <FileDrop
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
                <img
                  src={URL.createObjectURL(file)}
                  alt='Uploaded File'
                  className='w-full h-full '
                />
              )}
            </FileDrop>
            <input
              onChange={onFileInputChange}
              ref={fileInputRef}
              accept='image/png, image/gif, image/jpeg'
              type='file'
              className='hidden'
            /> */}
            <div className='flex flex-col lg:flex-row justify-between  lg:items-center'>
              <label htmlFor='member-id' className='member-label'>
                Member ID
              </label>
              <Input
                id='member-id'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[24rem]'
                disabled={true}
                value={selectedMember.id}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between  lg:items-center'>
              <label htmlFor='member-name' className='member-label'>
                Name
              </label>
              <Input
                id='member-name'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[24rem]'
                name='name'
                readOnly={!onEditMember && selectedRow !== null}
                required={true}
                value={selectedMember.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center '>
              <label htmlFor='member-email' className='member-label'>
                Email
              </label>
              <Select
                classNames={{
                  control: state =>
                    !state.isFocused
                      ? 'rounded border-1 text-sm border-textboxBorder w-full lg:w-[24rem] focus:ring-0'
                      : 'rounded border-1 text-sm border-textboxBorder w-full lg:w-[24rem]',
                  valueContainer: state => ''
                }}
                isDisabled={selectedRow !== null}
                value={selectedOption}
                placeholder='Select a user'
                required={true}
                onChange={setSelectedOption}
                options={userData}
              />
              {/* <Input
                id='member-email'
                name='email'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[24rem]'
                readOnly={!onEditMember && selectedRow !== null}
                value={selectedMember.email}
                onChange={handleInputChange}
              /> */}
            </div>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
              <label htmlFor='member-readerType' className='member-label'>
                Reader Type
              </label>
              <Input
                id='member-readerType'
                name='readerType'
                required={true}
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[24rem]'
                readOnly={!onEditMember && selectedRow !== null}
                value={selectedMember.readerType}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between  lg:items-center'>
              <label htmlFor='member-dob' className='member-label'>
                Date of birth
              </label>
              <Input
                id='member-dob'
                type='date'
                name='dob'
                min={min}
                max={max}
                required={true}
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[24rem]'
                readOnly={!onEditMember && selectedRow !== null}
                value={selectedMember.dob !== '' ? selectedMember.dob : ''}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
              <label htmlFor='member-address' className='member-label'>
                Address
              </label>
              <Input
                id='member-address'
                name='address'
                required={true}
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[24rem]'
                readOnly={!onEditMember && selectedRow !== null}
                value={selectedMember.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
              <label htmlFor='member-date' className='member-label'>
                Member date
              </label>
              <Input
                id='member-date'
                className='rounded py-1 px-3 border-1 text-sm border-textboxBorder w-full lg:w-[24rem]'
                disabled={true}
                value={selectedMember.date}
              />
            </div>
            {selectedRow === null && (
              <button type='submit' className='primary-btn-fit block mt-5 ml-auto'>
                Add
              </button>
            )}
            {onEditMember && (
              <div className='flex mt-4'>
                <button className='primary-btn-fit ml-auto w-20'>Save</button>
                <button
                  type='button'
                  className='secondary-btn w-20 ml-5'
                  onClick={onCancelEditMemberClick}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>

          <div className='flex mt-8'>
            <h2 className='text-xl lg:text-3xl  font-bold'>Borrowed History</h2>
            <select className='custom-select ml-auto'>
              <option value='1'>All</option>
            </select>
          </div>
          <div hidden={selectedMember.id === ''}>
            {(isMemberDataLoading || isMemberDataFetching) && <LoadingIndicator />}
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
