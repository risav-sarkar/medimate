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
  dark1,
  fontBold,
  fontMedium,
  fontSemiBold,
  patientColor,
  shadow,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCakeCandles,
  faClock,
  faEllipsisV,
  faMars,
  faUserGroup,
  faVenus,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import DeletePanel from './deletePanel';
import OptionsPanel from './optionsPanel';
import {patchBookingStatus} from '../../apiCalls';
import {useToast} from 'react-native-toast-notifications';
import {AuthContext} from '../../context/AuthContext';

const PatientCard = ({isShadow, patientData, bookingData, bookingRefetch}) => {
  console.log(bookingData);
  const {token} = useContext(AuthContext);
  const toast = useToast();
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const UpdateStatus = async e => {
    setLoading(true);
    await patchBookingStatus(bookingData._id, e, setLoading, token, toast);
    setIsPanelActive(false);
    bookingRefetch();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.content, shadow]} onPress={() => {}}>
          <View style={styles.indexContainer}>
            <Text style={{...fontBold, fontSize: 20}}>1</Text>
          </View>

          <View style={{paddingVertical: 5, flex: 1}}>
            <Text
              numberOfLines={1}
              style={{...fontSemiBold, fontSize: 18, marginBottom: 5}}>
              {patientData.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor:
                  bookingData.status === 'Pending'
                    ? '#FEC05599'
                    : bookingData.status === 'Confirmed'
                    ? '#2497FF99'
                    : bookingData.status === 'Completed'
                    ? '#01EF0099'
                    : '#FF666699',
                padding: 5,
                paddingHorizontal: 10,
                width: 100,
                marginBottom: 10,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  ...fontMedium,
                  fontSize: 16,
                  textAlign: 'center',
                  flex: 1,
                  color:
                    bookingData.status === 'Pending'
                      ? '#FFA100'
                      : bookingData.status === 'Confirmed'
                      ? '#0072DB'
                      : bookingData.status === 'Completed'
                      ? '#01A600'
                      : '#D63232',
                }}>
                {bookingData.status}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.box}>
                <FontAwesomeIcon
                  icon={patientData.gender === 'Male' ? faMars : faVenus}
                  color={patientColor}
                  size={14}
                />
                <Text style={styles.boxText}>{patientData.gender}</Text>
              </View>

              <View style={[styles.box, {marginLeft: 5}]}>
                <Text style={{color: patientColor, fontSize: 14}}>Age</Text>
                <Text style={styles.boxText}>{`${patientData.age} years`}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => {
              setIsPanelActive(true);
            }}>
            <FontAwesomeIcon icon={faEllipsisV} color={dark1} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <OptionsPanel
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        options={['Pending', 'Confirmed', 'Completed', 'Cancelled']}
        selectedItem={bookingData.status}
        handlePress={e => {
          UpdateStatus(e);
        }}
        loading={loading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {paddingVertical: 5, paddingHorizontal: 15},
  content: {
    borderRadius: 15,
    backgroundColor: backgroundColor1,
    flexDirection: 'row',
    padding: 5,
  },
  indexContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    borderRadius: 10,
    marginRight: 15,
    ...shadow,
  },
  box: {
    backgroundColor: dark1,
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow,
  },
  boxText: {...fontMedium, fontSize: 13, color: '#fff', marginLeft: 5},
  menuBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    borderRadius: 10,
    justifySelf: 'flex-end',
  },
});

export default PatientCard;
