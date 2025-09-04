import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BURGERCONSTRUCTOR_SLICE_NAME } from '../sliceNames';
import { TConstructorIngredient } from '@utils-types';

export type burgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: burgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: BURGERCONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient(state, action) {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    deleteIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    resetIngredients(state) {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const ingredient = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = ingredient;
      }
    },

    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const ingredient = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = ingredient;
      }
    }
  }
});

export const {
  addIngredient,
  deleteIngredient,
  resetIngredients,
  moveIngredientDown,
  moveIngredientUp
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice;
