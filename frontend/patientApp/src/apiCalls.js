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
      '439664914133-0q13cs3agcijsu14p111gk5eq1n0fjtp.apps.googleusercontent.com',
  });

  const token = await AsyncStorage.getItem('CILVER_TOKEN_PATIENT');

  const timer = setTimeout(() => {
    if (token) {
      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          try {
            const HeadURL = await AsyncStorage.getItem('CILVER_URL');
            const res = await axios.get(`${HeadURL}/patient/profile`, {
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
    const res = await axios.post(`${HeadURL}/patient/login`, data);
    await AsyncStorage.setItem('CILVER_TOKEN_PATIENT', res.data.token);
    await setProfile(res.data.token, dispatch);
    dispatch({type: 'LOGIN_USER_SUCCESS', payload: res.data.token});
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
    dispatch({type: 'LOGIN_USER_FAILURE', payload: err});
  }
};

export const userRegister = async (data, toast, dispatch) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  dispatch({type: 'LOGIN_USER_START'});
  try {
    const res = await axios.post(`${HeadURL}/patient/register`, data);
    await userLogin(data, toast, dispatch);
    console.log(res.data);
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
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

    const res = await axios.post(`${HeadURL}/patient/googlelogin`, {
      idToken: idTokenResult.token,
    });

    await AsyncStorage.setItem('CILVER_TOKEN_PATIENT', res.data.token);
    await setProfile(res.data.token, dispatch);
    dispatch({type: 'LOGIN_USER_SUCCESS', payload: res.data.token});
  } catch (err) {
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
    console.log(err.message);
    dispatch({type: 'LOGIN_USER_FAILURE', payload: err});
  }
};

export const signOutUser = async dispatch => {
  await AsyncStorage.removeItem('CILVER_TOKEN_PATIENT');
  await GoogleSignin.signOut();
  dispatch({type: 'USER_SIGNOUT'});
};

export const generateOTP = async (email, type, setLoading, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/patient/generateotp`, {
      email,
      type,
    });
    ToastSuccess(toast, 'OTP has been send to your email');
    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
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
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
    return 'FAILED';
  } finally {
    setLoading(false);
  }
};

export const resetPassword = async (data, setLoading, navigation, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/patient/resetpassword`, data);
    ToastSuccess(toast, 'Password reset successful');
    navigation.navigate('Login');
    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
    return 'FAILED';
  } finally {
    setLoading(false);
  }
};

export const resetEmail = async (data, setLoading, navigation, toast) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/patient/resetemail`, data);
    ToastSuccess(toast, 'Email reset successful');
    navigation.navigate('Profile');
    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
    return 'FAILED';
  } finally {
    setLoading(false);
  }
};

//PROFILE
export const setProfile = async (token, dispatch) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.get(`${HeadURL}/patient/profile`, {
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
  const res = await axios.get(`${HeadURL}/patient/profile`, {
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
    const res = await axios.post(`${HeadURL}/patient/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.navigate('MainScreen');
    await setProfile(token, dispatch);
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
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
    const res = await axios.patch(`${HeadURL}/patient/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.navigate('Profile');
    await setProfile(token, dispatch);
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
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

//Slot
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

//Search
export const getDoctorSearchResults = async (
  searchString,
  setData,
  setLoading,
  toast,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  setLoading(true);
  try {
    const res = await axios.get(`${HeadURL}/api/searchdoctors/${searchString}`);
    setData(res.data);
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
  } finally {
    setLoading(false);
  }
};

//Booking
export const postBooking = async (
  data,
  setLoading,
  token,
  navigation,
  toast,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    const res = await axios.post(`${HeadURL}/patient/booking`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.navigate('Appointments');
  } catch (err) {
    console.log(err);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
  } finally {
    setLoading(false);
  }
};

export const getBookings = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const token = params.queryKey[1];
  const res = await axios.get(`${HeadURL}/patient/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

//Prescription
export const postPrescription = async (
  url,
  bookingId,
  setLoading,
  token,
  toast,
) => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: url,
      type: 'image/jpeg', // or the mime type of your image
      name: 'photo.jpg', // or the name of your image file
    });
    formData.append('bookingId', bookingId);

    const res = await axios.post(`${HeadURL}/patient/report`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    ToastSuccess(toast, 'Report Uploaded');
  } catch (err) {
    console.log(err.message);
    ToastError(toast, err.response?.data?.message || 'Backend cholche na!!!');
  } finally {
    setLoading(false);
  }
};

export const getPrescriptions = async params => {
  const HeadURL = await AsyncStorage.getItem('CILVER_URL');
  const token = params.queryKey[1];
  const bookingId = params.queryKey[2];
  const res = await axios.get(`${HeadURL}/patient/reports/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
