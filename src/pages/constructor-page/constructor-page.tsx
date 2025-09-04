import { useAppDispatch, useAppSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredients/ingredientsSlice';
import { RequestStatus } from '@utils-types';
import { INGREDIENT_SLICE_NAME } from '../../services/slices/sliceNames';

export const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const { status, ingredients, error } = useAppSelector(
    (state) => state[INGREDIENT_SLICE_NAME]
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length, status]);

  if (status === RequestStatus.Failed) {
    return <div>{error}</div>;
  }

  if (status === RequestStatus.Loading) {
    return <Preloader />;
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
