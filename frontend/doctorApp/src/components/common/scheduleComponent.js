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

const ScheduleComponent = ({data}) => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <View style={styles.dateContent}>
          <Text style={{...fontRegular, fontSize: 14, color: '#00000099'}}>
            Thu
          </Text>
          <Text style={{...fontBold, fontSize: 16}}>29</Text>
        </View>

        <View style={{flex: 1, paddingRight: 10}}>
          <SlotCard isShadow={true} />
          <SlotCard isShadow={true} />
        </View>
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateContent}>
          <Text style={{...fontRegular, fontSize: 14, color: '#00000099'}}>
            Thu
          </Text>
          <Text style={{...fontBold, fontSize: 16}}>29</Text>
        </View>

        <View style={{flex: 1, paddingRight: 10}}>
          <SlotCard isShadow={true} />
          <SlotCard isShadow={true} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
  },
  dateContent: {
    width: 70,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default ScheduleComponent;
