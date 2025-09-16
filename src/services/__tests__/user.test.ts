import userSlice from '../slices/user/userSlice';
import {
  register,
  login,
  getUser,
  updateUser,
  forgotPassword,
  resetPassword,
  logout,
  checkUserAuth
} from '../slices/user/userThunks';

import { RequestStatus } from '@utils-types';

describe('userSlice', () => {
  const mockUser = {
    email: 'matvey.kyshtymov@gmail.com',
    name: 'Матвей'
  };

  const initialState = {
    isAuthChecked: false,
    isAuth: false,
    user: null,
    initialUserData: null,
    isChanged: false,
    status: RequestStatus.Idle,
    error: null
  };

  describe('register', () => {
    it('pending', () => {
      const action = { type: register.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Loading);
      expect(state.error).toBe(null);
    });

    it('fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Success);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBe(null);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка регистрации';
      const action = {
        type: register.rejected.type,
        payload: errorMessage
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Failed);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('login', () => {
    it('pending', () => {
      const action = { type: login.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Loading);
      expect(state.error).toBe(null);
    });

    it('fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Success);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBe(null);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка авторизации';
      const action = {
        type: login.rejected.type,
        payload: errorMessage
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Failed);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('getUser', () => {
    it('pending', () => {
      const action = { type: getUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Loading);
      expect(state.error).toBe(null);
    });

    it('fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Success);
      expect(state.user).toEqual(mockUser);
      expect(state.initialUserData).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isChanged).toBe(false);
      expect(state.error).toBe(null);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка загрузки пользователя';
      const action = {
        type: getUser.rejected.type,
        payload: errorMessage
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Failed);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('updateUser', () => {
    it('pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Loading);
      expect(state.error).toBe(null);
    });

    it('fulfilled', () => {
      const updatedUser = { ...mockUser, name: 'Updated User' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Success);
      expect(state.user).toEqual(updatedUser);
      expect(state.error).toBe(null);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка обновления пользователя';
      const action = {
        type: updateUser.rejected.type,
        payload: errorMessage
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Failed);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('forgotPassword', () => {
    it('pending', () => {
      const action = { type: forgotPassword.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Loading);
      expect(state.error).toBe(null);
    });

    it('fulfilled', () => {
      const action = { type: forgotPassword.fulfilled.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Success);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка восстановления пароля';
      const action = {
        type: forgotPassword.rejected.type,
        payload: errorMessage
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Failed);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('resetPassword', () => {
    it('pending', () => {
      const action = { type: resetPassword.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Loading);
      expect(state.error).toBe(null);
    });

    it('fulfilled', () => {
      const action = { type: resetPassword.fulfilled.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Success);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка восстановления пароля';
      const action = {
        type: resetPassword.rejected.type,
        payload: errorMessage
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Failed);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('logout', () => {
    it('pending', () => {
      const action = { type: logout.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Loading);
      expect(state.error).toBe(null);
    });

    it('fulfilled', () => {
      const stateWithUser = { ...initialState, user: mockUser, isAuth: true };
      const action = { type: logout.fulfilled.type };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.status).toBe(RequestStatus.Success);
      expect(state.user).toBe(null);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(null);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка при выходе';
      const action = {
        type: logout.rejected.type,
        payload: errorMessage
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Failed);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('checkUserAuth', () => {
    it('pending', () => {
      const action = { type: checkUserAuth.pending.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Loading);
      expect(state.error).toBe(null);
    });

    it('fulfilled', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Success);
      expect(state.user).toEqual(mockUser);
      expect(state.initialUserData).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuth).toBe(true);
      expect(state.isChanged).toBe(false);
      expect(state.error).toBe(null);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка проверки авторизации';
      const action = {
        type: checkUserAuth.rejected.type,
        payload: errorMessage
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatus.Failed);
      expect(state.user).toBe(null);
      expect(state.initialUserData).toBe(null);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuth).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
