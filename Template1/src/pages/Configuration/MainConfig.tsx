import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Sidebar from 'src/components/Sidebar/Sidebar';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
import BookConfig from './Book/BookConfig';
import ReaderConfig from './Reader/ReaderConfig';
import TransactionConfig from './Transaction/TransactionConfig';

// import React, { useState } from 'react';
const Configuration = () => {
  return (
    <div className='bg-background flex flex-row h-screen'>
      <Sidebar></Sidebar>
      <div className='flex-1 flex-row h-screen pl-10'>
        <div id='horizontal-header' className='mb-10 mt-2 relative'>
          <span className='absolute left-50 text-2xl font-bold'>Configuration</span>
          <div id='button-container' className='absolute right-20'>
            <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
          </div>
        </div>
        <div id='tab-navigator'>
          <Tabs>
            <TabList>
              <Tab>Reader</Tab>
              <Tab>Book</Tab>
              <Tab>Transaction</Tab>
            </TabList>
            <TabPanel>
              <ReaderConfig></ReaderConfig>
            </TabPanel>
            <TabPanel>
              <BookConfig></BookConfig>
            </TabPanel>
            <TabPanel>
              <TransactionConfig></TransactionConfig>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
