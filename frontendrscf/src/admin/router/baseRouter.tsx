import LoginView from "../../login/components/login";
import AdminView from "../views/adminView";
import Private from '../../util/private'
import LazyLoad from "../../util/LazyLoad"


const baseRouter = [
    {path:"/", element:<LoginView/>, children:[] },
    {path:"/admin/*", element:<Private><AdminView/></Private>, 
         children:[{
            path:'',
            element:LazyLoad('/admin/DashView'),
        }]
    }
    // {path:'/echarts',element:<EchartsView/>},
    // {path:'/map',element:<MapView/>}
];

export default baseRouter;