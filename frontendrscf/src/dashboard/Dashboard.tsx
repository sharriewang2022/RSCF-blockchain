import { Title, Text, TabList, TabGroup, Tab, Card } from "@tremor/react";
import React, { useState } from "react";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import ChartDonut from './ChartDonut';
import CardGridMap from "./CardGridMap";
import TableBase from "./TableBase";

const DashboardBase = () => {
  const [selectedView, setSelectedView] = useState(1);

  return (
    <main className="bg-slate-200 p-6 sm:p-10 h-screen">
      <Title>Dashboard</Title>
      <Text>Supply Chain Process</Text>
      <TabGroup>
        <TabList
          defaultValue={selectedView}
          className="mt-6"
          onSelect={(value:any) => setSelectedView(value)}
        >
          <Tab value={1} icon={HandThumbUpIcon}>"Principal"</Tab>
          <Tab value={2} icon={HandThumbDownIcon}>"Details"</Tab>
        </TabList>
      </TabGroup>
      {selectedView === 1 ? (
        <>
        <CardGridMap/>

        <p className="mt-6">
          <Card>
              <ChartDonut />
          </Card>
        </p>
        </>
      ) : (
        <>
          <p className='mt-6'>
            <TableBase />
          </p>
        </>
      )}
    </main>
  );
};

export default DashboardBase;
