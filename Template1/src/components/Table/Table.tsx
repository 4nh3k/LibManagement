import React from 'react';
import InputBox from '../InputBox';
import DropdownList from '../BookFilterDropdown/BookFilterDropdown';
import Button from '../Button';
import icon_search from '../../assets/img/search_icon.svg';
import icon_edit from '../../assets/img/edit.png';
import icon_trash from '../../assets/img/trash.png';
import icon_add from '../../assets/img/add.png'

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
    <>
      <div id='utilsRow' className='bg-white flex'>
        <div className='inline-flex ml-6 items-center gap-5 align-middle'>
          <span className='inline-block align-middle'>Show</span>
          <InputBox placeholder='1' type='number'></InputBox>
          <span className='inline-block align-middle'>entries</span>
        </div>
        <div className='inline-flex ml-12 md:ml-20 items-center align-middle'>
          <div className='inline-flex bg-white text-black pt-2 pb-2 pl-3 pr-3 rounded-xl border-2 overflow-hidden'>
            <img alt='icon-search' src={icon_search} className='w-6 mr-3'></img>
            <input
              className='w-64 p-0 m-0 bg-white  outline-0'
              placeholder='Search'
              type='string'
            ></input>
          </div>
        </div>
        <div className='inline-flex ml-auto items-center align-middle mr-10'>
          <DropdownList list={['UserID', 'BorrowCardID']}></DropdownList>
        </div>
        <div className='inline-flex items-center align-middle mr-5 space-x-5'>
          <Button label='All' bg_color='#C0BBF4' color='#5632A1'></Button>
          <Button label='Add' icon={icon_add} bg_color='#E8E7FD' color='#9C55F6'></Button>
        </div>
      </div>
      <table className='w-full border-collapse table-auto bg-white text-left text-sm text-black'>
        <thead className='bg-white'>
          <tr>
            {headers.map(header => (
              <th className='px-6 py-6 font-bold text-gray-900 text-center' key={header.dataIndex}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100 border-t  border-gray-100'>
          {data.map((row, index) => (
            <tr className={` ${index % 2 === 0 ? 'bg-[#F7F6FE]' : 'bg-white'}`} key={index}>
              {headers.map(header => (
                <td className='px-6 py-6 text-center' key={header.dataIndex}>
                  {/* Check if the cell value is a React component */}
                  {header.dataIndex === 'action' ? (
                    <div className='inline-flex gap-5'>
                      <img alt='icon-edit' src={icon_edit}></img>
                      <img alt='icon-trash' src={icon_trash}></img>
                    </div>
                  ) : // If it's not a component, render the text
                  row[header.dataIndex] !== undefined ? (
                    row[header.dataIndex]
                  ) : (
                    'N/A'
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={`text-center px-6 py-6 align-middle items-center ${
          data.length % 2 === 0 ? 'bg-[#F7F6FE]' : 'bg-white'
        } justify-center flex-row gap-5`}
      >
        <div className='inline pr-10 hover:text-[#4d6be3]'>Previous</div>
        <div id='pagination' className='inline flex-row gap-5'>
          <button className='bg-[#9E9E9E] hover:bg-[#624DE3] text-white font-bold py-2 px-3 rounded-lg mx-3'>
            1
          </button>
          <button className='bg-[#E0E0E0] hover:bg-[#624DE3] text-white font-bold py-2 px-3 rounded-lg mx-3'>
            2
          </button>
          <button className='bg-[#E0E0E0] hover:bg-[#624DE3] text-white font-bold py-2 px-3 rounded-lg mx-3'>
            3
          </button>
        </div>
        <div className='inline pl-10 hover:text-[#4d6be3]'>Next</div>
      </div>
    </>
  );
};

export default Table;
