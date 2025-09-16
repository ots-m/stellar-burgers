import feedSlice, { getFeed } from '../slices/feed/feedSlice';
import { RequestStatus } from '@utils-types';

describe('feedSlice', () => {
  const mockFeedData = {
    orders: [
      {
        _id: '68c947b0673086001ba88780',
        0: '643d69a5c3f7b9001cfa093d',
        1: '643d69a5c3f7b9001cfa0940',
        2: '643d69a5c3f7b9001cfa093d',
        status: 'done',
        name: 'Флюоресцентный метеоритный бургер',
        createdAt: '2025-09-16T11:19:12.458Z',
        updatedAt: '2025-09-16T11:19:13.579Z',
        number: 88823
      }
    ],
    total: 88448,
    totalToday: 61
  };

  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: RequestStatus.Idle,
    error: null
  };

  it('pending', () => {
    const action = { type: getFeed.pending.type };
    const state = feedSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Loading);
    expect(state.error).toBe(null);
  });

  it('fulfilled', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: mockFeedData
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Success);
    expect(state.orders).toEqual(mockFeedData.orders);
    expect(state.total).toBe(mockFeedData.total);
    expect(state.totalToday).toBe(mockFeedData.totalToday);
    expect(state.error).toBe(null);
  });

  it('rejected', () => {
    const errorMessage = 'Не удалось загрузить ленту';
    const action = {
      type: getFeed.rejected.type,
      payload: errorMessage
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Failed);
    expect(state.error).toBe(errorMessage);
  });
});
