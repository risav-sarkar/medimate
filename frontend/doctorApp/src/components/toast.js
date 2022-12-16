import {useContext, useEffect, useState} from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';

const Toast = ({message, type}) => {
  const styles = StyleSheet.create({
    container: {
      padding: 6,
      paddingRight: 15,
      backgroundColor: type === 'SUCCESS' ? '#eaf7ee' : '#fcede9',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: type === 'SUCCESS' ? '#c2e6cb' : '#f7d6cd',
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      borderRadius: 15,
      padding: 10,
      backgroundColor: type === 'SUCCESS' ? '#3eb85e' : '#ea4e2c',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon
          size={24}
          icon={type === 'SUCCESS' ? faCheck : faTriangleExclamation}
          color={'#fff'}
        />
      </View>

      <Text
        style={{
          marginLeft: 10,
          fontSize: 16,
          fontWeight: 'bold',
          maxWidth: 200,
        }}>
        {message}
      </Text>
    </View>
  );
};

export default Toast;
