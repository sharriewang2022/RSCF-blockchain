import { SET_USER,SET_TOKEN,SET_MENU, SET_ROUTES} from "../../util/constant"
import type { ActionType } from "../../util/variableTypes"

const initialState = {
  userInfo:{},
  token:"",
  menu:[
    {label: 'Overview',
      key: '/admin/dash'
    }
  ],//Dynamic Menu
  routes:[],//Dynamic route
}

function reducer(state=initialState,action:ActionType){

  switch(action.type){
    // set user information, new info is action.payload
    case SET_USER:
      return {...state,userInfo:action.payload}
    // set token, action.payload is new token
    case SET_TOKEN:
      return {...state,token:action.payload}
    // set menu
    case SET_MENU:
      return {...state,menu:action.payload}
    // set route
    case SET_ROUTES:
      return {...state,routes:action.payload}
    default:
      return state;
  }
}

export default reducer