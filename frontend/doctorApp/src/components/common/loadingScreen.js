import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {backgroundColor1, dark1} from '../../globalStyle';
import FocusAwareStatusBar from '../statusBar';

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor1,
      }}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor1}
      />
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator color={dark1} />
      </View>
    </View>
  );
};

export default LoadingScreen;
