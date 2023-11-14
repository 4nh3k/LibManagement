import React from 'react';

interface TableProps {
  headers: string[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
      <thead className='bg-gray-50'>
        <tr>
          {headers.map(header => (
            <th className='px-6 py-4 font-medium text-gray-900' key={header}>
              {header}
            </th>
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
