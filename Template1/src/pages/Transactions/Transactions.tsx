import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ReturnCard from '../ReturnCard/ReturnCard';
import Table from 'src/components/Table/Table';
import ReturnCardList from '../ReturnCard/ReturnCardList';
const headers = ['Name', 'Age', 'Email'];
const data = [
  { Name: 'John', Age: 25, Email: 'john@example.com' },
  { Name: 'Jane', Age: 30, Email: 'jane@example.com' },
  { Name: 'Bob', Age: 40, Email: 'bob@example.com' }
];

const Transactions = () => {
  return (
    <div className='bg-background'>
      <Tabs>
        <TabList>
          <Tab>Borrow Card</Tab>
          <Tab>Return Card</Tab>
          <Tab>Fee Card</Tab>
          <Tab>Remind Card</Tab>
        </TabList>

        <TabPanel>
          <ReturnCard />
        </TabPanel>
        <TabPanel>
          <Table headers={headers} data={data} />
        </TabPanel>
        <TabPanel>
          <ReturnCardList></ReturnCardList>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Transactions;
