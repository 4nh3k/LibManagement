import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useState } from 'react';
import ReturnCard from './ReturnCard/ReturnCard';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
import BorrowCard from './BorrowCard/BorrowCard';
import BorrowCardForm from './BorrowCard/BorrowCardForm';
import ReturnCardForm from './ReturnCard/ReturnCardForm';
import FeeCard from './FeeCard/FeeCard';
import RemindCard from './RemindCard/RemindCard';

const Transactions = () => {
  const [showBorrowForm, setShowBorrowForm] = useState(false);

  const toggleBorrowForm = () => {
    setShowBorrowForm(showBorrowForm => !showBorrowForm);
  };

  const [showReturnForm, setShowReturnForm] = useState(false);

  const toggleReturnForm = () => {
    setShowReturnForm(showReturnForm => !showReturnForm);
  };

  return (
    <div className='p-4'>
      <div id='horizontal-header' className='pl-2 pr-5 lg:pr-10 py-2'>
        <div className='flex justify-between items-center'>
          <span className='text-xl lg:text-2xl font-bold'>Transaction</span>
          <div className='inline'>
            <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
          </div>
        </div>
      </div>

      <div id='tab-navigator text-center'>
        <Tabs>
          <TabList className='flex flex-col lg:flex-row max-w-fit mb-10'>
            <Tab>Borrow Card</Tab>
            <Tab>Return Card</Tab>
            <Tab>Fee Card</Tab>
            <Tab>Remind Card</Tab>
          </TabList>

          <TabPanel>
            {!showBorrowForm && <BorrowCard onToggle={toggleBorrowForm} />}
            {showBorrowForm && <BorrowCardForm onToggle={toggleBorrowForm}></BorrowCardForm>}
          </TabPanel>
          <TabPanel>
            {!showReturnForm && <ReturnCard onToggle={toggleReturnForm}></ReturnCard>}
            {showReturnForm && <ReturnCardForm onToggle={toggleReturnForm}></ReturnCardForm>}
          </TabPanel>
          <TabPanel>
            <FeeCard></FeeCard>
          </TabPanel>
          <TabPanel>
            <RemindCard></RemindCard>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Transactions;
