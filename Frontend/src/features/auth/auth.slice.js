import { createSlice } from "@reduxjs/toolkit";

// what auth state looks like
// how auth state can change
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  // function that updates the state
  // each reducer responds to an action
  reducers: {
    setUser: (state, action) => {
      // When you dispatch an action,
      // you usually send some data with it.
      // That data is called the payload.

      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
