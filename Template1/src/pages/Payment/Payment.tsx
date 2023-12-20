import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Sidebar from 'src/components/Sidebar/Sidebar';
import Button from 'src/components/Button';
import user_icon from '../../assets/img/user.png';
import TopUp from './TopUp/TopUp';
import PaymentForm from './PaymentForm';

// import React, { useState } from 'react';
const Payment = () => {
  return (
    <div className='bg-gray-100 h-screen w-screen overflow-auto'>
      <div className='bg-gray-100 pt-2 ml-5 pl-20 lg:pl-36 w-full overflow-auto flex-1 flex-row h-screen'>
        <div id='horizontal-header' className='pl-5 pr-5 lg:pr-10 py-2'>
          <div className='flex justify-between items-center'>
            <span className='text-xl lg:text-2xl font-bold'>Payment</span>
            <div className='inline'>
              <Button label='User' bg_color='#E0E0E0' icon={user_icon} color='black'></Button>
            </div>
          </div>
        </div>
        <div id='tab-navigator text-center'>
          <Tabs>
            <TabList>
              <Tab>Top Up</Tab>
              <Tab>Payment</Tab>
            </TabList>
            <TabPanel>
              <TopUp></TopUp>
            </TabPanel>
            <TabPanel>
              <PaymentForm></PaymentForm>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Payment;
