import AsyncStorage from '@react-native-async-storage/async-storage';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth, {firebase} from '@react-native-firebase/auth';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {ToastError, ToastSuccess} from './components/toastFunction';

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
            const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
            const res = await axios.get(`${DoctorURL}/doctor/profile`, {
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

export const signOutUser = async dispatch => {
  await AsyncStorage.removeItem('CILVER_TOKEN_DOCTOR');
  // await GoogleSignin.signOut();
  dispatch({type: 'USER_SIGNOUT'});
};

//PROFILE
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

export const getProfile = async params => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  const token = params.queryKey[1];
  const res = await axios.get(`${DoctorURL}/doctor/profile`, {
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
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.post(`${DoctorURL}/doctor/profile`, data, {
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
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.patch(`${DoctorURL}/doctor/profile`, data, {
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
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  const doctorID = params.queryKey[1];
  const res = await axios.get(`${DoctorURL}/api/chambers/${doctorID}`);
  return res.data;
};

export const getChamber = async params => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  const chamberID = params.queryKey[1];
  const res = await axios.get(`${DoctorURL}/api/chamber/${chamberID}`);
  return res.data;
};

export const postChamber = async (
  data,
  setLoading,
  token,
  navigation,
  toast,
) => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.post(`${DoctorURL}/doctor/chamber`, data, {
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
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.patch(
      `${DoctorURL}/doctor/chamber/${data._id}`,
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
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.delete(`${DoctorURL}/doctor/chamber/${id}`, {
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
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.post(`${DoctorURL}/doctor/slot`, data, {
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
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.post(`${DoctorURL}/doctor/slot/multiple`, data, {
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
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  const slotId = params.queryKey[1];
  const res = await axios.get(`${DoctorURL}/api/slot/${slotId}`);
  return res.data;
};

export const getSlotsByChamberAndMonth = async params => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  const chamberID = params.queryKey[1];
  const date = params.queryKey[2];
  const res = await axios.get(`${DoctorURL}/api/slots/${chamberID}/${date}`);
  return res.data;
};

export const patchSlot = async (data, setLoading, token, navigation, toast) => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.patch(
      `${DoctorURL}/doctor/slot/${data._id}`,
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

export const deleteSlot = async (id, setLoading, token, navigation, toast) => {
  const DoctorURL = await AsyncStorage.getItem('CILVER_DOCTOR_URL');
  try {
    const res = await axios.delete(`${DoctorURL}/doctor/slot/${id}`, {
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
