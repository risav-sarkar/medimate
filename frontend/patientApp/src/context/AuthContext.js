import {createContext, useEffect, useReducer} from 'react';
import React from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  token: null,
  profile: null,
  isFetching: true,
  isLoading: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        profile: state.profile,
        isFetching: state.isFetching,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
