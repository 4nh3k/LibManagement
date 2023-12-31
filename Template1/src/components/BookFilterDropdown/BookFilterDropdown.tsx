import React, { useState } from 'react';

interface DropdownListProps {
  list: string[];
  onChange: (value: string) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({ list, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    setSelectedValue(e.target.value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleSelectChange}
      className='px-3 py-1 rounded-lg block lg:inline border-2 focus:ring-1 focus:ring-gray-500 border-gray-200 appearance-none  outline-0 cursor-pointer'
    >
      {list.map(option => (
        <option key={option} value={option} className='rounded-none'>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownList;
