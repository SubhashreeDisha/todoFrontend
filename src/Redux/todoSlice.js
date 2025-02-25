import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todo: [],
  },
  reducers: {
    addTodo: (state, action) => {
      // console.log(action.payload);
      return [...action.payload];
    },
  },
});
export default todoSlice.reducer;
export const { addTodo } = todoSlice.actions;
