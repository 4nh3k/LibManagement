import React, { useState } from 'react';

interface DropdownListProps {
  list: string[];
}

const DropdownList: React.FC<DropdownListProps> = ({ list }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleSelectChange}
      className='px-3 py-1 rounded block lg:inline border-2 focus:ring-1 focus:ring-gray-500 border-gray-500 appearance-none  outline-0 font-semibold cursor-pointer'
    >
      {list.map(option => (
        <option key={option} value={option.toLowerCase()} className='rounded-none font-medium'>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownList;
