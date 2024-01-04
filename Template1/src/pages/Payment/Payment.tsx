import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import User from 'src/components/User/User';
import PaymentForm from './PaymentForm';
import TopUp from './TopUp/TopUp';

// import React, { useState } from 'react';
const Payment = () => {
  return (
    <div className='bg-white w-full h-full overflow-hidden'>
      <div className='bg-white pt-2 ml-5 w-full overflow-auto flex-1 flex-row h-screen'>
        <div id='horizontal-header' className='pl-5 pr-5 lg:pr-10 py-2'>
          <div className='flex justify-between items-center'>
            <span className='text-xl lg:text-2xl font-bold'>Payment</span>
            <div className='inline'>
              <User></User>
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
              <TopUp />
            </TabPanel>
            <TabPanel>
              <PaymentForm />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Payment;
