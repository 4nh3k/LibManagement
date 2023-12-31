import React, { useState } from 'react';
import { PiNotePencil, PiTrash } from 'react-icons/pi';
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
  deleteAction?: (row: any) => void;
  editAction?: (row: any) => void;
  canSelected?: boolean;
  onRowClick?: (row: any) => void;
  nullMessage?: string;
}

const SimpleTable: React.FC<TableProps> = ({
  headers,
  data,
  className,
  classNameHeader = 'bg-gray-100',
  onSelect,
  selectedRow,
  deleteAction,
  editAction,
  canSelected,
  nullMessage,
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
          {data.length === 0 && (
            <tr>
              <td colSpan={headers.length} className='text-center py-5'>
                {nullMessage || 'No data'}
              </td>
            </tr>
          )}
          {data.map((row, index) => (
            <tr
              className={` ${
                canSelected && getSelectedRow() === index ? 'bg-primary2/10' : 'hover:bg-[#F7F6FE]'
              }`}
              key={index}
              onClick={() => handleRowClick(row, index)}
            >
              {headers.map(header => (
                <td className='px-6 py-4' key={header.dataIndex}>
                  {header.dataIndex === 'action' ? (
                    <div className='inline-flex gap-1 lg:gap-5'>
                      {editAction && <PiNotePencil className='text-primary' size={24} />}
                      {deleteAction && (
                        <button
                          type='button'
                          onClick={() => {
                            deleteAction && deleteAction(row);
                          }}
                        >
                          <PiTrash className='text-red-500' size={24} />
                        </button>
                      )}
                    </div>
                  ) : // If it's not a component, render the text
                  row[header.dataIndex] !== undefined ? (
                    typeof row[header.dataIndex] === 'object' ? (
                      // If it's a component, render it
                      <>{row[header.dataIndex]}</>
                    ) : (
                      // If it's not a component, render the text
                      row[header.dataIndex]
                    )
                  ) : (
                    'N/A'
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
