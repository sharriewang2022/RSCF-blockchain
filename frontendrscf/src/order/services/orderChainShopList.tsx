import {Table } from 'antd'
import {getShops} from '../../api/orderPurchaseApi'
import { useEffect,useState } from 'react';
import type {OrderPurchaseType} from "../../util/variableTypes";
import type { ColumnsType } from 'antd/es/table';
// 组件props的接口
interface Iprops{
  orderActionInfo:OrderPurchaseType
}
const columns: ColumnsType<any> = [
  {
    title: '店铺编号',
    dataIndex: 'id',
  },
  {
    title: '门店名称',
    dataIndex: 'name',
  },
  {
    title: '区域',
    dataIndex: 'address',
  },
  {
    title: '业态',
    dataIndex: 'type',
  },
   
   
]
function OrderChainShopList(props:Iprops) {
    // 定义分页数据
    const [pagnigation, setPagnigation] = useState({ total: 1, current: 1,pageSize:2 });
  // 定义商品列表数据
  const [shops,setShops] = useState([])
  function getShop(){
    getShops({...pagnigation,id:props.orderActionInfo.shop,size:2})
    .then(res=>{
      // 更新商品列表
      setShops(res.data.data)
      var p = res.data.pagnigation;
      // 更新分页信息
      setPagnigation({...pagnigation, current: Number(p.current), total: p.total });
    })
  }
  // 请求数据
  useEffect(()=>{
    getShop()
  },[pagnigation.current])
  return ( <div>
    <Table  
    rowKey="id" 
    onChange={(pa: any) => {
      setPagnigation({ ...pagnigation, current: pa.current });
    }}
    pagination={pagnigation}
    dataSource={shops} 
    columns={columns} />;
  </div> );
}

export default OrderChainShopList;

 