import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUser, updateUser } from '../../services/slices/user/userThunks';
import { resetUser, setUser } from '../../services/slices/user/userSlice';
import { USER_SLICE_NAME } from '../../services/slices/sliceNames';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { user, isChanged, initialUserData } = useAppSelector(
    (state) => state[USER_SLICE_NAME]
  );

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  const isFormChanged = isChanged;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (initialUserData) {
      dispatch(updateUser(initialUserData));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetUser());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUser({ ...initialUserData, [e.target.name]: e.target.value }));
  };

  return (
    <ProfileUI
      formValue={{
        name: initialUserData?.name ?? '',
        email: initialUserData?.email ?? '',
        password: initialUserData?.password ?? ''
      }}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
