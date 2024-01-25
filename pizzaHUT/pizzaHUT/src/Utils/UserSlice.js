import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userDetails: {} },
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem("tokenId", JSON.stringify(action.payload));
      return { ...state, userDetails: action.payload };
    },
    logOutUser: (state) => {
      localStorage.clear();
      return { ...state, userDetails: {} };
    },
  },
});

export const { loginUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
