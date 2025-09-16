import orderSlice, { getOrderByNumber } from '../slices/order/orderSlice';
import { RequestStatus } from '@utils-types';

describe('orderSlice', () => {
  const mockOrder = {
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0947',
          name: 'Плоды Фалленианского дерева',
          type: 'main',
          proteins: 20,
          fat: 5,
          carbohydrates: 55,
          calories: 77,
          price: 874,
          image: 'https://code.s3.yandex.net/react/code/sp_1.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ],
      _id: '68c835b4673086001ba88619',
      owner: {
        name: 'Матвей',
        email: 'matvey.kyshtymov@gmail.com',
        createdAt: '2025-09-03T19:52:50.947Z',
        updatedAt: '2025-09-04T21:40:09.824Z'
      },
      status: 'done',
      name: 'Space фалленианский краторный spicy люминесцентный метеоритный бургер',
      createdAt: '2025-09-15T15:50:12.796Z',
      updatedAt: '2025-09-15T15:50:14.133Z',
      number: 88791,
      price: 7542
    }
  };

  const initialState = {
    newOrder: null,
    orderByNumber: null,
    status: RequestStatus.Idle,
    error: null
  };

  it('pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Loading);
    expect(state.error).toBe(null);
  });

  it('fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Success);
    expect(state.newOrder).toEqual(mockOrder);
    expect(state.error).toBe(null);
  });

  it('rejected', () => {
    const errorMessage = 'Не удалось загрузить заказ';
    const action = {
      type: getOrderByNumber.rejected.type,
      payload: errorMessage
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Failed);
    expect(state.error).toBe(errorMessage);
  });
});
