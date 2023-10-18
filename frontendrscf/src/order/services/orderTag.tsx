import  {Table} from  'antd'
import { useState,useEffect } from 'react'
import  {getTag} from '../../api/orderApi';
import {Modal} from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { TagType } from "../../util/variableTypes";
 
interface Iprops{
  setShowTag:Function
  tagType:number
  setTag:Function
}
 
const columns:ColumnsType<TagType> =  [
  { title: 'Name',
  dataIndex: 'name'},
  { title: 'Picture',
  dataIndex: 'pic',
  render:(img:string)=><img src={img} width='32' alt=""/>
 },
 {
  title:"Type",
  dataIndex:"type",
  render:(type:number)=><span>{Number(type)===1?'Order':'Action'}</span>
 }
]
function SelectTag(props:Iprops) {
  const [selOrigin,setSelOrigin] = useState<TagType[]>([])
  const [tagList,setTagList] = useState<TagType[]>([])
  const [pagination,setPagination] = useState({current:1,pageSize:5,total:1})

  const handleOk = () => {
    props.setTag(selOrigin[0])
    props.setShowTag(false)

  };
 
  const handleCancel = () => {
    props.setShowTag(false)
   
  };
 
  const getTags = ()=>{
    getTag({type:props.tagType,current:pagination.current,size:pagination.pageSize})
    .then(res=>{
      setTagList(res.data.data)
      var pa = res.data.pagination;
      setPagination({current:Number(pa.current),pageSize:pa.size,total:pa.total})
    })
  }
 
  useEffect(()=>{
    getTags()
  },[pagination.current,props.tagType])

  //modelDialog
  return (  <Modal title="Choose tag" open={true} onOk={handleOk} onCancel={handleCancel}>
  <Table 
  rowSelection={{
    type: 'radio',
    onChange:(keys,rows)=>{
      console.log(rows);
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