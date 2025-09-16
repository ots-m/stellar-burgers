import { rootReducer } from '../store';

describe('Проверерка правильной инициализаций rootReducer', () => {
  it('инициализация корректна', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('user');
  });
});
