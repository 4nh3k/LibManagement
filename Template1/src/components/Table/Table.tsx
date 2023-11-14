import React from 'react';
import InputBox from '../InputBox';
import DropdownList from '../BookFilterDropdown/BookFilterDropdown';
import Button from '../Button';

interface TableProps {
  headers: string[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
      <thead className='bg-gray-50'>
        <tr>
          <td colSpan={6} className='relative'>
            <div className='ml-6 inline-flex items-center gap-5 align-middle' >
              <label className='inline-block align-middle'>Show</label>
              <InputBox placeholder='1' type='number'></InputBox>
              <label className='inline-block align-middle'>entries</label>
            </div>
            <div className='ml-10 inline-flex items-center align-middle'>
              <InputBox placeholder='Search' type='string'></InputBox>
            </div>
            <div className='ml-10 inline-flex items-center align-middle'>
              <DropdownList list={["UserID", "BorrowCardID"]}></DropdownList>
            </div>
            <Button label='All' bg_color='#C0BBF4' color='#5632A1'></Button>
          </td>
        </tr>
        <tr>
          {headers.map(header => (
            <td className='px-6 py-4 font-medium text-gray-900' key={header}>
              {header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
        {data.map((row, index) => (
          <tr className='hover:bg-gray-50' key={index}>
            {headers.map(header => (
              <td className='px-6 py-4' key={header}>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
