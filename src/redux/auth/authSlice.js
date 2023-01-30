import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import authOperations from './authOperations';

const initialState = {
  user: { username: null, email: null },
  token: null,
  isAuth: false,
  error: null,
  isLoading: false,
  isRefreshingUser: false,
};

function pending(state) {
  state.isLoading = true;
}

function rejected(state, { payload }) {
  state.isLoading = false;
  state.error = payload;
}
function fulfilled(state) {
  state.isLoading = false;
  state.error = null;
}

const extraActions = [
  authOperations.register,
  authOperations.logIn,
  authOperations.logOut,
  authOperations.fetchCurrentUser,
];

const getActions = type => extraActions.map(action => action[type]);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(authOperations.register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuth = true;
      })
      .addCase(authOperations.logIn.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuth = true;
      })
      .addCase(authOperations.logOut.fulfilled, state => {
        state.user = { username: null, email: null };
        state.token = null;
        state.isAuth = false;
      })

      .addCase(authOperations.fetchCurrentUser.pending, state => {
        state.isRefreshingUser = true;
      })
      .addCase(
        authOperations.fetchCurrentUser.fulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.isAuth = true;
          state.isRefreshingUser = false;
        }
      )
      .addCase(authOperations.fetchCurrentUser.rejected, state => {
        state.isRefreshingUser = false;
      })
      .addMatcher(isAnyOf(...getActions('pending')), pending)
      .addMatcher(isAnyOf(...getActions('rejected')), rejected)
      .addMatcher(isAnyOf(...getActions('fulfilled')), fulfilled);
  },
});

export const authReducer = authSlice.reducer;