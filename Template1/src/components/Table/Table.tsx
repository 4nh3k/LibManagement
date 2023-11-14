import React from 'react';
import InputBox from '../InputBox';
import DropdownList from '../BookFilterDropdown/BookFilterDropdown';
import Button from '../Button';

interface Header {
  title: string;
  dataIndex: string;
}

interface TableProps {
  headers: Header[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className='w-full border-collapse table-auto bg-white text-left text-sm text-gray-500'>
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
            <th className='px-6 py-4 font-bold text-gray-900' key={header.dataIndex}>
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-100 border-t  border-gray-100'>
        {data.map((row, index) => (
          <tr className='hover:bg-[#F7F6FE]' key={index}>
            {headers.map(header => (
              <td className='px-6 py-4' key={header.dataIndex}>
                {/* Check if the cell value is a React component */}
                {typeof row[header.dataIndex] === 'object' ? (
                  // If it's a component, render it
                  <>{row[header.dataIndex]}</>
                ) : (
                  // If it's not a component, render the text
                  row[header.dataIndex]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
