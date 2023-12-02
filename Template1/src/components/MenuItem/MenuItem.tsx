/* eslint-disable jsx-a11y/no-static-element-interactions */
// MenuItem.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  iconSrc: string;
  label: string;
  to?: string;
}

export function MenuItem({ iconSrc, label }: MenuItemProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <NavLink
      to={`/${label.toLowerCase()}`}
      className={({ isActive }) =>
        `hover:bg-gray-300 w-full px-2 py-2 mx-0 lg:px-2 menu-item flex items-center justify-center gap-2 ${
          isActive ? 'bg-gray-300' : ''
        }`
      }
    >
      <img alt='menu-icon' src={iconSrc} className='w-8 h-8 md:w-8 md:h-8'></img>
      <span className='hidden lg:block font-normal text-base'>{label}</span>
    </NavLink>
  );
}

export default MenuItem;
