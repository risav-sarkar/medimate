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
  fontRegular,
  patientColor,
  shadow,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faHouseMedical,
  faLocationCrosshairs,
  faLocationDot,
  faStarOfLife,
  faTrash,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const DoctorCard = ({isShadow, data}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.content,
          isShadow ? {...shadow, backgroundColor: backgroundColor1} : null,
        ]}
        onPress={() => {
          navigation.navigate('DoctorProfileView', {data});
        }}>
        <View style={styles.imageContainer}>
          <View
            style={{
              width: 90,
              flex: 1,
              backgroundColor: backgroundColor2,
            }}></View>
        </View>

        <View style={styles.textContainer}>
          <View style={{flex: 1}}>
            <Text style={{...fontBold, fontSize: 22, marginBottom: 5, flex: 1}}>
              {`Dr. ${data.name}`}
            </Text>

            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <FontAwesomeIcon icon={faStarOfLife} color={dark1} size={14} />
                <Text
                  style={{
                    ...fontMedium,
                    fontSize: 14,
                    marginLeft: 8,
                  }}>
                  {data.qualification || 'Not Avalilable'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon={faLocationCrosshairs}
                  color={dark1}
                  size={14}
                />
                <Text style={{...fontMedium, fontSize: 14, marginLeft: 8}}>
                  {data.location || 'Not Avalilable'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  content: {
    borderRadius: 15,
    backgroundColor: backgroundColor1,
    flexDirection: 'row',
    padding: 5,
  },
  imageContainer: {
    minHeight: 120,
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flex: 1,
  },
  btns: {
    backgroundColor: dark1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    ...shadow,
  },
});

export default DoctorCard;
