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
  fontSemiBold,
  patientColor,
  shadow,
  slotColor,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleLeft,
  faClock,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const Header = ({name}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            padding: 5,
          }}>
          <FontAwesomeIcon icon={faAngleLeft} color={'#fff'} size={20} />
        </TouchableOpacity>
      </View>

      <Text style={{...fontSemiBold, fontSize: 18, color: '#fff'}}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default Header;
