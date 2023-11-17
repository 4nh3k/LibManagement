import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ReturnCard from './ReturnCard/ReturnCard';
import Sidebar from 'src/components/Sidebar/Sidebar';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
import BorrowCard from './BorrowCard/BorrowCard';
import { useState } from 'react';
import BorrowCardForm from './BorrowCard/BorrowCardForm';
import ReturnCardForm from './ReturnCard/ReturnCardForm';
import FeeCard from './FeeCard/FeeCard';
import RemindCard from './RemindCard/RemindCard';

// import React, { useState } from 'react';
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
    <div className='bg-background flex flex-row h-screen'>
      <Sidebar></Sidebar>
      <div className='flex-1 flex-row h-screen pl-10'>
        <div id='horizontal-header' className='mb-10 mt-2 relative'>
          <span className='absolute left-50 text-2xl font-bold'>Transaction</span>
          <div id='button-container' className='absolute right-20'>
            <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
          </div>
        </div>
        <div id='tab-navigator'>
          <Tabs>
            <TabList>
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
    </div>
  );
};

export default Transactions;
