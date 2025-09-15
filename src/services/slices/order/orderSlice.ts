import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from '../sliceNames';
import { getOrderByNumberApi } from '@api';

export type orderState = {
  newOrder: TOrder | null;
  orderByNumber: TOrder | null;
  status: RequestStatus;
  error: string | null;
};

const initialState: orderState = {
  newOrder: null,
  orderByNumber: null,
  status: RequestStatus.Idle,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (number: number, thunkAPI) => {
    try {
      const data = await getOrderByNumberApi(number);
      return data.orders[0] || null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Не удалось загрузить заказ'
      );
    }
  }
);

const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    OrderByNumber(state, action) {
      state.orderByNumber = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.newOrder = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка загрузки';
      });
  }
});

export const { OrderByNumber } = orderSlice.actions;
export default orderSlice;
