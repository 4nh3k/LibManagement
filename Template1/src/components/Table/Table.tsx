import React from 'react';
import InputBox from '../InputBox';
import DropdownList from '../BookFilterDropdown/BookFilterDropdown';
import Button from '../Button';
import icon_search from '../../assets/img/search_icon.svg';
import icon_add from '../../assets/img/add.png';
import SimpleTable from './SimpleTable';

interface Header {
  title: string;
  dataIndex: string;
}

interface TableProps {
  headers: Header[];
  data: any[];
  onToggle?: () => void;
  onAdd?: boolean;
}

const Table: React.FC<TableProps> = ({ headers, data, onToggle, onAdd = true }) => {
  return (
    <div className='w-full flex flex-col'>
      <div
        id='utilsRow'
        className='bg-white w-full m-auto flex flex-col items-center gap-y-5 lg:flex-row overflow-y-auto'
      >
        <div className='inline-flex ml-1 lg:ml-6 items-center gap-5 align-middle'>
          <span className='inline-block align-middle'>Show</span>
          <InputBox placeholder='1' type='number'></InputBox>
          <span className='inline-block align-middle'>entries</span>
        </div>
        <div className='inline-flex ml-1 lg:ml-12 md:ml-20 items-center align-middle'>
          <div className='inline-flex bg-white text-black pt-2 pb-2 pl-3 pr-3 rounded-xl border-2 overflow-hidden'>
            <img alt='icon-search' src={icon_search} className='w-6 mr-3'></img>
            <input
              className='w-32 lg:w-64 p-0 m-0 bg-white  outline-0'
              placeholder='Search'
              type='string'
            ></input>
          </div>
        </div>
        <div className='inline-flex ml-auto mr-auto items-center'>
          <DropdownList list={['UserID', 'BorrowCardID']}></DropdownList>
        </div>
        <div className='inline-flex items-center align-middle ml-auto mr-auto lg:mr-5 space-x-5'>
          <Button label='All' bg_color='#C0BBF4' color='#5632A1'></Button>
          {onAdd && (
            <Button
              label='Add'
              icon={icon_add}
              bg_color='#E8E7FD'
              color='#9C55F6'
              onclick={onToggle}
            ></Button>
          )}
        </div>
      </div>
      <SimpleTable
        className='overflow-x-auto rounded-md overflow-hidden shadow-md mt-4'
        headers={headers}
        data={data}
      ></SimpleTable>
      <div className='flex mt-5 items-center'>
        <div className='inline ml-auto mr-auto lg:pr-10 hover:text-[#4d6be3]'>Previous</div>
        <div id='pagination' className='inline flex-row gap-5'>
          <button className='bg-[#9E9E9E] hover:bg-[#624DE3] text-white font-bold py-2 px-2 lg:px-3 rounded-lg mx-3'>
            1
          </button>
          <button className='bg-[#E0E0E0] hover:bg-[#624DE3] text-white font-bold py-2 px-2 lg:px-3 rounded-lg mx-3'>
            2
          </button>
          <button className='bg-[#E0E0E0] hover:bg-[#624DE3] text-white font-bold py-2 px-2 lg:px-3 rounded-lg mx-3'>
            3
          </button>
        </div>
        <div className='inline ml-auto mr-auto lg:pl-10 hover:text-[#4d6be3]'>Next</div>
      </div>
    </div>
  );
};

export default Table;
