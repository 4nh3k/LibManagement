import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import book from 'src/assets/icons/book.svg';
import group from 'src/assets/icons/group.svg';
import library from 'src/assets/icons/library.svg';
import transaction from 'src/assets/icons/transaction.svg';
import account from 'src/assets/icons/user.svg';
import configuration from 'src/assets/img/configuration.png';
import payment from 'src/assets/img/payment.png';
import MenuItem from 'src/components/MenuItem';
import website_logo from '../../assets/icons/AHB Logo.svg';
import small_website_logo from '../../assets/icons/AHB Small Logo.svg';

interface SidebarProp {
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProp> = ({ isAdmin = false }: SidebarProp) => {
  // Initialize state for the media query match
  const [isMobile, setIsMobile] = useState(false);

  // Define the media query
  const mobileMediaQuery = window.matchMedia('(max-width: 1024px)');

  // Function to update the state based on the media query match
  const handleMediaQueryChange = event => {
    setIsMobile(event.matches);
  };

  // useEffect to add and remove event listener for media query changes
  useEffect(() => {
    // Set initial state based on the media query
    setIsMobile(mobileMediaQuery.matches);

    // Add event listener for media query changes
    const mediaQueryListener = event => handleMediaQueryChange(event);
    mobileMediaQuery.addListener(mediaQueryListener);

    // Clean up the event listener when the component unmounts
    return () => {
      mobileMediaQuery.removeListener(mediaQueryListener);
    };
  }, [mobileMediaQuery]);

  return (
    <div className='bg-gray-50 shadow fixed top-0 left-0 bottom-0 w-18 lg:w-64'>
      <div className='flex flex-col items-center justify-center'>
        <ul className='flex flex-col mt-2 gap-[0.1rem] w-full px-3'>
          <Link
            to='/'
            className='w-fit text-center flex items-center justify-center mx-1 lg:mx-2 shrink-0'
          >
            {!isMobile && (
              <img
                alt='Website Logo'
                src={website_logo}
                className='hidden lg:block p-2 text-center max-w-full h-auto '
              />
            )}
            {isMobile && (
              <div className='rounded-lg px-4 py-3 mx-0 lg:px-2 menu-item flex justify-center lg:justify-start items-center '>
                <img alt='menu-icon' src={small_website_logo} className='w-4 h-4 ' />
              </div>
            )}
          </Link>
          <MenuItem iconSrc={library} label='Library' to='' />
          <MenuItem
            iconSrc={transaction}
            label='Transaction'
            to={isAdmin ? 'admin/transactions' : 'transactions'}
          />
          {isAdmin && <MenuItem iconSrc={book} label='Book' to='admin/booklist' />}
          {isAdmin && <MenuItem iconSrc={group} label='Member' to='admin/member' />}
          {isAdmin && (
            <MenuItem
              iconSrc={configuration}
              label='Configuration'
              to='admin/configuration'
            ></MenuItem>
          )}
          {!isAdmin && <MenuItem iconSrc={account} label='Account' to='account'></MenuItem>}
          {!isAdmin && <MenuItem iconSrc={payment} label='Payment'></MenuItem>}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
