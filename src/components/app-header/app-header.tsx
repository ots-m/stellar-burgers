import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { USER_SLICE_NAME } from '../../services/slices/sliceNames';

export const AppHeader: FC = () => {
  const user = useAppSelector((state) => state[USER_SLICE_NAME].user);

  return <AppHeaderUI userName={user?.name || ''} />;
};
