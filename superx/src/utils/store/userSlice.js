import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  auth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
