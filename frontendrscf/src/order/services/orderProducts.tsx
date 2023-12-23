import {addOrderAction, addOrderChainProduct, UpdateOrderAction} from '../../api/orderApi'
import {Button,Table,Input} from 'antd'
import SelectProduct from  './selectProduct'
import {useState,useEffect} from 'react';
import type {OrderPurchaseType, ActitivyProType} from "../../util/variableTypes";

 
interface Iprops {
  setCurrent: Function;
  setOrderActionInfo: Function;
  orderActionInfo: OrderPurchaseType;
}

function OrderProducts(props:Iprops) {
  // show product list
  const [showSelectProduct,setShowSelectProduct] = useState(false) 
  //order product
  const [orderProductList,setOrderProductList] =useState<any>([]) 
  //set select product list
  const [selProductList,setSelProductList] =useState<any>([])
 
  //products list in one order
const columns = [
  {
    title:"Product ID",
    dataIndex:'ProductID'
  },
  {
    title:"Product Name",
    dataIndex:'ProductName'
  },
  {
    title:"Price",
    dataIndex:'ProductPrice',
    render:(value:string,row:ActitivyProType,index:number)=>{     
      return <Input 
        onChange={(e)=>{
          var list = orderProductList;
          // e is form inputted value
          list[index].productPrice = e.target.value
          console.log(list,list[index]);
          setOrderProductList([...list]);
        }}
        value={value}/>
    }
  },
  {
    title:"Product Number",
    dataIndex:'ProductNumber'
  },
  {
    title:"Stock",
    dataIndex:'stock'
  },
  {
    title:"Specific",
    dataIndex:'Specific'
  },
  // {
  //   title:"order",
  //   dataIndex:'order'
  // },
]

  useEffect(()=>{
    var list = selProductList.map((item:any)=>{
      var obj = {...item};
      // delete product according to its id
      delete obj.id; 
      obj.ProductID = item.ProductID;
      obj.ProductName = item.ProductName;
      obj.ProductPrice = item.ProductPrice;
      obj.ProductNumber = item.ProductNumber;
      obj.ProductItems = item.ProductItems
      obj.stock = 999;
      obj.order = 0;
      return obj;
    }) 
    setOrderProductList(list)
    setSelProductList(list)
  },[selProductList])
 
  async function chooseDone (){
    // add order actitivy to server and then get activityId
    const orderData =  await addOrderAction(props.orderActionInfo)
    var orderId = orderData.data.orderId; 
    // add selected  products of order with id
    var list = orderProductList.map((item:any)=>addOrderChainProduct({...item,orderId})) 
    // several promise
    const gplist = await Promise.all(list)
    // several gplist  join together
    var products = gplist.map(item=>item.data.productID).join(",")
    //  update order products
    const result = await UpdateOrderAction({id:orderId,products})
    if(result.data.code===0){
      props.setCurrent(2);
    }else{
      console.log("fail")
    }
  }
  
  return ( <div className="SelectProducts" >
    <p style={{textAlign:'center'}}>
      <Button style={{backgroundColor:"#87CEFA"}} type='primary' onClick={()=>setShowSelectProduct(true)}>Choose Product</Button>
    </p>
   <Table rowKey="ProductID" pagination={false} dataSource={orderProductList} columns={columns}/>
   {showSelectProduct && <SelectProduct 
      selectProductList={selProductList} 
      setShowSelectProduct={setShowSelectProduct} 
      setSelectProductList={setSelProductList}></SelectProduct>} 
   <p>
     <Button style={{backgroundColor:"#87CEFA"}} onClick={()=>props.setCurrent(0)}>Last Step</Button>  
     <Button style={{backgroundColor:"#87CEFA"}} onClick={()=>chooseDone()}>Done</Button>
   </p>
  </div> );
}
export default OrderProducts;
