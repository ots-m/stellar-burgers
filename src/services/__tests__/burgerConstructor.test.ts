import burgerConstructorSlice, {
  addIngredient,
  deleteIngredient,
  resetIngredients,
  moveIngredientUp,
  moveIngredientDown,
  burgerConstructorState
} from '../slices/burgerConstrustor/burgerConstrustorSlice';

const mockIngredient = {
  _id: 'cutlet_1',
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
};

const mockBun = {
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
};

describe('burgerConstructorSlice reducer', () => {
  let initialState: burgerConstructorState;

  beforeEach(() => {
    initialState = {
      bun: null,
      ingredients: []
    };
  });

  describe('добавление ингредиентов', () => {
    test('добавляет булку', () => {
      const newState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(mockBun)
      );

      expect(newState.bun).toBeDefined();
      expect(newState.bun?._id).toBe(mockBun._id);
      expect(newState.bun).toHaveProperty('id');
      expect(newState.ingredients).toEqual([]);
    });

    test('добавляет котлету', () => {
      const newState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(mockIngredient)
      );

      expect(newState.bun).toBe(null);
      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]._id).toBe(mockIngredient._id);
      expect(newState.ingredients[0]).toHaveProperty('id');
    });

    describe('удаление ингредиентов', () => {
      test('удаляет ингредиент по id', () => {
        const stateWithIngredient = burgerConstructorSlice.reducer(
          initialState,
          addIngredient(mockIngredient)
        );

        const stateWithIngredients = burgerConstructorSlice.reducer(
          stateWithIngredient,
          addIngredient(mockIngredient)
        );

        const newState = burgerConstructorSlice.reducer(
          stateWithIngredients,
          deleteIngredient(stateWithIngredients.ingredients[0].id)
        );

        expect(newState.ingredients).toHaveLength(1);
        expect(newState.ingredients[0]._id).toBe(mockIngredient._id);
        expect(newState.ingredients[0].id).not.toBe(
          stateWithIngredients.ingredients[0].id
        );
      });

      describe('изменение порядка ингредиентов', () => {
        let stateWithIngredients: burgerConstructorState;

        beforeEach(() => {
          const state1 = burgerConstructorSlice.reducer(
            initialState,
            addIngredient(mockIngredient)
          );
          const state2 = burgerConstructorSlice.reducer(
            state1,
            addIngredient(mockIngredient)
          );
          const state3 = burgerConstructorSlice.reducer(
            state2,
            addIngredient({
              ...mockIngredient,
              _id: 'cutlet_2',
              name: 'Котлета 2'
            })
          );

          stateWithIngredients = state3;
        });

        test('перемещает ингредиент вверх', () => {
          const originalSecondIngredient = stateWithIngredients.ingredients[1];
          const originalFirstIngredient = stateWithIngredients.ingredients[0];

          const newState = burgerConstructorSlice.reducer(
            stateWithIngredients,
            moveIngredientUp(1)
          );

          expect(newState.ingredients[0]).toEqual(originalSecondIngredient);
          expect(newState.ingredients[1]).toEqual(originalFirstIngredient);
          expect(newState.ingredients[2]).toEqual(
            stateWithIngredients.ingredients[2]
          );
        });

        test('перемещает ингредиент вниз', () => {
          const originalFirstIngredient = stateWithIngredients.ingredients[0];
          const originalSecondIngredient = stateWithIngredients.ingredients[1];

          const newState = burgerConstructorSlice.reducer(
            stateWithIngredients,
            moveIngredientDown(0)
          );

          expect(newState.ingredients[0]).toEqual(originalSecondIngredient);
          expect(newState.ingredients[1]).toEqual(originalFirstIngredient);
          expect(newState.ingredients[2]).toEqual(
            stateWithIngredients.ingredients[2]
          );
        });

        describe('сброс ингредиентов', () => {
          test('очищает все ингредиенты и булку', () => {
            const stateWithBun = burgerConstructorSlice.reducer(
              initialState,
              addIngredient(mockBun)
            );

            const stateWithIngredients = burgerConstructorSlice.reducer(
              stateWithBun,
              addIngredient(mockIngredient)
            );

            const newState = burgerConstructorSlice.reducer(
              stateWithIngredients,
              resetIngredients()
            );

            expect(newState.bun).toBe(null);
            expect(newState.ingredients).toEqual([]);
          });
        });
      });
    });
  });
});
