import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";

const initialState = {
  categories: [] as Category[],
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
    addCategory(state, action : PayloadAction<Category>) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action : { payload: any }) {
      const index = state.categories.findIndex((category) => category._id === action.payload.id);
      state.categories[index].name = action.payload.name;
    },
    deleteCategory(state, action : { payload: any }) {
      state.categories = state.categories.filter((category) => category._id !== action.payload.id);
    },
    addTask(state, action : { payload: any }) {
      console.log(action.payload);
      const categoryIndex = state.categories.findIndex((category) => category._id === action.payload.category);
      state.categories[categoryIndex].tasks.push(action.payload);
    },
    deleteTask(state, action : { payload: any }) {
      const categoryIndex = state.categories.findIndex((category) => category._id === action.payload.categoryId);
      state.categories[categoryIndex].tasks = state.categories[categoryIndex].tasks.filter((task) => task._id !== action.payload.id);
    },
  },
});

export const { getCategoriesStart, getCategoriesSuccess, getCategoriesFailure, addCategory, updateCategory, deleteCategory, addTask, deleteTask } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;