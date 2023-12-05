import { createSlice } from "@reduxjs/toolkit";

const initialState = {articles : []};

const newsSlice = createSlice({
  name: "News",
  initialState,
  reducers: {
    saveNews : (state,action) => {
      state.articles =  action.payload
    },
  },
});

export default newsSlice.reducer;
export const {saveNews} = newsSlice.actions;
