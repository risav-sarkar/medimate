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
  patientColor,
  shadow,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock, faUserGroup} from '@fortawesome/free-solid-svg-icons';

const SlotCard = ({isShadow}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
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
            <Text style={{...fontBold, fontSize: 20, marginBottom: 2}}>
              Belle Vue Clinic
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <FontAwesomeIcon icon={faClock} color={dark1} size={14} />
              <Text
                style={{...fontMedium, fontSize: 14, marginLeft: 8}}
                numberOfLines={1}>
                9:30AM - 10:30AM
              </Text>
            </View>

            <View
              style={{
                backgroundColor: dark1,
                alignSelf: 'flex-start',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                flexDirection: 'row-reverse',
                alignItems: 'center',
                ...shadow,
              }}>
              <Text
                style={{
                  ...fontMedium,
                  fontSize: 16,
                  color: '#fff',
                  marginLeft: 10,
                }}>
                10
              </Text>

              <FontAwesomeIcon icon={faUserGroup} color={patientColor} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
  imageContainer: {height: 120, borderRadius: 15, overflow: 'hidden'},
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
  },
});

export default SlotCard;
