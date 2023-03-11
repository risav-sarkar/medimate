import AsyncStorage from '@react-native-async-storage/async-storage';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth, {firebase} from '@react-native-firebase/auth';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {ToastError} from './components/toastFunction';

//AUTH
export const fetchUser = async dispatch => {
  dispatch({type: 'FETCH_USER_START'});
  // GoogleSignin.configure({
  //   webClientId:
  //     '112285166864-cg5bk4mnqget75apg3a8tado53t553lk.apps.googleusercontent.com',
  // });

  const token = await AsyncStorage.getItem('CILVER_TOKEN_DOCTOR');

  const timer = setTimeout(() => {
    if (token) {
      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          try {
            await setProfile(token, dispatch);
            dispatch({type: 'FETCH_USER_FOUND', payload: token});
          } catch (err) {
            console.log(err);
            signOutUser(dispatch);
          }
        } else {
          dispatch({type: 'FETCH_USER_ERROR'});
        }
      });
    } else dispatch({type: 'FETCH_USER_NOTFOUND'});
  }, 2000);
  return () => clearTimeout(timer);
};

export const userLogin = async (data, toast, dispatch) => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  dispatch({type: 'LOGIN_USER_START'});
  try {
    const res = await axios.post(`${DoctorURL}/doctor/login`, data);
    await AsyncStorage.setItem('CILVER_TOKEN_DOCTOR', res.data.token);
    await setProfile(res.data.token, dispatch);
    dispatch({type: 'LOGIN_USER_SUCCESS', payload: res.data.token});
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
    dispatch({type: 'LOGIN_USER_FAILURE', payload: err});
  }
};

export const userRegister = async (data, toast, dispatch) => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  dispatch({type: 'LOGIN_USER_START'});
  try {
    const res = await axios.post(`${DoctorURL}/doctor/register`, data);
    await userLogin(data, toast, dispatch);
    console.log(res.data);
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
    dispatch({type: 'LOGIN_USER_FAILURE', payload: err});
  }
};

export const setProfile = async (token, dispatch) => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.get(`${DoctorURL}/doctor/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({type: 'SET_PROFILE', payload: res.data});
  } catch (err) {
    console.log(err);
    dispatch({type: 'SET_PROFILE', payload: null});
  }
};

export const signOutUser = async dispatch => {
  await AsyncStorage.removeItem('CILVER_TOKEN_DOCTOR');
  // await GoogleSignin.signOut();
  dispatch({type: 'USER_SIGNOUT'});
};
