import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { BURGERCONSTRUCTOR_SLICE_NAME, ORDERS_SLICE_NAME } from '../sliceNames';
import { getOrdersApi, orderBurgerApi } from '@api';
import { RootState } from 'src/services/store';

export type ordersState = {
  orders: TOrder[];
  status: RequestStatus;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: ordersState = {
  orders: [],
  status: RequestStatus.Idle,
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const getOrders = createAsyncThunk(
  `${ORDERS_SLICE_NAME}/getOrders`,
  async (_, thunkAPI) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.message || 'Ошибка получения заказов'
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  `${ORDERS_SLICE_NAME}/createOrder`,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const bun = state[BURGERCONSTRUCTOR_SLICE_NAME].bun?._id;
      const ingredients = state[BURGERCONSTRUCTOR_SLICE_NAME].ingredients.map(
        (ingredient: { _id: string }) => ingredient._id
      );
      if (!bun) {
        return thunkAPI.rejectWithValue('Булка не выбрана');
      }
      const orderData = [
        bun,
        ...ingredients.map((ingredient) => ingredient),
        bun
      ];
      const res = await orderBurgerApi(orderData);
      return res.order;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.message || 'Ошибка оформления заказа'
      );
    }
  }
);

const ordersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {
    closeOrderModalData(state) {
      state.orderModalData = null;
      state.error = null;
    }
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка загрузки';
      })
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка загрузки';
      });
  }
});

export const { closeOrderModalData } = ordersSlice.actions;
export const { selectOrderModalData, selectOrderRequest } =
  ordersSlice.selectors;

export default ordersSlice;
