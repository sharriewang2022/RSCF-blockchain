import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { getUserList } from '../../api/adminApi';

interface DataType {
  userId: string;
  userName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  telephone: number;
  role: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'User Name',
    dataIndex: 'userName',
    sorter: true,
    render: (userName) => `${userName.firstName}`,
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Telephone',
    dataIndex: 'telephone',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    filters: [
      { text: 'Administrator', value: 'Administrator' },
      { text: 'Supplier', value: 'Supplier' },
      { text: 'Manufacturer', value: 'Manufacturer' },
      { text: 'Distributer', value: 'Distributer' },
      { text: 'Retailer', value: 'Retailer' },
      { text: 'Customer', value: 'Customer' },
    ],
  },
];

const UserList: React.FC = () => {
  const [userData, setUserData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const getUserTableData = async () => {
    setLoading(true);
    var userList = await getUserList();
   
    var userTableDataList:Array<DataType>= [];
 
    if(userList.data.code == 200){
      userList.data.data.map((item:any)=>{
        var obj : DataType = {
          userId:'',
          userName: {firstName:'', lastName:''},
          email: '',
          telephone: 0,
          role:'Administrator'
        };
        obj.userId = item.UserID
        obj.userName.firstName = item.UserName
        obj.userName.lastName = item.UserName
        obj.email = item.Email
        obj.telephone = item.Telephone        
        if(item.RoleID == '3001') {
          obj.role = 'Administrator'
        }else if(item.RoleID == '3002'){
          obj.role = 'Supplier'
        }else if(item.RoleID == '3003'){
          obj.role = 'Manufacturer'
        }else if(item.RoleID == '3004'){
          obj.role = 'Distributer'
        }else if(item.RoleID == '3005'){
          obj.role = 'Retailer'
        }else {
          obj.role = 'Customer'
        }
        userTableDataList.push(obj)        
      }) 
    }
   
    setUserData(userTableDataList);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: userTableDataList.length,
      },
    });
  }

  useEffect(() => {
    getUserTableData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
    // pagination: any,
    // filters: any,
    // sorter: any,
  ) => {     
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination && pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUserData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.userId}
      dataSource={userData}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default UserList;
