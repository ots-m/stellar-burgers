import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feed/feedSlice';
import { RequestStatus } from '@utils-types';
import { FEED_SLICE_NAME } from '../../services/slices/sliceNames';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, error, status } = useAppSelector(
    (state) => state[FEED_SLICE_NAME]
  );

  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeed());
    }
  }, [dispatch, orders.length]);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  if (status === RequestStatus.Loading) {
    return <Preloader />;
  }
  if (status === RequestStatus.Failed) {
    return <div>{error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
