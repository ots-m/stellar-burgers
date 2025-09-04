import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../sliceNames';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { TUser } from '@utils-types';

export const register = createAsyncThunk(
  `${USER_SLICE_NAME}/register`,
  async (data: TRegisterData, thunkAPI) => {
    try {
      const res = await registerUserApi(data);
      return res.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

export const login = createAsyncThunk(
  `${USER_SLICE_NAME}/login`,
  async (login: TLoginData, thunkAPI) => {
    try {
      const res = await loginUserApi(login);
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      return res.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка авторизации');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/forgotPassword`,
  async (data: { email: string }, thunkAPI) => {
    try {
      await forgotPasswordApi(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Ошибка восстановления пароля'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/resetPassword`,
  async (data: { password: string; token: string }, thunkAPI) => {
    try {
      await resetPasswordApi(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Ошибка восстановления пароля'
      );
    }
  }
);

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async (_, thunkAPI) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.message || 'Ошибка загрузки пользователя'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (data: TUser, thunkAPI) => {
    try {
      const res = await updateUserApi(data);
      return res.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Ошибка обновления пользователя'
      );
    }
  }
);

export const logout = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  async (_, thunkAPI) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка при выходе');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  `${USER_SLICE_NAME}/checkUserAuth`,
  async (_, thunkAPI) => {
    try {
      const accessToken = getCookie('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken && !refreshToken) {
        return thunkAPI.rejectWithValue('Нужна авторизация');
      }

      const res = await getUserApi();
      return res.user;
    } catch (error: any) {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return thunkAPI.rejectWithValue(
        error?.message || 'Ошибка проверки авторизации'
      );
    }
  }
);
