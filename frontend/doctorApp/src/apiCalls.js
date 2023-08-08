import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {ToastError, ToastSuccess} from './components/toastFunction';

//AUTH
export const fetchUser = async dispatch => {
  dispatch({type: 'FETCH_USER_START'});
  GoogleSignin.configure({
    webClientId:
      '439664914133-mmpie5cg3ifbnoltliu54t1fjt4ir077.apps.googleusercontent.com',
  });

  const token = await AsyncStorage.getItem('CILVER_TOKEN_DOCTOR');

  const timer = setTimeout(() => {
    if (token) {
      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          try {
            const HeadURL = await AsyncStorage.getItem('CILVER_URL');
            const res = await axios.get(`${HeadURL}/doctor/profile`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            dispatch({type: 'SET_PROFILE', payload: res.data});
            dispatch({type: 'FETCH_USER_FOUND', payload: token});
          } catch (err) {
            dispatch({type: 'FETCH_USER_ERROR'});
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
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  dispatch({type: 'LOGIN_USER_START'});
  try {
    const res = await axios.post(`${HeadURL}/doctor/login`, data);
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
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  dispatch({type: 'LOGIN_USER_START'});
  try {
    const res = await axios.post(`${HeadURL}/doctor/register`, data);
    await userLogin(data, toast, dispatch);
    console.log(res.data);
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
    dispatch({type: 'LOGIN_USER_FAILURE', payload: err});
  }
};

export const googleLogin = async (toast, dispatch) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  dispatch({type: 'LOGIN_USER_START'});
  try {
    await GoogleSignin.signOut();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();

    const res = await axios.post(`${HeadURL}/doctor/googlelogin`, {
      idToken: idTokenResult.token,
    });

    await AsyncStorage.setItem('CILVER_TOKEN_DOCTOR', res.data.token);
    await setProfile(res.data.token, dispatch);
    dispatch({type: 'LOGIN_USER_SUCCESS', payload: res.data.token});
  } catch (err) {
    ToastError(toast, err.response?.data?.message);
    console.log(err.message);
    dispatch({type: 'LOGIN_USER_FAILURE', payload: err});
  }
};

export const signOutUser = async dispatch => {
  await AsyncStorage.removeItem('CILVER_TOKEN_DOCTOR');
  await GoogleSignin.signOut();
  dispatch({type: 'USER_SIGNOUT'});
};

export const generateOTP = async (email, type, setLoading, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/doctor/generateotp`, {
      email,
      type,
    });
    ToastSuccess(toast, 'OTP has been send to your email');
    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
    return 'FAILED';
  } finally {
    setLoading(false);
  }
};

export const verifyEmail = async (email, setLoading, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.get(`${HeadURL}/api/doctoremail/${email}`);
    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
    return 'FAILED';
  } finally {
    setLoading(false);
  }
};

export const resetPassword = async (data, setLoading, navigation, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/doctor/resetpassword`, data);
    ToastSuccess(toast, 'Password reset successful');
    navigation.navigate('Login');
    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
    return 'FAILED';
  } finally {
    setLoading(false);
  }
};

export const resetEmail = async (data, setLoading, navigation, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/doctor/resetemail`, data);
    ToastSuccess(toast, 'Email reset successful');
    navigation.navigate('Profile');
    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
    return 'FAILED';
  } finally {
    setLoading(false);
  }
};

//PROFILE
export const setProfile = async (token, dispatch) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.get(`${HeadURL}/doctor/profile`, {
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

export const getProfile = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const token = params.queryKey[1];
  const res = await axios.get(`${HeadURL}/doctor/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postProfile = async (
  data,
  setLoading,
  token,
  navigation,
  toast,
  dispatch,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/doctor/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.navigate('MainScreen');
    await setProfile(token, dispatch);
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const patchProfile = async (
  data,
  setLoading,
  token,
  navigation,
  toast,
  dispatch,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.patch(`${HeadURL}/doctor/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.navigate('Profile');
    await setProfile(token, dispatch);
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

//Chamber
export const getChambers = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const doctorID = params.queryKey[1];
  const res = await axios.get(`${HeadURL}/api/chambers/${doctorID}`);
  return res.data;
};

export const getChamber = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const chamberID = params.queryKey[1];
  const res = await axios.get(`${HeadURL}/api/chamber/${chamberID}`);
  return res.data;
};

export const postChamber = async (
  data,
  setLoading,
  token,
  navigation,
  toast,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/doctor/chamber`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.navigate('Chamber');
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const patchChamber = async (
  data,
  setLoading,
  token,
  navigation,
  toast,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.patch(
      `${HeadURL}/doctor/chamber/${data._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    navigation.goBack();
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const deleteChamber = async (
  id,
  setLoading,
  token,
  navigation,
  toast,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.delete(`${HeadURL}/doctor/chamber/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.navigate('Chamber');
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

//Slot
export const postSingleSlot = async (
  data,
  setLoading,
  token,
  navigation,
  toast,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/doctor/slot`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.goBack();
    ToastSuccess(toast, 'Slot Created');
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const postMultipleSlot = async (
  data,
  setLoading,
  token,
  navigation,
  toast,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/doctor/slot/multiple`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.goBack();
    ToastSuccess(toast, 'Slots Created');
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const getSlot = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const slotId = params.queryKey[1];
  const res = await axios.get(`${HeadURL}/api/slot/${slotId}`);
  return res.data;
};

export const getSlotsByChamberAndMonth = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const chamberID = params.queryKey[1];
  const date = params.queryKey[2];
  const res = await axios.get(`${HeadURL}/api/slots/${chamberID}/${date}`);
  return res.data;
};

export const getSlotsByDoctorAndMonth = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const doctorID = params.queryKey[1];
  const date = params.queryKey[2];
  const res = await axios.get(
    `${HeadURL}/api/slots/doctor/${doctorID}/${date}`,
  );
  return res.data;
};

export const getSlotsByDoctorAndDate = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const doctorID = params.queryKey[1];
  const date = params.queryKey[2];
  const res = await axios.get(
    `${HeadURL}/api/slots/doctor/date/${doctorID}/${date}`,
  );
  return res.data;
};

export const patchSlot = async (data, setLoading, token, navigation, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.patch(`${HeadURL}/doctor/slot/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.goBack();
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const deleteSlot = async (id, setLoading, token, navigation, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.delete(`${HeadURL}/doctor/slot/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.goBack();
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

//Bookings
export const getBookingsBySlotId = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const token = params.queryKey[1];
  const slotId = params.queryKey[2];
  const res = await axios.get(`${HeadURL}/doctor/booking/${slotId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
