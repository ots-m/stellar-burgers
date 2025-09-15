import { Preloader } from '@ui';
import {
  selectAuthCheck,
  selectUser
} from '../../services/slices/user/userSlice';
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  isPublic?: boolean;
};

export function ProtectedRoute({ children, isPublic }: ProtectedRouteProps) {
  const user = useAppSelector(selectUser);
  const checkAuth = useAppSelector(selectAuthCheck);
  const location = useLocation();

  if (!checkAuth) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = (location.state as any)?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!isPublic && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
