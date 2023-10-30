import request from "../util/request";
import { AxiosResponse } from 'axios';
import { ProductType} from "../util/variableTypes";

interface resultProductType{
  code:number
  msg?:string
  token:string,
  productInfo:any
}

/* get all product list */
export const getProductList = () => request.post("/product/allProducts")

export async function AddProductToDataBase(productParam: ProductType){
  sessionStorage.setItem("productName", "");
  var resultMessage = "";
  await request.post("/product/addProduct",productParam).then((res:AxiosResponse<resultProductType>)=>{
    if(res.data !== undefined ){
      if(res.data.code===200){     
        // save product Name to local storage
        sessionStorage.setItem("productName", productParam.productName + "");
        resultMessage = "productName:" + productParam.productName +" is added successfully!";       
      }else{        
        resultMessage = res.data.msg + "";
        console.log(resultMessage);
      }         
    }else{
      resultMessage = "The product could not be added";
      console.log(resultMessage);
    }
  }) 
  return resultMessage;
}