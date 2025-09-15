import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { register } from '../../services/slices/user/userThunks';
import { RequestStatus } from '@utils-types';
import { Preloader } from '@ui';
import { Profile } from '../profile';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ email, password, name: userName }));
  };

  if (status === RequestStatus.Loading) {
    return <Preloader />;
  }
  if (status === RequestStatus.Success) {
    return <Profile />;
  }

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
