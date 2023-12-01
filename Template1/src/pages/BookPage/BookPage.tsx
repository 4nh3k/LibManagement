import Sidebar from 'src/components/Sidebar/Sidebar';
import AddBookForm from './AddBookForm';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
interface Props {
  onToggle?: () => void;
}

const BookPage: React.FC<Props> = ({ onToggle }: Props) => {
  return (
    <div className='h-screen w-screen overflow-auto'>
      <Sidebar />
      <div className='bg-background pt-2 pl-[4.25rem] desktop:pl-[6rem] w-full h-screen overflow-auto'>
        <div className='pl-10 pr-10'>
          <div className='flex justify-between  items-center'>
            <span className='text-2xl font-bold'>Book</span>
            <div className='inline'>
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
