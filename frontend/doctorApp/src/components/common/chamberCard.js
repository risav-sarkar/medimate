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

const ChamberCard = ({isShadow, data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          isShadow ? {...shadow, backgroundColor: backgroundColor1} : null,
        ]}>
        <View style={styles.imageContainer}>
          <View
            style={{
              width: 90,
              flex: 1,
              backgroundColor: backgroundColor2,
            }}></View>
        </View>

        <View style={styles.textContainer}>
          <View>
            <Text style={{...fontBold, fontSize: 20, marginBottom: 5}}>
              {data.name}
            </Text>

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
                {data.address}
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
                {data.pincode}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TouchableOpacity
                style={[styles.btns, {marginLeft: 10, paddingHorizontal: 20}]}
                onPress={() => {
                  navigation.navigate('ChamberView', {data});
                }}>
                <Text
                  style={{
                    ...fontMedium,
                    fontSize: 16,
                    color: '#fff',
                    marginLeft: 10,
                  }}>
                  View
                </Text>

                <FontAwesomeIcon icon={faHouseMedical} color={chamberColor} />
              </TouchableOpacity>
            </View>
          </View>
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
  imageContainer: {height: 130, borderRadius: 15, overflow: 'hidden'},
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

export default ChamberCard;
