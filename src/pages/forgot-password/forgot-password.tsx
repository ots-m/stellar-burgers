import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { forgotPassword } from '../../services/slices/user/userThunks';
import { RequestStatus } from '@utils-types';
import { Preloader } from '@ui';

export const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ email })).then(() => {
      localStorage.setItem('resetPassword', 'true');
      navigate('/reset-password', { replace: true });
    });
  };

  if (status === RequestStatus.Loading) {
    return <Preloader />;
  }

  return (
    <ForgotPasswordUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
