import Sidebar from 'src/components/Sidebar/Sidebar';
import AddBookForm from './AddBookForm';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
interface Props {
  onToggle?: () => void;
}

const BookPage: React.FC<Props> = ({ onToggle }: Props) => {
  return (
    <div className='h-screen w-screen'>
      <Sidebar />
      <div className='bg-background ml-auto w-[calc(100%-6.75rem)] h-full'>
        <div className='pl-10 items-center align-middle'>
          <div className='flex items-center align-middle'>
            <span className='align-middle text-2xl font-bold'>Book</span>
            <div className='inline align-middle'>
              <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
            </div>
          </div>

          <AddBookForm onToggle={onToggle}></AddBookForm>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
