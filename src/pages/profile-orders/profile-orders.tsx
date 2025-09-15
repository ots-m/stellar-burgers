import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getOrders } from '../../services/slices/orders/ordersSlice';
import { ORDERS_SLICE_NAME } from '../../services/slices/sliceNames';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state[ORDERS_SLICE_NAME].orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getOrders());
    }
  }, [dispatch, orders.length]);

  return <ProfileOrdersUI orders={orders} />;
};
