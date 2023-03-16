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
import SlotCard2 from './slotCard2';
import SlotCard3 from './slotCard3';

const ScheduleAll = ({data}) => {
  return (
    <View>
      {data.map(e => {
        return <SlotCard3 data={e} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScheduleAll;
