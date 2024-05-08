import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  backgroundColor1,
  backgroundColor2,
  dark1,
  fontRegular,
  shadow,
} from '../globalStyle';
import FocusAwareStatusBar from '../components/statusBar';
import Header from '../components/common/header';
import {ToastError} from '../components/toastFunction';

const AppointmentView = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();

  const [isBlocked, setIsBlocked] = useState(false);
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    request(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        console.log(result);
        switch (result) {
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            setIsGranted(true);
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            setIsBlocked(true);
            ToastError(
              toast,
              'Camera permission is denied, please allow from app settings.',
            );
            break;
        }
      })
      .catch(error => {
        console.log(error);
        ToastError(toast, 'Something went wrong with camera permission.');
      });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor2}
      />
      <View style={styles.header}>
        <Header name="Appointment" />
      </View>

      <View style={styles.content}>{isBlocked && <Text>BLOCKED</Text>}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingVertical: 20},
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});

export default AppointmentView;
