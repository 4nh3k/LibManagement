import website_logo from '../../assets/img/logo.png';
import library_img from '../../assets/img/library.png';
import book_img from '../../assets/img/book.png';
import member_img from '../../assets/img/group-chat.png';
import transaction_img from '../../assets/img/transaction.png';
import MenuItem from 'src/components/MenuItem/MenuItem';

const Sidebar = () => {
  return (
    <div className='bg-sidebarColor w-[100px]'>
        <div className='flex flex-col items-center justify-center gap-10'>
          <div className='text-center items-center justify-center'>
            <img src={website_logo} className='p-2 text-center' width={60} height={60}></img>
            <span className='font-bold text-xl'>LibMa</span>
          </div>
          <MenuItem iconSrc={library_img} label='Library'></MenuItem>
          <MenuItem iconSrc={book_img} label='Book'></MenuItem>
          <MenuItem iconSrc={member_img} label='Member'></MenuItem>
          <MenuItem iconSrc={transaction_img} label='Transaction'></MenuItem>
        </div>
    </div>
  );
};

export default Sidebar;
