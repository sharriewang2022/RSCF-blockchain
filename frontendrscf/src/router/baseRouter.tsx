import React from 'react';
import LoginView from "../login/components/loginView";
import AdminView from "../admin/views/adminView";
import ProductView from "../product/components/productView";
import ProductListView from "../product/components/productListView";
import CategoryView from "../category/components/categoryView";
import CategoryListView from "../category/components/categoryListView";
import OrderView from "../order/components/orderView";
import OrderListView from "../order/components/orderListView";
import Private from '../util/private'
import LazyLoad from "../util/LazyLoad"
import DashView from '../admin/views/dashView';
import Dashboard from '../dashboard/Dashboard';
import UploadFileView from "../drmDocument/components/uploadFile";
import TrackProductView from "../trace/components/trackProduct";
import RegisterView from "../admin/views/registerView";
import {ManageView} from "../admin/views/manageView";



const baseRouter = [
    {path:"/", element:<LoginView/>, children:[] },
    {path:'/dashboard', element:<Dashboard/>},
    {path:"/admin/*", element:<Private><AdminView/></Private>, 
         children:[{
            path:'',
            element:LazyLoad('/adminView'),
        }]
    },
    {path:'/register', element:<RegisterView/>},
    {path:'/sysManage', element:<ManageView/>},
    {path:'/prodcut', element:<ProductView/>},
    {path:'/productListView', element:<ProductListView/>},
    {path:'/file', element:<UploadFileView/>},
    {path:'/trackProduct', element:<TrackProductView/>},
    {path:'/category', element:<CategoryView/>},
    {path:'/categoryList', element:<CategoryListView/>},    
    {path:'/order', element:<OrderView/>},
    {path:'/orderListView', element:<OrderListView/>},
];

export default baseRouter;