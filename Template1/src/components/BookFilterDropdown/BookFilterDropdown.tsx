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
      className='p-2 bg-[#E5E1E1] rounded-lg block desktop:inline border-none outline-0'
    >
      {list.map(option => (
        <option key={option} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownList;

