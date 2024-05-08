import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {
  backgroundColor1,
  backgroundColor2,
  chamberColor,
  dark1,
  fontBold,
  fontMedium,
  patientColor,
  shadow,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendar,
  faClock,
  faHouseMedical,
  faLocationCrosshairs,
  faLocationDot,
  faTrash,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

const BookingCard = ({isShadow, data, doctorData, slotData, chamberData}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('AppointmentView', {data});
      }}>
      <View
        style={[
          styles.content,
          isShadow ? {...shadow, backgroundColor: backgroundColor1} : null,
        ]}>
        <View style={{}}>
          <Text
            style={{
              ...fontBold,
              fontSize: 18,
              marginBottom: 10,
            }}>{`Dr. ${doctorData?.name}`}</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 3,
            }}>
            <FontAwesomeIcon icon={faLocationDot} color={dark1} size={14} />
            <Text
              style={{
                ...fontMedium,
                fontSize: 14,
                marginLeft: 8,
              }}>
              {chamberData?.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 3,
            }}>
            <FontAwesomeIcon icon={faCalendar} color={dark1} size={14} />
            <Text
              style={{
                ...fontMedium,
                fontSize: 14,
                marginLeft: 8,
              }}>
              {`${format(new Date(slotData?.date), 'do MMM, yyyy')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 3,
            }}>
            <FontAwesomeIcon icon={faClock} color={dark1} size={14} />
            <Text
              style={{
                ...fontMedium,
                fontSize: 14,
                marginLeft: 8,
              }}>
              {`${format(
                new Date(slotData?.time?.start),
                'h:mm aa',
              )} - ${format(new Date(slotData?.time?.end), 'h:mm aa')}`}
            </Text>
          </View>
          <Text
            style={{
              ...fontMedium,
              fontSize: 14,
              marginLeft: 8,
            }}>
            {data.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 5,
  },
  content: {
    ...shadow,
    borderRadius: 15,
    backgroundColor: backgroundColor1,
    flexDirection: 'row',
    padding: 20,
  },
});

export default BookingCard;
