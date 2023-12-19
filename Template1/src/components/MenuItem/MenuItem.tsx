/* eslint-disable jsx-a11y/no-static-element-interactions */
// MenuItem.tsx
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  iconSrc: string;
  label: string;
  to?: string;
}

export function MenuItem({ iconSrc, label, to }: MenuItemProps) {
  return (
    <NavLink
      to={`/${to === '' || to ? to : label.toLowerCase()}`}
      className={({ isActive }) =>
        `hover:bg-gray-300 lg:w-36 w-full px-4 py-2 mx-0 lg:px-2 menu-item flex justify-center lg:justify-start items-center gap-2 ${
          isActive ? 'bg-gray-300' : ''
        }`
      }
    >
      <img alt='menu-icon' src={iconSrc} className='w-6 h-6 md:w-6 md:h-6' />
      <span className='hidden lg:block font-medium text-xs uppercase'>{label}</span>
    </NavLink>
  );
}

export default MenuItem;
