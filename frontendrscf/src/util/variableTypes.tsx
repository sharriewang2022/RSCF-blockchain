/* supplychain interface types */

export interface ProductType {
    id?:number|string
    gallery?:string
    productName?:string
    price?:string
    specs?:string
    current?:number
    size?:number
}
 
export type GroupProType = ProductType&{
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
export interface GroupBuyType {
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
    uid: string
    waddress: string
}

export interface LoginResponseType {
    code?:number
    token:string
    msg?:string
    user:{
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