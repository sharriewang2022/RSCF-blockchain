import request from "../util/request";
import { AxiosResponse } from 'axios';
import { CategoryType } from "../util/variableTypes";
 
interface resultCategoryType{
  code:number
  msg?:string
  token:string,
  categoryInfo:any
}

/* get all category list */
// export const getCategoryList = () => request.get("/category/allCategorys")
export async function getCategoryList(){
  sessionStorage.setItem("categoryName", "");
  var resultData : CategoryType[] = [];
  await request.get("/category/addCategory").then((res:AxiosResponse<resultCategoryType>)=>{
    if(res.data !== undefined ){
      if(res.data.code===200){     
        resultData = res.data.categoryInfo;       
      }else{        
        console.log(res.data.msg + "");
      }         
    }else{
      console.log( "The category could not be added");
    }
  }) 
  return resultData;
}

export async function AddCategoryToDataBase(categoryParam: CategoryType){
  sessionStorage.setItem("categoryName", "");
  var resultMessage = "";
  await request.post("/category/addCategory",categoryParam).then((res:AxiosResponse<resultCategoryType>)=>{
    if(res.data !== undefined ){
      if(res.data.code===200){     
        // save category Name to local storage
        sessionStorage.setItem("categoryName", categoryParam.categoryName + "");
        resultMessage = "categoryName:" + categoryParam.categoryName +" is added successfully!";       
      }else{        
        resultMessage = res.data.msg + "";
        console.log(resultMessage);
      }         
    }else{
      resultMessage = "The category could not be added";
      console.log(resultMessage);
    }
  }) 
  return resultMessage;
}