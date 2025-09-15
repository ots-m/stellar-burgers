import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { resetPassword } from '../../services/slices/user/userThunks';
import { RequestStatus } from '@utils-types';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const { error, status } = useAppSelector((state) => state.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token })).then(() => {
      localStorage.setItem('resetPassword', 'false');
      navigate('/login', { replace: true });
    });
  };

  return (
    <ResetPasswordUI
      errorText={error ?? ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
