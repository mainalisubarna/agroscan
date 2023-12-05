import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  jwtToken: "",
  isLoading : false,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, data) => {
      (state.isLogged = true), (state.jwtToken = data.payload);
    },
    logout: () => {
      localStorage.setItem("persist:root", "");
    },
    loadingScreen : (state) => {
    (state.isLoading = !state.isLoading)
    }
  },
});

export default authSlice.reducer;
export const { login, logout,loadingScreen } = authSlice.actions;
