import {combineReducers,applyMiddleware} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
//Import the permission processor,  it is in ./auth/reducer.js 
import adminReducer from '../reducer/adminReducer'
// asyn components
import thunk from 'redux-thunk'
 
import logger from 'redux-logger'
// createStore
const store = configureStore({
  // the first parameter is reducer combineReducers is the group of some reducers
  reducer : {
    adminReducer,
  },
 
  // // add middleware processor
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    }),
  }
)
 
export default store

export type RootState = ReturnType <typeof store.getState>