// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth, {firebase} from '@react-native-firebase/auth';
// import axios from 'axios';
// import NetInfo from '@react-native-community/netinfo';

//AUTH
export const fetchUser = async dispatch => {
  dispatch({type: 'FETCH_USER_START'});
  // GoogleSignin.configure({
  //   webClientId:
  //     '112285166864-cg5bk4mnqget75apg3a8tado53t553lk.apps.googleusercontent.com',
  // });

  // const token = await AsyncStorage.getItem('H4U_TOKEN_CLINIC');

  // const timer = setTimeout(() => {
  //   if (token) {
  //     NetInfo.fetch().then(async state => {
  //       if (state.isConnected) {
  //         const ClinicURL = await AsyncStorage.getItem('H4U_CLINIC_URL');
  //         try {
  //           const res = await axios.get(`${ClinicURL}/clinic/profile`, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           });

  //           dispatch({type: 'FETCH_USER_FOUND', payload: token});
  //           dispatch({type: 'SET_PROFILE', payload: res.data});
  //         } catch (err) {
  //           console.log(err);
  //           signOutUser(dispatch);
  //         }
  //       } else {
  //         dispatch({type: 'FETCH_USER_ERROR'});
  //       }
  //     });
  //   } else dispatch({type: 'FETCH_USER_NOTFOUND'});
  // }, 2000);
  // return () => clearTimeout(timer);

  const timer = setTimeout(() => {
    dispatch({type: 'FETCH_USER_FOUND', payload: 'token'});
    dispatch({type: 'SET_PROFILE', payload: 'profile'});
  }, 2000);
  return () => clearTimeout(timer);
};

// export const signOutUser = async dispatch => {
//   await AsyncStorage.removeItem('H4U_TOKEN_CLINIC');
//   await GoogleSignin.signOut();
//   dispatch({type: 'USER_SIGNOUT'});
// };
