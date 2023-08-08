import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';

import {
  backgroundColor1,
  backgroundColor2,
  chamberColor,
  color1,
  dark1,
  fontBold,
  fontMedium,
  shadow,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseMedical, faPlus} from '@fortawesome/free-solid-svg-icons';
import ChamberCard from '../../components/common/chamberCard';
import {getBookings, getChambers} from '../../apiCalls';
import {useQuery} from '@tanstack/react-query';
import LoadingScreen from '../../components/common/loadingScreen';
import ErrorScreen from '../../components/common/errorScreen';
import WarningScreen from '../../components/common/warningScreen';
import FocusAwareStatusBar from '../../components/statusBar';
import {useNavigation} from '@react-navigation/native';
import Tabbar from '../../components/common/tabbar';
import BookingCard from '../../components/common/bookingCard';

const Appointments = () => {
  const navigation = useNavigation();
  const {token} = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const TabBtns = [
    {name: 'Today', index: 0},
    {name: 'Upcoming', index: 1},
    {name: 'Past', index: 2},
  ];
  const {
    isError,
    isLoading,
    isRefetching,
    data: bookings,
    refetch,
  } = useQuery({
    queryKey: [`Bookings`, token, tab],
    queryFn: getBookings,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation]);

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
        <View>
          <Text style={{color: color1, fontSize: 26, ...fontBold}}>
            Appointments
          </Text>
        </View>

        <View style={{paddingTop: 25}}>
          <Tabbar
            tabBtns={TabBtns}
            selectFunc={e => {
              setTab(e);
            }}
            currIndex={tab}
          />
        </View>
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={dark1} />
            </View>
          </>
        ) : tab === 0 ? (
          <>
            {bookings.today.length ? (
              bookings.today.map(e => {
                return (
                  <BookingCard
                    doctorData={e.doctorData}
                    slotData={e.slotData}
                    chamberData={e.chamberData}
                  />
                );
              })
            ) : (
              <WarningScreen label="No Appoinments Today" />
            )}
          </>
        ) : tab === 1 ? (
          <>
            {bookings.upcoming.length ? (
              bookings.upcoming.map(e => {
                return (
                  <BookingCard
                    doctorData={e.doctorData}
                    slotData={e.slotData}
                    chamberData={e.chamberData}
                  />
                );
              })
            ) : (
              <WarningScreen label="No Upcoming Appoinments" />
            )}
          </>
        ) : (
          <>
            {bookings.past.length ? (
              bookings.past.map(e => {
                return (
                  <BookingCard
                    doctorData={e.doctorData}
                    slotData={e.slotData}
                    chamberData={e.chamberData}
                  />
                );
              })
            ) : (
              <WarningScreen label="No Past Appoinments" />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {
    padding: 20,
  },
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: 'hidden',
  },
});

export default Appointments;
