import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {
  backgroundColor1,
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  shadow,
} from '../../globalStyle';
import SlotCard from './slotCard';
import SlotCard2 from './slotCard2';

const ScheduleChamber = ({data}) => {
  return (
    <View>
      <SlotCard2 />
      {/* <SlotCard2 /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScheduleChamber;
