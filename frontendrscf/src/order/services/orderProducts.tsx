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
  const [actionProductList,setActionProductList] =useState<any>([]) 
  //product list
  const [selProductList,setSelProductList] =useState<any>([])
 
  // activity products list
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
    dataIndex:'ProductPrice'
  },
  {
    title:"Sale Price",
    dataIndex:'salePrice',
    render:(value:string,row:ActitivyProType,index:number)=>{     
      return <Input 
        onChange={(e)=>{
          var list = actionProductList;
          // e is form inputted value
          list[index].salePrice = e.target.value
          console.log(list,list[index]);
          setActionProductList([...list]);
        }}
        value={value}/>
    }
  },
  {
    title:"Amount",
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
    setActionProductList(list)
    setSelProductList(list)
  },[selProductList])
 
  async function chooseFinish (){
    // add order actitivy to server and then get activityId
    const activity =  await addOrderAction(props.orderActionInfo)
    var orderPurchaseId = activity.data.data.insertId; 
    // order products with id
    var list = actionProductList.map((item:any)=>addOrderChainProduct({...item,orderPurchaseId})) 
    // several promise
    const gplist = await Promise.all(list)
    // several gplist  join together
    var products = gplist.map(item=>item.data.data.insertId).join(",")
    //  update order products
    const result = await UpdateOrderAction({id:orderPurchaseId,products})
    if(result.data.code===0){
      props.setCurrent(2);
    }else{
      console.log("fail")
    }
  }
  
  return ( <div className="SelectProducts">
    <p style={{textAlign:'center'}}>
      <Button type='primary' onClick={()=>setShowSelectProduct(true)}>Choose Product:</Button>
    </p>
   <Table rowKey="ProductID" pagination={false} dataSource={actionProductList} columns={columns}/>
   {showSelectProduct&&<SelectProduct 
      selectProductList={selProductList} 
      setShowSelectProduct={setShowSelectProduct} 
      setSelectProductList={setSelProductList}></SelectProduct>} 
   <p>
     <Button onClick={()=>props.setCurrent(0)}>Edit Product</Button>  
     <Button onClick={()=>chooseFinish()}>Done</Button>
   </p>
  </div> );
}
export default OrderProducts;
