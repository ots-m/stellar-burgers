import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { USER_SLICE_NAME } from '../sliceNames';
import {
  checkUserAuth,
  getUser,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  updateUser
} from './userThunks';

export type TUserState = {
  isAuthChecked: boolean;
  isAuth: boolean;
  user: TUser | null;
  initialUserData: TUser | null;
  isChanged: boolean;
  status: RequestStatus;
  error: string | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuth: false,
  user: null,
  initialUserData: null,
  isChanged: false,
  status: RequestStatus.Idle,
  error: null
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectAuthCheck: (state) => state.isAuthChecked
  },
  reducers: {
    setUser(state, action) {
      state.initialUserData = action.payload;
      state.isChanged = true;
    },
    resetUser(state) {
      state.initialUserData = state.user;
      state.isChanged = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = RequestStatus.Success;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка регистрации';
      })
      .addCase(login.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = RequestStatus.Success;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка авторизации';
      })
      .addCase(getUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initialUserData = action.payload;
        state.isAuthChecked = true;
        state.isChanged = false;
        state.status = RequestStatus.Success;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthChecked = true;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка загрузки пользователя';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка обновления пользователя';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = RequestStatus.Success;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка восстановления пароля';
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = RequestStatus.Success;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка восстановления пароля';
      })
      .addCase(logout.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = RequestStatus.Success;
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка при выходе';
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initialUserData = action.payload;
        state.isAuthChecked = true;
        state.isAuth = true;
        state.isChanged = false;
        state.status = RequestStatus.Success;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.user = null;
        state.initialUserData = null;
        state.isAuthChecked = true;
        state.isAuth = false;
        state.status = RequestStatus.Failed;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка проверки авторизации';
      });
  }
});

export const { setUser, resetUser } = userSlice.actions;
export const { selectUser, selectAuthCheck } = userSlice.selectors;
export default userSlice;
