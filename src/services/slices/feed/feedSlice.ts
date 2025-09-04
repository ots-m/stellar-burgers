import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { FEED_SLICE_NAME } from '../sliceNames';
import { getFeedsApi } from '@api';

export type feedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
  error: string | null;
};

const initialState: feedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle,
  error: null
};

export const getFeed = createAsyncThunk(
  `${FEED_SLICE_NAME}/getFeed`,
  async (_, thunkAPI) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Не удалось загрузить ленту'
      );
    }
  }
);

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка загрузки';
      });
  }
});

export default feedSlice;
