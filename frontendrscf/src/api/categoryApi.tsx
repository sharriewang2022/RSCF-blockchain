import request from "../util/request";
import { CategoryType} from "../util/variableTypes";
 

/* get all category list */
export const getCategoryList = () => request.post("/category/allCategorys")

export function AddCategoryToDataBase(categoryParam: CategoryType){ 
  return request.post("/category/addCategory",categoryParam)
}