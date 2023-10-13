import type { OrderPurchaseType } from "../../util/variableTypes";
import { useParams,Link} from 'react-router-dom';
import { getOrderPurchase } from "../../api/orderPurchaseApi";
import { useEffect,useState } from 'react';
import {Tabs,Button,Space} from 'antd';
import OrderPurchaseInfo from '../services/ordrePurchaseInfo';
import OrderChainProList from '../services/orderChainProList';
import OrderChainShopList from '../services/orderChainShopList';
function OrderPurchaseDetail() {
  
  const [orderActionInfo,setOrderActionInfo] = useState<OrderPurchaseType>({});
  const params = useParams();
  
  useEffect(()=>{
    getOrderPurchase({id:params.id})
    .then(res=>{
      setOrderActionInfo(res.data.data[0])
    })
  },[])
  
  // tabs
  const items = [
    // send order info to subcomponents, OrderPurchaseInfo
    {label:'Order Purchase Info',key:"1",children:<OrderPurchaseInfo orderActionInfo={orderActionInfo} />},
    {label:'Products List',key:"2",children:<OrderChainProList orderActionInfo={orderActionInfo}/>},
    {label:'Shops List',key:"3",children:<OrderChainShopList  orderActionInfo={orderActionInfo}/>}
  ]
  return ( <div className="OrderPurchaseDetail">
    
     <Button style={{margin:"16px 0"}}><Link to="/order/components/orderPurchase">←come back</Link></Button>
     
    <Tabs
        defaultActiveKey="1"
        type="card"       
        items={items}
      />
  </div> );
}

export default OrderPurchaseDetail;