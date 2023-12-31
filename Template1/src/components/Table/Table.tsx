import React, { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import DropdownList from '../BookFilterDropdown/BookFilterDropdown';

import SimpleTable from './SimpleTable';

interface Header {
  title: string;
  dataIndex: string;
}

interface TableProps {
  headers: Header[];
  data: any[];
  onToggle?: () => void;
  deleteAction?: (row: any) => void;
  onAdd?: boolean;
}

const Table: React.FC<TableProps> = ({ headers, data, onToggle, onAdd = true, deleteAction }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleEntriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`bg-[#E0E0E0] hover:bg-[#aba1e7] text-white font-bold py-2 px-2 lg:px-3 rounded-lg mx-3 ${
            currentPage === i ? 'bg-[#624DE3]' : ''
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className='w-full flex bg-gray flex-col'>
      <div
        id='utilsRow'
        className='w-full m-auto flex flex-col items-center gap-y-5 lg:flex-row overflow-y-auto'
      >
        <div className='inline-flex ml-1 items-center gap-5  py-4 align-middle'>
          <span className='inline-block align-middle'>Show</span>
          <input
            className='px-2 py-1 border-gray-200 border-2 outline-none rounded-lg font-medium text-black'
            placeholder={'5'}
            type={'number'}
            value={itemsPerPage}
            onChange={handleEntriesChange}
            min={1}
            max={6}
          />
          <span className='inline-block align-middle'>entries</span>
        </div>
        <div className='inline-flex ml-1 lg:ml-12 md:ml-20 items-center align-middle'>
          <div className='inline-flex bg-white text-black pt-2 pb-2 pl-3 pr-3 rounded-xl border-2 overflow-hidden'>
            <PiMagnifyingGlass className='mr-2' size={24} color={'gray'} />
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
        <div className='inline-flex items-center align-middle ml-auto space-x-5'>
          {onAdd && (
            <button className='primary-btn' onClick={onToggle}>
              Add
            </button>
          )}
        </div>
      </div>
      <SimpleTable
        className='overflow-x-auto rounded-md overflow-hidden shadow-md mt-4'
        headers={headers}
        data={currentItems}
        deleteAction={deleteAction}
      ></SimpleTable>
      <div className='flex mt-5 items-center'>
        <div
          className='inline ml-auto mr-auto lg:pr-10 hover:text-[#4d6be3]'
          onClick={handlePreviousPage}
        >
          Previous
        </div>
        <div id='pagination' className='inline flex-row gap-5'>
          {renderPaginationButtons()}
        </div>
        <div
          className='inline ml-auto mr-auto lg:pl-10 hover:text-[#4d6be3]'
          onClick={handleNextPage}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default Table;
