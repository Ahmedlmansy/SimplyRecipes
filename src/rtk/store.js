import { configureStore } from "@reduxjs/toolkit";
import saveRecipesReducer from "./slices/saveRecipes-slice";

export const store = configureStore({
  reducer: {
    saveRecipes: saveRecipesReducer,
  },
});
