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
  faClock,
  faHouseMedical,
  faLocationCrosshairs,
  faLocationDot,
  faTrash,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

const BookingCard = ({isShadow, doctorData, slotData, chamberData}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          isShadow ? {...shadow, backgroundColor: backgroundColor1} : null,
        ]}>
        <View style={{}}>
          <Text>{`Dr. ${doctorData.name}`}</Text>
          <Text>{chamberData.name}</Text>
          <Text>{`${format(
            new Date(slotData.time.start),
            'h:mm aa',
          )} - ${format(new Date(slotData.time.end), 'h:mm aa')}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 5, paddingVertical: 10},
  content: {
    borderRadius: 15,
    backgroundColor: backgroundColor1,
    flexDirection: 'row',
    padding: 5,
  },
});

export default BookingCard;
