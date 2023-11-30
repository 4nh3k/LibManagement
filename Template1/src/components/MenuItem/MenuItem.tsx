/* eslint-disable jsx-a11y/no-static-element-interactions */
// MenuItem.tsx
import React from 'react';
import { useState } from 'react';

interface MenuItemProps {
  iconSrc: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ iconSrc, label, isActive, onClick }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={`w-full py-2 menu-item flex flex-col items-center justify-center gap-2 
      ${isHover && !isActive ? 'bg-[#bab6c3]' : ''} 
      ${isActive ? 'bg-[#74727a]' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <img alt='menu-icon' src={iconSrc} width={32} height={32}></img>
      <span>{label}</span>
    </div>
  );
};

export default MenuItem;
