import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BURGERCONSTRUCTOR_SLICE_NAME,
  USER_SLICE_NAME
} from '../../services/slices/sliceNames';
import {
  closeOrderModalData,
  createOrder,
  getOrders,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/orders/ordersSlice';
import { resetIngredients } from '../../services/slices/burgerConstrustor/burgerConstrustorSlice';

export const BurgerConstructor: FC = () => {
  const { user, isAuth } = useAppSelector((state) => state[USER_SLICE_NAME]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = useAppSelector(
    (state) => state[BURGERCONSTRUCTOR_SLICE_NAME]
  );

  const orderRequest = useAppSelector(selectOrderRequest);

  const orderModalData = useAppSelector(selectOrderModalData);

  useEffect(() => {
    if (orderModalData && !orderRequest) {
      dispatch(resetIngredients());
    }
  }, [orderModalData, orderRequest, dispatch]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth || !user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(createOrder())
      .unwrap()
      .then(() => {
        dispatch(getOrders());
      });
  };

  const closeOrderModal = () => {
    dispatch(closeOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
