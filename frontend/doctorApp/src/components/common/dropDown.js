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
import {Dropdown} from 'react-native-element-dropdown';

const DropDown = ({
  label,
  data,
  value,
  handleChange,
  valueField,
  labelField,
  placeholder,
  ...props
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={{
          fontSize: 14,
          textAlign: 'center',
          color: '#6d6d6d',
        }}
        selectedTextStyle={{
          textAlign: 'center',
        }}
        inputSearchStyle={{
          borderRadius: 20,
        }}
        containerStyle={{
          borderRadius: 20,
          marginTop: 10,
          overflow: 'hidden',
        }}
        data={data}
        // search
        // searchPlaceholder="Search..."
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        value={value}
        onChange={item => {
          handleChange(item.name);
        }}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
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

export default DropDown;
