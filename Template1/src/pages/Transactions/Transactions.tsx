import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ReturnCard from '../ReturnCard/ReturnCard';
import Sidebar from 'src/components/Sidebar/Sidebar';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
import BorrowCard from '../BorrowCard/BorrowCard';
// import React, { useState } from 'react';
const Transactions = () => {

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
              <BorrowCard />
            </TabPanel>
            <TabPanel>
              <ReturnCard></ReturnCard>
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
