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

const ScheduleChamber = ({data}) => {
  return (
    <View>
      {data.map(e => {
        return <SlotCard2 data={e} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScheduleChamber;
