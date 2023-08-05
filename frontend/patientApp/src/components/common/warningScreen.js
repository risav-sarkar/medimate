import React from 'react';
import {View, Text} from 'react-native';
import {backgroundColor1, dark1, fontSemiBold} from '../../globalStyle';

const WarningScreen = ({label}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor1,
      }}>
      <View style={{alignItems: 'center', paddingHorizontal: 15}}>
        <Text style={{color: dark1, ...fontSemiBold, fontSize: 16}}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default WarningScreen;
