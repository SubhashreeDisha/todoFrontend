import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);

      return { user: action.payload };
    },
  },
});
export default UserSlice.reducer;
export const { setUser } = UserSlice.actions;
