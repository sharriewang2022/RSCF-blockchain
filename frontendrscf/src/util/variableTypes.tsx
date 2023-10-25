/* supplychain interface types */

export interface CategoryType {
    id?:number|string
    categoryId?:string
    categoryName?:string
    parentID?:string 
    parentName?:string
    manufacturer?:string
    supplier?:string
    specs?:string
    size?:number
    current?:number
}

export interface ProductType {
    id?:number|string
    productId?:string
    productName?:string
    price?:number
    amount?:number
    productItems?:string
    blockchainHash?:string
    category?:string
    manufacturer?:string
    supplier?:string
    specs?:string
    size?:number
    current?:number
}

//type used in Order management
export type ActitivyProType = ProductType&{
    groupBuyId?:number|string
    salePrice?:string
    limitBuy?:number
    rate?:number
    stock?:number
    order?:number
}

export interface TagType{
    id?:number|string
    name?:string
    pic?:string
    type?:number
    current?:number
    size?:number
}
export interface OrderPurchaseType {
    id?:number|string
    name?:string
    startTime?:string
    endTime?:string
    state?:number|string
    current?:number
    order?:string
    products?:string
    shop?:string
    slogan?:string
    preTime?:string
    showHome?:string
    tag?:string|number
    target?:number
    limitBuy?:number
    deliverWay?:number
    pickTime?:string
    homePic?:string
    banner?:string
    showType?:number
}

export interface UserType {
    userName:string
    userPassword:string
    role:string
    userEmail:string
    userID: string
    waddress: string
}

export interface LoginResponseType {
    code?:number
    token:string
    msg?:string
    loginInfo:{
        name: string
        id: number
        score: number
        user_group: number
        avator: string
    }
}

/* redux definition */
// action type
export interface ActionType{
    type:string
    payload?:any
}