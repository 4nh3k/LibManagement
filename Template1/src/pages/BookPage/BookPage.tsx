import Sidebar from 'src/components/Sidebar/Sidebar';
import AddBookForm from './AddBookForm';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
interface Props {
  onToggle?: () => void;
}

const BookPage: React.FC<Props> = ({ onToggle }) => {
  return (
    <div className='bg-background flex-row flex mr w-full h-full'>
      <Sidebar></Sidebar>
      <div className='flex-1 flex-row pl-10 items-center align-middle'>
        <div id='horizontal-header' className='mb-[30px] mt-2 flex-row items-center align-middle'>
          <span className='inline align-middle text-2xl font-bold'>Book</span>
          <div id='button-container' className='inline align-middle'>
            <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
          </div>
        </div>
        <AddBookForm onToggle={onToggle}></AddBookForm>
      </div>
    </div>
  );
};

export default BookPage;
