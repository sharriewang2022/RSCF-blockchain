import {addOrderAction, addOrderChainProduct, UpdateOrderAction} from '../../api/orderPurchaseApi'
import {Button,Table,Input} from 'antd'
import SelectPro from  './orderPro'
import {useState,useEffect} from 'react';
import type {OrderPurchaseType, ActitivyProType} from "../../util/variableTypes";

 
interface Iprops {
  setCurrent: Function;
  setOrderActionInfo: Function;
  orderActionInfo: OrderPurchaseType;
}

function OrderProducts(props:Iprops) {
 
  const [showSelectPro,setShowSelectPro] = useState(false)
 
  const [activityProductList,setActivityProductList] =useState<any>([])
 
  const [selProductList,setSelProductList] =useState([])
 
  // activity products list
const columns = [
  {
    title:"Product ID",dataIndex:'productId'},
  {title:"规格",dataIndex:'specs'},
  {title:"Product Name",dataIndex:'productName'},
  {title:"Price",dataIndex:'price'},
  {
    title:"Sale Price",dataIndex:'salePrice',
    render:(value:string,row:ActitivyProType,index:number)=>{
     
      return <Input 
      onChange={(e)=>{
        var list = activityProductList;
        // e is form inputted value
        list[index].salePrice = e.target.value
        console.log(list,list[index]);
        setActivityProductList([...list]);
      }}
      value={value}/>
    }
  },
   {title:"amount",dataIndex:'limitBuy'},
  {title:"stokc",dataIndex:'stock'},
  {title:"order",dataIndex:'order'},
]
  useEffect(()=>{
    var list = selProductList.map((item:any)=>{
      var obj = {...item};
      // delete product according to its id
      delete obj.id; 
      obj.productId =item.id;
      obj.salePrice=obj.price
      obj.rate = 1;
      obj.limitBuy = 1;
      obj.stock = 999;
      obj.order = 0;
      return obj;
    }) 
    setActivityProductList(list)
  },[selProductList])
 
  async function done (){
    // add order actitivy to server and then get activityId
   const activity =  await addOrderAction(props.orderActionInfo)
   var orderPurchaseId = activity.data.data.insertId;//插入团购信息后得到id
    // 02 有多个少团购商品，遍历添加的 服务器  products 团购商品id（多个）
   var list = activityProductList.map((item:any)=>addOrderChainProduct({...item,orderPurchaseId})) 
    // list 多个promise请求结果,Promise.all()
    const gplist = await Promise.all(list)
    // gplist 多个个求和得到的结果列表
   var products = gplist.map(item=>item.data.data.insertId).join(",")
   // 03 更新团购活动信息的products
  const result = await UpdateOrderAction({id:orderPurchaseId,products})
  if(result.data.code===0){
    props.setCurrent(2);
    // 进入下步完成
  }else{
    console.log("创建活动失败")
  }
    // 04 进入下一步 props.setCurrent(2)
  }
  return ( <div className="SelectProducts">
   <p style={{textAlign:'center'}}><Button type='primary' onClick={()=>setShowSelectPro(true)}>+选择商品</Button></p>
   <Table rowKey="productId" pagination={false} dataSource={activityProductList} columns={columns}/>
   {showSelectPro&&<SelectPro 
   shopList={selProductList} 
   setShowShop={setShowSelectPro} 
   setShopList={setSelProductList}></SelectPro>} 
   <p>
     <Button onClick={()=>props.setCurrent(0)}>上一步，编辑商品信息</Button>  
     <Button onClick={()=>done()}>完成</Button>
   </p>
   {/* <p>{JSON.stringify(orderChainProductList)}</p> */}
    </div> );
}

export default OrderProducts;
