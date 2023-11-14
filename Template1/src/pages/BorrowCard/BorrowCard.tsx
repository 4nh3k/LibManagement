import Sidebar from 'src/components/Sidebar/Sidebar'
import Button from 'src/components/Button'
import user_icon from '../../assets/img/user.png';
import Table from 'src/components/Table/Table';
function BorrowCard() {
  return (
    <div className='flex flex-row h-screen'>
      <Sidebar></Sidebar>
      <div className='bg-white flex-1 flex-row h-screen'>
        <div id='horizontal-header' className='mb-10 mt-2 relative'>
          <span className='absolute left-50 text-2xl font-bold'>Transaction</span>
          <div id='button-container' className='absolute right-20'>
						<Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
					</div>
        </div>
				<div id='body' className='mt-20 mr-20'>
					<span className='text-xl font-bold'>Borrow Card List</span>
					<Table headers={["BorrowCardID", "AdminID", "ReaderID", "Date", "Status", "Action"]} data={[]}></Table>
				</div>
      </div>
    </div>
  )
}

export default BorrowCard