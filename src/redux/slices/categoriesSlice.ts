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
    addCategory(state, action : { payload: any }) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action : { payload: any }) {
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      state.categories[index] = action.payload;
    },
    deleteCategory(state, action : { payload: any }) {
      state.categories = state.categories.filter((category) => category.id !== action.payload.id);
    },
    addTask(state, action : { payload: any }) {
      const categoryIndex = state.categories.findIndex((category) => category.id === action.payload.categoryId);
      state.categories[categoryIndex].tasks.push(action.payload);
    },
    deleteTask(state, action : { payload: any }) {
      const categoryIndex = state.categories.findIndex((category) => category.id === action.payload.categoryId);
      state.categories[categoryIndex].tasks = state.categories[categoryIndex].tasks.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { getCategoriesStart, getCategoriesSuccess, getCategoriesFailure } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;