import React, { useState } from "react";
import ChartDonut from './ChartDonut';
import CardGridMap from "./CardGridMap";
import TableBase from "./TableBase";
import {
  Title,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";
import { 
  UserGroupIcon, 
  UserIcon,
} from "@heroicons/react/24/solid";
import { Space } from "antd";

const DashboardBase = () => {
  const [selectedView, setSelectedView] = useState(1);

  return (
    <div>
      <Title>Dashboard</Title>
      <Text>Supply Chain Process</Text>
      <TabGroup>
        <TabList
          defaultValue={selectedView}
          className="mt-6"
          onSelect={(value:any) => setSelectedView(value)}
        >
          <Tab value={1} icon={UserGroupIcon}>"Principal"</Tab>
          <Tab value={2} icon={UserIcon}>"Details"</Tab>
        </TabList>
      </TabGroup>

      <Card className="max-w-xs mx-auto">
    <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className="mt-4">
      <Text>32% of annual target</Text>
      <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar value={32} className="mt-2" />
  </Card>

      {selectedView === 1 ? (
        <>
        <CardGridMap/>
        <Card>
            <ChartDonut />
        </Card>
        </>
      ) : (
        <>
          <p className='mt-6'>
            <TableBase />
          </p>
        </>
      )}
    </div>
  );
};

export default DashboardBase;
