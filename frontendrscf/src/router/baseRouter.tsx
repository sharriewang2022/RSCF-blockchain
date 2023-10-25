import React from 'react';
import LoginView from "../login/components/loginView";
import AdminView from "../admin/views/adminView";
import ProductView from "../product/components/productView";
import CategoryView from "../category/components/categoryView";
import OrderView from "../order/components/orderView";
import Private from '../util/private'
import LazyLoad from "../util/LazyLoad"
import DashView from '../admin/views/dashView';
import DocumentView from "../drmDocument/components/uploadFile";
import TrackProductView from "../trace/components/trackProduct";
import Register from "../login/components/register";



const baseRouter = [
    {path:"/", element:<LoginView/>, children:[] },
    // {path:'/dashboard', element:<DashView/>}, --lazylaod 
    {path:"/admin/*", element:<Private><AdminView/></Private>, 
         children:[{
            path:'',
            element:LazyLoad('/dashView'),
        }]
    },
    {path:'/prodcut', element:<ProductView/>},
    {path:'/file', element:<DocumentView/>},
    {path:'/trackProduct', element:<TrackProductView/>},
    // {path:'/Register', element:<Register userName={''} userPassword={''} role={''} userEmail={''} userID={''} waddress={''}/>}
    {path:'/category', element:<CategoryView/>},
    {path:'/order', element:<OrderView/>}
];

export default baseRouter;