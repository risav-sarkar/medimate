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
  fontRegular,
  patientColor,
  shadow,
} from '../../globalStyle';
import {useNavigation} from '@react-navigation/native';
import SlotCard from './slotCard';
import {format} from 'date-fns';

const SlotCard3 = ({data}) => {
  const navigation = useNavigation();
  const date = new Date(data.date.jsDate);

  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateContent}>
        <Text style={{...fontRegular, fontSize: 14, color: '#00000099'}}>
          {format(date, 'EEE')}
        </Text>
        <Text style={{...fontBold, fontSize: 16}}>{format(date, 'd')}</Text>
      </View>

      <View style={{flex: 1, paddingRight: 10}}>
        {data.slots.map(e => {
          return (
            <SlotCard
              slotData={e.slotData}
              chamberData={e.chamberData}
              isShadow={true}
            />
          );
        })}
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

export default SlotCard3;
