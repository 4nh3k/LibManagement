// DropdownList.tsx
import React, { useState } from 'react';

const DropdownList: React.FC = () => {
  // State to track the selected value
  const [selectedValue, setSelectedValue] = useState<string>('');

  // Handler for changing the selected value
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
      <select value={selectedValue} onChange={handleSelectChange} className="p-2">
        <option value="all_books">All books</option>
        <option value="genre">Genre</option>
        <option value="subject">Subject</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>
  );
};

export default DropdownList;
