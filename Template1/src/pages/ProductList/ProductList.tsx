import website_logo from '../../assets/img/logo.png';
import library_img from '../../assets/img/library.png';
import book_img from '../../assets/img/book.png';
import member_img from '../../assets/img/group-chat.png';
import transaction_img from '../../assets/img/transaction.png';
import search_icon from '../../assets/img/icons8-search-128.png';
import user_icon from '../../assets/img/user.png';
import MenuItem from 'src/components/MenuItem/MenuItem';
import DropdownList from 'src/components/BookFilterDropdown/BookFilterDropdown';
import InputBox from 'src/components/InputBox';
import Button from 'src/components/Button';
import Book from 'src/components/Book/Book';

export default function ProductList() {
  return (
    <div className='flex flex-row h-screen'>
      <div className='bg-sidebarColor w-[113px]'>
        <div className='flex flex-col items-center justify-center gap-10'>
          <div className='items-center justify-center'>
            <img src={website_logo} className='p-2 text-center' width={60} height={60}></img>
          </div>
          <MenuItem iconSrc={library_img} label='Library'></MenuItem>
          <MenuItem iconSrc={book_img} label='Book'></MenuItem>
          <MenuItem iconSrc={member_img} label='Member'></MenuItem>
          <MenuItem iconSrc={transaction_img} label='Transaction'></MenuItem>
        </div>
      </div>
      <div className='bg-white flex-1 flex-row h-screen'>
        <div id='horizontal-header'>
          <DropdownList></DropdownList>
          <label>Keywords</label>
          <InputBox placeholder='Enter keywords' type='text'></InputBox>
          <label>Quantity</label>
          <InputBox placeholder='9568' type='number'></InputBox>
          <Button
            label='Search'
            bg_color='#5632A1'
            icon={search_icon}
            color='white'
            border_color='#D7C9FF'
          ></Button>
          <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {/* Column 1 */}
          <div className='bg-gray-100 p-4 w-200 h-150'>Column 1</div>

          {/* Column 2 */}
          <div className='bg-blue-100 p-4 w-200 h-150'>Column 2</div>

          {/* Column 3 */}
          <div className='bg-green-100 p-4 w-200 h-150'>Column 3</div>

          {/* Column 3 */}
          <div className='bg-green-100 p-4 w-200 h-150 '>Column 4</div>
        </div>
        <Book
          coverImg='https://th.bing.com/th/id/R.78230fd6985cb19fa95fea3268f5b3cc?rik=YUGIVNKQEz8fwg&pid=ImgRaw&r=0'
          overview='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          title='Enceladus'
          rating={4}
        ></Book>
      </div>
    </div>
  );
}
