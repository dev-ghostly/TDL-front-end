import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategoriesStart(state) {
      state.isLoading = true;
    },
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },
    getCategoriesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getCategoriesStart, getCategoriesSuccess, getCategoriesFailure } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;