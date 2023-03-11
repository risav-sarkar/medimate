import {Text, StyleSheet, View, TextInput} from 'react-native';
import React from 'react';

import {
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  fontSemiBold,
  shadow,
} from '../../globalStyle';
const Input = ({label, value, placeholder, handleOnChange, ...props}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCorrect={false}
        style={[styles.inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={e => {
          handleOnChange(e);
        }}
        placeholderTextColor={'#adadad'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {paddingHorizontal: 20, paddingTop: 20},
  inputStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#4a4a4a',
    borderRadius: 3,
    paddingVertical: 5,
    marginBottom: 15,
    fontSize: 16,
    ...fontSemiBold,
    color: '#000000',
  },
  label: {...fontBold, fontSize: 16, color: '#6d6d6d'},
});

export default Input;
