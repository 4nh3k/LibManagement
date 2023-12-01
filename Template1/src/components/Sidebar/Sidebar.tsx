import website_logo from '../../assets/img/logo.png';
import library_img from '../../assets/img/library.png';
import book_img from '../../assets/img/book.png';
import member_img from '../../assets/img/group-chat.png';
import transaction_img from '../../assets/img/transaction.png';
import MenuItem from 'src/components/MenuItem/MenuItem';
import { useState } from 'react';

const Sidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (label: string) => {
    setActiveMenuItem(label);
  };

  return (
    <div className='bg-sidebarColor fixed top-0 left-0 bottom-0'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-center items-center justify-center mx-1 lg:mx-2'>
          <img
            alt='Website Logo'
            src={website_logo}
            className='p-2 text-center w-[3.75rem] h-[3.75rem]'
          ></img>
          <span className='font-bold text-xl hidden lg:block'>LibMa</span>
        </div>
        <MenuItem
          iconSrc={library_img}
          label='Library'
          onClick={() => handleMenuItemClick('Library')}
          isActive={activeMenuItem === 'Library'}
        ></MenuItem>
        <MenuItem
          iconSrc={book_img}
          label='Book'
          onClick={() => handleMenuItemClick('Book')}
          isActive={activeMenuItem === 'Book'}
        ></MenuItem>
        <MenuItem
          iconSrc={member_img}
          label='Member'
          onClick={() => handleMenuItemClick('Member')}
          isActive={activeMenuItem === 'Member'}
        ></MenuItem>
        <MenuItem
          iconSrc={transaction_img}
          label='Transaction'
          onClick={() => handleMenuItemClick('Transaction')}
          isActive={activeMenuItem === 'Transaction'}
        ></MenuItem>
      </div>
    </div>
  );
};

export default Sidebar;
