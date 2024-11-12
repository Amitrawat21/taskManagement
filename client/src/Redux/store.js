import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";
import  adminSlice  from "./AdminUserSlice";



const reducer = combineReducers({
    auth: authSlice,
    task : taskSlice,
    admin:adminSlice


})


export const store   = configureStore({
    reducer : reducer

})