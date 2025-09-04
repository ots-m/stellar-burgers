import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { INGREDIENT_SLICE_NAME } from '../sliceNames';
import { getIngredientsApi } from '@api';

export type ingredientState = {
  ingredients: TIngredient[];
  status: RequestStatus;
  error: string | null;
};

const initialState: ingredientState = {
  ingredients: [],
  status: RequestStatus.Idle,
  error: null
};

export const getIngredients = createAsyncThunk(
  `${INGREDIENT_SLICE_NAME}/getIngredients`,
  async (_, thunkAPI) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.message || 'Не удалось загрузить ингредиенты'
      );
    }
  }
);

const ingredientSlice = createSlice({
  name: INGREDIENT_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          (action.payload as string) || 'Ошибка загрузки ингредиентов';
      });
  }
});

export default ingredientSlice;
