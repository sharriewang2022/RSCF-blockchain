import {Table } from 'antd'
import { getOrderPurchaseProducts } from '../../api/orderPurchaseApi';
import { useEffect,useState } from 'react';
import type {OrderPurchaseType} from "../../util/variableTypes";
import type { ColumnsType } from 'antd/es/table';
// 组件props的接口
interface Iprops{
  orderActionInfo:OrderPurchaseType
}
const columns: ColumnsType<any> = [
  {
    title: '商品编号',
    dataIndex: 'id',
  },
  {
    title: '商品图片',
    dataIndex: 'gallery',
    render:(urls:string)=>{
      var  temp ;
      // 如果有逗号用逗号风格
      if( urls.includes(',')){
        temp = urls.split(",")
        // 否则用 | 风格
      }else{ temp = urls.split("|")}
      // 返回一张图
      return <img src={temp[0]} width="120" alt='' />
    }
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
  },
  {
    title: '规格',
    dataIndex: 'specs',
  },
  {
    title: '正常价格',
    dataIndex: 'price',
  },
  {
    title: '促销价格',
    dataIndex: 'salePrice',
  },
  {
    title: '佣金比例',
    dataIndex: 'rate',
    render:text=>text+"%"
  },
  {
    title: '每人限购',
    dataIndex: 'limitBuy',    
  },
  {
    title: '活动总量',
    dataIndex: 'stock',    
  },
  {
    title: '剩余量',
    dataIndex: 'stock',    
  },
  {
    title: '展示排序',
    dataIndex: 'id',    
  },
]
function OrderChainProList(props:Iprops) {
    // 定义分页数据
    const [pagination, setPagination] = useState({ total: 1, current: 1,pageSize:2 });
  // 定义商品列表数据
  const [products,setProducts] = useState([])
  function getProducts(){
                                         
    getOrderPurchaseProducts({...pagination,orderPurchaseId:props.orderActionInfo.id,size:2})
    .then(res=>{
      // 更新商品列表
      setProducts(res.data.data)
      var p = res.data.pagination;
      // 更新分页信息
      setPagination({...pagination, current: Number(p.current), total: p.total });
    })
  }
  // 请求数据
  useEffect(()=>{
    getProducts()
  },[pagination.current])
  return ( <div>
    <Table  
    rowKey="id" 
    onChange={(pa: any) => {
      setPagination({ ...pagination, current: pa.current });
    }}
    pagination={pagination}
    dataSource={products} 
    columns={columns} />;
  </div> );
}

export default OrderChainProList;