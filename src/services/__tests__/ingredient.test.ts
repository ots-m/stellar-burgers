import ingredientSlice, {
  getIngredients
} from '../slices/ingredients/ingredientsSlice';
import { RequestStatus } from '@utils-types';

describe('ingredientSlice', () => {
  const mockIngredients = [
    {
      _id: 'bun_1',
      name: 'Краторная булка Ots-57',
      type: 'bun',
      proteins: 800,
      fat: 0,
      carbohydrates: 0,
      calories: 4200,
      price: 12550,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: 'cutlet_2',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 0,
      carbohydrates: 5,
      calories: 33,
      price: 200,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
    }
  ];

  const initialState = {
    ingredients: [],
    status: RequestStatus.Idle,
    error: null
  };

  it('pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Loading);
    expect(state.error).toBe(null);
  });

  it('fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Success);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBe(null);
  });

  it('rejected', () => {
    const errorMessage = 'Не удалось загрузить ингредиенты';
    const action = {
      type: getIngredients.rejected.type,
      payload: errorMessage
    };
    const state = ingredientSlice.reducer(initialState, action);

    expect(state.status).toBe(RequestStatus.Failed);
    expect(state.error).toBe(errorMessage);
  });
});
