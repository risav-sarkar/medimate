import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  backgroundColor1,
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  shadow,
} from '../globalStyle';
import Header from '../components/common/header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {format, addMonths, subMonths} from 'date-fns';
import {useQuery} from '@tanstack/react-query';
import {AuthContext} from '../context/AuthContext';
import {getSlotsByDoctorAndMonth} from '../apiCalls';
import ScheduleAll from '../components/common/scheduleAll';
import WarningScreen from '../components/common/warningScreen';
import FocusAwareStatusBar from '../components/statusBar';

const Schedule = () => {
  const navigation = useNavigation();
  const [month, setMonth] = useState(new Date());
  const {profile} = useContext(AuthContext);

  const {
    isError: slotsError,
    isLoading: slotsLoading,
    isRefetching: slotsRefetching,
    data: slotsData,
    refetch: slotsRefetch,
  } = useQuery({
    queryKey: [
      `DoctorSlotsDate${format(month, 'YMMdd')}`,
      profile.userId,
      format(month, 'YMMdd'),
    ],
    queryFn: getSlotsByDoctorAndMonth,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      slotsRefetch();
    });
    return unsubscribe;
  }, [navigation]);

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
          <Header name={'Schedule'} />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <View style={styles.monthBar}>
            <TouchableOpacity
              onPress={() => {
                setMonth(subMonths(month, 1));
              }}
              style={styles.monthBtn}>
              <FontAwesomeIcon icon={faAngleLeft} color={dark1} size={18} />
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
              <Text style={{...fontBold, fontSize: 18, color: '#fff'}}>
                {format(month, 'MMMM')}
              </Text>
              <Text
                style={{
                  ...fontRegular,
                  fontSize: 14,
                  color: '#ffffffcc',
                  marginTop: 3,
                }}>
                {format(month, 'yyyy')}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setMonth(addMonths(month, 1));
              }}
              style={styles.monthBtn}>
              <FontAwesomeIcon icon={faAngleRight} color={dark1} size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {slotsLoading ? (
          <ActivityIndicator color={dark1} style={{flex: 1}} />
        ) : !slotsData.length ? (
          <WarningScreen label="No Slots Found" />
        ) : (
          <ScheduleAll data={slotsData} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingTop: 20, paddingBottom: 30},
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
    paddingTop: 5,
    paddingBottom: 20,
    overflow: 'hidden',
  },
});

export default Schedule;
