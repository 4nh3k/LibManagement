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
        `hover:bg-gray-100 rounded-lg px-4 py-3 mx-0 lg:px-2 menu-item flex justify-center lg:justify-start items-center gap-2 ${
          isActive ? 'bg-gray-200 hover:bg-gray-200' : ''
        }`
      }
    >
      <img alt='menu-icon' src={iconSrc} className='w-6 h-6 md:w-4 md:h-4' />
      <span className='hidden lg:block font-medium text-sm letter-spacing'>{label}</span>
    </NavLink>
  );
}

export default MenuItem;
