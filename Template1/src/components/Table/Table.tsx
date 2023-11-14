import React from 'react';

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
