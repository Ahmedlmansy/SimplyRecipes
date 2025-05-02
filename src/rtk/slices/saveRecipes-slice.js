import { createSlice } from "@reduxjs/toolkit";
const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
export const saveRecipesSlice = createSlice({
  name: "saveRecipes",
  initialState: storedRecipes,
  reducers: {
    toggleSavedRecipe: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.findIndex((item) => item.id === recipe.id);
      if (existingIndex >= 0) {
        state.splice(existingIndex, 1);
      } else {
        state.push(recipe);
      }
      localStorage.setItem("savedRecipes", JSON.stringify(state));
    },
    clearSavedRecipes: (state) => {
      state.length = 0;
      localStorage.removeItem("savedRecipes");
    },
  },
});

export const { toggleSavedRecipe, clearSavedRecipes } =
  saveRecipesSlice.actions;
export default saveRecipesSlice.reducer;
