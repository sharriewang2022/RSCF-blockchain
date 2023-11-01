import request from "../util/request";
import type {TagType, OrderPurchaseType, ProductType, ActitivyProType} from "../util/variableTypes";

export function getOrderPurchase(params:OrderPurchaseType){
  return request.get("/api/yp/orderPurchase",{params})
}

export function getTag(params:TagType){
  return request.get("/api/yp/tag",{params})
}
interface Ptype {
  orderPurchaseId?:string|number
  size?:number
}
 
export function getOrderPurchaseProducts(params:Ptype){
  return request.get("/api/yp/orderPurchaseProduct",{params})
}
interface Stype {
  id?:string|number
  size?:number
  current?:number
}
 
export function getShops(params:Stype){
  return request.get("/api/yp/shop",{params})
}
 
export function getProduts(params:ProductType){
  return request.get("/product/allProducts",{params})
}

export function addOrderChainProduct(data:OrderPurchaseType){
  return request.post("/api/yp/orderPurchaseProduct",data)
}
 
export function addOrderAction(data:OrderPurchaseType){
  return request.post("/api/yp/orderPurchase",data)
}
 
export function UpdateOrderAction(data:OrderPurchaseType){
  return request.put("/api/yp/orderPurchase",data)
}