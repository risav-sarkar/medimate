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
  faUserGroup,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const PatientCard = ({isShadow}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.content, shadow]} onPress={() => {}}>
          <View style={styles.indexContainer}>
            <Text style={{...fontBold, fontSize: 20}}>1</Text>
          </View>

          <View style={{paddingVertical: 5}}>
            <Text
              numberOfLines={1}
              style={{...fontSemiBold, fontSize: 18, marginBottom: 5}}>
              Risav Sarkar
            </Text>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.box}>
                <FontAwesomeIcon
                  icon={faVenusMars}
                  color={patientColor}
                  size={14}
                />
                <Text style={styles.boxText}>Male</Text>
              </View>

              <View style={[styles.box, {marginLeft: 5}]}>
                <FontAwesomeIcon
                  icon={faCakeCandles}
                  color={patientColor}
                  size={12}
                />
                <Text style={styles.boxText}>29</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
  boxText: {...fontMedium, fontSize: 14, color: '#fff', marginLeft: 10},
});

export default PatientCard;
