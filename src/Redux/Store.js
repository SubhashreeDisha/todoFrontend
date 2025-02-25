import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import todoReducer from "./todoSlice";
export const Store = configureStore({
  reducer: { UserReducer: UserReducer, todoReducer: todoReducer },
});
