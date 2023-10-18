import { Link } from "react-router-dom";
import SeachParams from "../services/orderChainSearchParams";
import { ORDERPURCHASE_STATE } from "../../util/constant";
import { DATETIME_FORMAT } from "../../config/sysConfig";
import dayjs from "dayjs";
import { Table, Card, Button } from "antd";
import { useEffect, useState } from "react";
import { getOrderPurchase } from "../../api/orderApi";
import type { OrderPurchaseType } from "../../util/variableTypes";
import type { ColumnsType } from "antd/es/table";

const columns: ColumnsType<OrderPurchaseType> = [
  {
    title: "Order Activity Id",
    dataIndex: "id",
  },
  {
    title: "Order Activity Name",
    dataIndex: "name",
  },
  {
    title: "Order start time",
    dataIndex: "startTime",
    // dayjs(time) change string to date
    render: (time: string) => dayjs(time).format(DATETIME_FORMAT),
  },
  {
    title: "Order end time",
    dataIndex: "endTime",
    render: (time: string) => dayjs(time).format(DATETIME_FORMAT),
  },
  {
    title: "Order state",
    dataIndex: "state",
    // state valuse： 0 1 2 3  
    render: (state: number) => ORDERPURCHASE_STATE[state],
  },
  {
    title: "start",
    render: (row) => (
      <Link to={"/orderPurchaseDetail/" + row.id}>Search Details</Link>
    ),
  },
];
const baseParams = {
  order: "asc",
  state: "",
  id: "",
  name: "",
  products: "",
  shop: "",
  startTime: "",
  endTime: "",
};

function OrderPurchase() {
 
  const [pagination, setpagination] = useState({ total: 1, current: 1 });
  // default parameters
  const [params, setParams] = useState<OrderPurchaseType>(baseParams);
  const [orderPurchaseList, setOrderPurchaseList] = useState<OrderPurchaseType[]>([]);
  
  const reset = () => {
    setParams(baseParams);
    //can't get the latest params when requested at the first time, need second request
    // getOrderChain()
  };

  //get order info
  function getOrderChain() {
    getOrderPurchase({ ...params, current: pagination.current }).then((res) => {      
      setOrderPurchaseList(res.data.data);
      var p = res.data.pagination;
      setpagination({ current: Number(p.current), total: p.total });
      console.log(res.data.data);
    });
  }

  useEffect(() => {
    getOrderChain();
  }, [pagination.current]);

  //listen
  useEffect(() => {
   
    // if params changed and  == baseParams, then send request
    if (params === baseParams) {
      // params is new and get order bill lists
      getOrderChain();
    }
  }, [params]);
  return (
    <div>
      <h3>Order Bill</h3>
      <Card
        type="inner"
        title={
          <span>
            Search<Button 
            style={{ marginLeft: 32 }}> <Link to="/order/components/createOrderPurchase">+ Create Order Bill</Link></Button>
          </span>
        }
      >
        <SeachParams
          reset={reset}
          params={params}
          setParams={setParams}
          getOrderChain={getOrderChain}
        />
      </Card>
      <Card type="inner" title={<span>Order List</span>}>
        <Table
          size="small"
          onChange={(pa: any) => {
            setpagination({ ...pagination, current: pa.current });
          }}
          pagination={pagination}
          rowKey="id"
          columns={columns}
          dataSource={orderPurchaseList}
        />
      </Card>
    </div>
  );
}

export default OrderPurchase;
