import { Link } from "react-router-dom";
import SeachParams from "../services/orderChainSearchParams";
import { ORDERPURCHASE_STATE, DATETIME_FORMAT } from "../../config/sysConfig";
import dayjs from "dayjs";
import { Table, Card, Button } from "antd";
import { useEffect, useState } from "react";
import { getOrderPurchase } from "../../api/orderPurchaseApi";
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

function CommunityPurchase() {
 
  const [pagination, setpagination] = useState({ total: 1, current: 1 });
  // default parameters
  const [params, setParams] = useState<OrderPurchaseType>(baseParams);
  //  团购列表数据
  const [orderPurchaseList, setOrderPurchaseList] = useState<OrderPurchaseType[]>([]);
  //  定义重置方法
  const reset = () => {
    setParams(baseParams);
    // 刚更新完数据，就去用数据取请求（问题：需要第二次才能）
    // 更新完毕立即取请求（请求的时候拿不到最新的params）
    // 监听params变化 如果 params等于baseParams就去请求
    // getOrderChain()
  };
  //  定义获取团购的函数
  function getOrderChain() {
    getOrderPurchase({ ...params, current: pagination.current }).then((res) => {
      // 更新团购列表数
      setOrderPurchaseList(res.data.data);
      var p = res.data.pagination;
      // 更新分页数据
      setpagination({ current: Number(p.current), total: p.total });
      console.log(res.data.data);
    });
  }
  // 挂载获取数据(生命周期)

  useEffect(() => {
    getOrderChain();
  }, [pagination.current]);

  //监听params变化
  useEffect(() => {
    // params发生变化都会执行这个回调函数
    // 如果params等于baseParams 点击重置
    if (params === baseParams) {
      // params是最新的数据可以获取团购列表
      getOrderChain();
    }
  }, [params]);
  return (
    <div>
      <h3>社区团购</h3>
      <Card
        type="inner"
        title={
          <span>
            筛选查询 <Button 
            style={{ marginLeft: 32 }}> <Link to="/admin/channel/createOrderPurchase">+ 创建团购活动</Link></Button>
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
      <Card type="inner" title={<span>数据展示</span>}>
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
      {/* {JSON.stringify(pagination)} */}
    </div>
  );
}

export default CommunityPurchase;
