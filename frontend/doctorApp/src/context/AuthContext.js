import {createContext, useEffect, useReducer} from 'react';
import React from 'react';
import AuthReducer from './AuthReducer';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const SetUrl = async e => {
    await AsyncStorage.setItem('CILVER_DOCTOR_URL', e.doctorURL);
    await AsyncStorage.setItem('CILVER_PATIENT_URL', e.patientURL);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('headUrl')
      .doc('kv3CZRyRhKdNeB9LJIUF')
      .onSnapshot(documentSnapshot => {
        SetUrl(documentSnapshot.data());
      });
  }, []);

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
