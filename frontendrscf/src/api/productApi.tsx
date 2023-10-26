import request from "../util/request";
import { ProductType} from "../util/variableTypes";
import {useBlock} from "../contexts/blockContext";

/* get all product list */
export const getProductList = () => request.post("/product/allProducts")

export function AddProductToDataBase(productParam: ProductType){
  return request.post("/product/addProduct",productParam)
}