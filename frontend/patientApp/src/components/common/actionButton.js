import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  fontSemiBold,
  shadow,
} from '../../globalStyle';

const ActionButton = ({label, loading, handlePress, ...props}) => {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={() => handlePress()}
      {...props}>
      {loading ? (
        <ActivityIndicator color={'#fff'} />
      ) : (
        <Text style={{color: '#fff', ...fontSemiBold, fontSize: 16}}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: dark1,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
});

export default ActionButton;
