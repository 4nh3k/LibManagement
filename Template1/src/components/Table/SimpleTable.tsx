import React, { useState } from 'react';
import icon_edit from '../../assets/img/edit.png';
import icon_trash from '../../assets/img/trash.png';
import { number } from 'prop-types';
import { classNames } from 'classnames';
interface Header {
  title: string;
  dataIndex: string;
}

interface TableProps {
  headers: Header[];
  data: any[];
  className?: string;
  classNameHeader?: string;
  onSelect?: (row: any, index: number) => void;
  selectedRow?: number | null;
  onRowClick?: (row: any) => void;
}

const SimpleTable: React.FC<TableProps> = ({
  headers,
  data,
  className,
  classNameHeader = 'bg-gray-100',
  onSelect,
  selectedRow,
  onRowClick
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const handleRowClick = (row: any, index: number) => {
    setSelected(index);
    if (onRowClick) {
      onRowClick(row);
    }
    if (onSelect) {
      onSelect(row, index);
    }
  };

  const getSelectedRow = () => {
    if (selectedRow !== undefined) {
      return selectedRow;
    }
    return selected;
  };

  return (
    <div className={className}>
      <table className='w-full border-collapse table-auto bg-white text-left text-sm text-gray-500'>
        <thead className={classNameHeader}>
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
            <tr
              className={` ${getSelectedRow() === index ? 'bg-primary2/10' : 'hover:bg-[#F7F6FE]'}`}
              key={index}
              onClick={() => handleRowClick(row, index)}
            >
              {headers.map(header => (
                <td className='px-6 py-4' key={header.dataIndex}>
                  {header.dataIndex === 'action' ? (
                    <div className='inline-flex gap-1 lg:gap-5'>
                      <img alt='icon-edit' src={icon_edit}></img>
                      <img alt='icon-trash' src={icon_trash}></img>
                    </div>
                  ) : // If it's not a component, render the text
                  row[header.dataIndex] !== undefined ? (
                    row[header.dataIndex]
                  ) : (
                    'N/A'
                    /*{ Check if the cell value is a React component
                  {typeof row[header.dataIndex] === 'object' ? (
                    // If it's a component, render it
                    <>{row[header.dataIndex]}</>
                  ) : (
                    // If it's not a component, render the text
                    row[header.dataIndex] */
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
