import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {
  backgroundColor1,
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  shadow,
  slotColor,
} from '../globalStyle';
import Header from '../components/common/header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import PatientCard from '../components/common/patientCard';
import {useToast} from 'react-native-toast-notifications';
import DeletePanel from '../components/common/deletePanel';
import {format} from 'date-fns';
import {deleteSlot, getBookingsBySlotId, getSlot} from '../apiCalls';
import {useQuery} from '@tanstack/react-query';
import LoadingScreen from '../components/common/loadingScreen';
import ErrorScreen from '../components/common/errorScreen';
import {AuthContext} from '../context/AuthContext';
import FocusAwareStatusBar from '../components/statusBar';

const SlotView = () => {
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const {token} = useContext(AuthContext);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    isError: slotError,
    isLoading: slotLoading,
    isRefetching: slotRefetching,
    data: slotData,
    refetch: slotRefetch,
  } = useQuery({
    queryKey: [`Slot${route.params.data._id}`, route.params.data._id],
    queryFn: getSlot,
  });

  const {
    isError: bookingError,
    isLoading: bookingLoading,
    isRefetching: bookingRefetching,
    data: bookingData,
    refetch: bookingRefetch,
  } = useQuery({
    queryKey: [
      `Bookings${route.params.data._id}`,
      token,
      route.params.data._id,
    ],
    queryFn: getBookingsBySlotId,
  });

  const HandleDeleteSlot = () => {
    setLoading(true);
    deleteSlot(slotData._id, setLoading, token, navigation, toast);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      slotRefetch();
      bookingRefetch();
    });
    return unsubscribe;
  }, [navigation]);
  console.log(bookingData);
  if (slotLoading || bookingLoading) return <LoadingScreen />;
  if (slotError || bookingError)
    return (
      <ErrorScreen
        refetch={() => {
          slotRefetch();
          bookingRefetch();
        }}
        loading={slotLoading || slotRefetching}
      />
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
        <View style={{paddingHorizontal: 20}}>
          <Header
            name={`${format(new Date(slotData.date), 'do, MMM')} | ${format(
              new Date(slotData.time.start),
              'h:mm aa',
            )}`}
          />
        </View>

        <View style={styles.heroBtnContainer}>
          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => {
              navigation.navigate('SlotEdit', {data: slotData});
            }}>
            <FontAwesomeIcon icon={faPenToSquare} color={slotColor} />
            <Text style={styles.heroBtnText} numberOfLines={1}>
              Edit Slot
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => {
              setIsPanelActive(true);
            }}>
            <FontAwesomeIcon icon={faTrash} color={'#ff6a6a'} />
            <Text style={styles.heroBtnText} numberOfLines={1}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text
          style={{
            ...fontBold,
            fontSize: 18,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}>
          Patients
        </Text>

        {bookingData.map(e => {
          return <PatientCard data={e.patientData} />;
        })}
      </View>

      <DeletePanel
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        label="Delete"
        handlePress={() => {
          HandleDeleteSlot();
        }}
        loading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingTop: 20, paddingBottom: 30},
  heroBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  heroBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: dark1,
    margin: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    ...shadow,
  },
  heroBtnText: {color: '#fff', marginTop: 5, ...fontRegular},
  monthBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: dark1,
    borderRadius: 15,
    marginTop: 20,
    ...shadow,
  },
  monthBtn: {backgroundColor: '#ffffffcc', borderRadius: 50, padding: 10},
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default SlotView;
