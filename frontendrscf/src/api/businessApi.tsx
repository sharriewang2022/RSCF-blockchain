import request from "../util/request";
import type { TagType,GroupBuyType,ProductType,GroupProType} from "../util/variableTypes";

export function getGroupBuy(params:GroupBuyType){
  return request.get("/api/yp/groupBuy",{params})
}

export function getTag(params:TagType){
  return request.get("/api/yp/tag",{params})
}
interface Ptype {
  groupBuyId?: string|number
  size?: number
}
// products list
export function getGroupBuyProducts(params:Ptype){
  return request.get("/api/yp/groupBuyProduct",{params})
}
interface Stype {
  id?:string|number
  size?:number
  current?:number
}

// get shop info
export function getShops(params:Stype){
  return request.get("/api/yp/shop",{params})
}

export function getProduts(params:ProductType){
  return request.get("/api/yp/product",{params})
}

// add purchase products
export function addGroupProduct(data:GroupProType){
  return request.post("/api/yp/groupBuyProduct",data)
}
// add purchase info
export function addGroupInfo(data:GroupBuyType){
  return request.post("/api/yp/groupBuy",data)
}
// update purchase products
export function UpdateGroupInfo(data:GroupBuyType){
  return request.put("/api/yp/groupBuy",data)
}
