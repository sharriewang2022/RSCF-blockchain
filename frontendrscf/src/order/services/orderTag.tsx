import  {Table} from  'antd'
import { useState,useEffect } from 'react'
import  {getTag} from '../../api/orderPurchaseApi';
import {Modal} from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { TagType } from "../../util/variableTypes";
 
interface Iprops{
  setShowTag:Function
  tagType:number
  setTag:Function
}
 
const columns:ColumnsType<TagType> =  [
  { title: 'name',
  dataIndex: 'name'},
  { title: '图片',
  dataIndex: 'pic',
  render:(img:string)=><img src={img} width='32' alt=""/>
 },
 {
  title:"类型",
  dataIndex:"type",
  render:(type:number)=><span>{Number(type)===1?'团购':'活动'}</span>
 }
]
function SelectTag(props:Iprops) {
  // 存储选择行的数
  const [selOrigin,setSelOrigin] = useState<TagType[]>([])
  // 定义标签列表
  const [tagList,setTagList] = useState<TagType[]>([])
  // 定义分页信息
  const [pagination,setPagination] = useState({current:1,pageSize:5,total:1})
  // 单击确定关闭
  const handleOk = () => {
    // 更新tag标签 为选择的行的第0个
    props.setTag(selOrigin[0])
    props.setShowTag(false)

  };
  // 单击取消关闭
  const handleCancel = () => {
    props.setShowTag(false)
   
  };
  // 定义获取标签的方法
  const getTags = ()=>{
    getTag({type:props.tagType,current:pagination.current,size:pagination.pageSize})
    .then(res=>{
      // 更新标签列表
      setTagList(res.data.data)
      var pa = res.data.pagination;
      // 更新分页
      setPagination({current:Number(pa.current),pageSize:pa.size,total:pa.total})
    })
  }
  // useEffect请求
  useEffect(()=>{
    getTags()
  },[pagination.current,props.tagType])

  // 返回弹框
  return (  <Modal title="选择标签" open={true} onOk={handleOk} onCancel={handleCancel}>
  <Table 
  rowSelection={{
    type: 'radio',
    onChange:(keys,rows)=>{
      // keys 选择的id
      // rows选择的行
      // console.log(rows);
      // 选择发生变化的时候更新选中的行
      setSelOrigin(rows)

    }
  }}
  size='small' 
  rowKey="id" 
  onChange={pa=>{
    setPagination({...pagination,current:Number(pa.current)})
  }}
  pagination={pagination} 
  columns={columns} dataSource={tagList} />
</Modal> );
}

export default SelectTag;