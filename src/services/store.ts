import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import burgerConstructorSlice from './slices/burgerConstrustor/burgerConstrustorSlice';
import ingredientSlice from './slices/ingredients/ingredientsSlice';
import feedSlice from './slices/feed/feedSlice';
import orderSlice from './slices/order/orderSlice';
import ordersSlice from './slices/orders/ordersSlice';
import userSlice from './slices/user/userSlice';

export const rootReducer = combineReducers({
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [ingredientSlice.name]: ingredientSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [userSlice.name]: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
