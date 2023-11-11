// MenuItem.tsx
import React from 'react';

interface MenuItemProps {
  iconSrc: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ iconSrc, label }) => {
  return (
    <div className="menu-item flex flex-col items-center justify-center gap-2">
          <img src={iconSrc} className="" width={32} height={32}></img>
          <span>{label}</span>
    </div>
  );
};

export default MenuItem;
