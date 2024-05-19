import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

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
import {launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../context/AuthContext';
import {getPrescriptions, postPrescription} from '../apiCalls';
import {useQuery} from '@tanstack/react-query';
import LoadingScreen from '../components/common/loadingScreen';
import ErrorScreen from '../components/common/errorScreen';
import ActionButton from '../components/common/actionButton';
import ImageView from 'react-native-image-viewing';
import WarningScreen from '../components/common/warningScreen';

const numColumns = 2;
const imageSize = Dimensions.get('window').width / numColumns;

const AppointmentView = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const {token} = useContext(AuthContext);

  const [isBlocked, setIsBlocked] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [loading, setLoading] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [images, setImages] = useState([{uri: ''}]);

  const {
    isError,
    isLoading,
    isRefetching,
    data: prescriptions,
    refetch,
  } = useQuery({
    queryKey: [
      `Reports${route?.params?.data?._id}`,
      token,
      route?.params?.data?._id,
    ],
    queryFn: getPrescriptions,
  });

  useEffect(() => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
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
              'Files permission is denied, please allow from app settings.',
            );
            break;
        }
      })
      .catch(error => {
        console.log(error);
        ToastError(toast, 'Something went wrong with files permission.');
      });
  }, []);

  const PickImage = async () => {
    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        includeBase64: false,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          ToastError(toast, `ImagePicker Error: ${response.error}`);
        } else {
          await postPrescription(
            response?.assets[0]?.uri,
            route?.params?.data?._id,
            setLoading,
            token,
            toast,
          );
          refetch();
        }
      },
    );
  };

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorScreen refetch={refetch} loading={isLoading || isRefetching} />
    );

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
        <Header name="Reports" />
      </View>

      <View style={styles.content}>
        {isBlocked ? (
          <Text>PERMISSION BLOCKED</Text>
        ) : (
          <>
            {prescriptions.length ? (
              <FlatList
                contentContainerStyle={{flex: 1}}
                data={prescriptions}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        setImages([{uri: item.url}]);
                        setIsVisible(true);
                      }}>
                      <Image source={{uri: item.url}} style={styles.image} />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item._id}
                numColumns={numColumns}
              />
            ) : (
              <WarningScreen label="No Reports Added" />
            )}

            <ImageView
              images={images}
              imageIndex={0}
              visible={visible}
              presentationStyle="overFullScreen"
              onRequestClose={() => setIsVisible(false)}
            />

            <View>
              <ActionButton
                label="Upload Report"
                loading={loading}
                handlePress={() => {
                  if (!loading) PickImage();
                }}
              />
            </View>
          </>
        )}
      </View>
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
    paddingHorizontal: 5,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  item: {padding: 5},
  image: {width: imageSize - 15, height: imageSize - 10, borderRadius: 15},
});

export default AppointmentView;
