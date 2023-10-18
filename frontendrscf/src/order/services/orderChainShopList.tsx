import {Table } from 'antd'
import {getShops} from '../../api/orderApi'
import { useEffect,useState } from 'react';
import type {OrderPurchaseType} from "../../util/variableTypes";
import type { ColumnsType } from 'antd/es/table';

//the prop parameters of OrderChainShopList
interface Iprops{
  orderActionInfo:OrderPurchaseType
}

const columns: ColumnsType<any> = [
  {
    title: 'Shop ID',
    dataIndex: 'id',
  },
  {
    title: 'Shop Name',
    dataIndex: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
   
   
]
function OrderChainShopList(props:Iprops) {
  const [pagnigation, setPagnigation] = useState({ total: 1, current: 1,pageSize:2 });
  const [shops,setShops] = useState([])
  function getShop(){
    getShops({...pagnigation,id:props.orderActionInfo.shop,size:2})
    .then(res=>{
      setShops(res.data.data)
      var p = res.data.pagnigation;
      setPagnigation({...pagnigation, current: Number(p.current), total: p.total });
    })
  }

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

 