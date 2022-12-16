import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';

const TabBarIcon = ({focused, type}) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <FontAwesomeIcon
        size={18}
        icon={
          type === 'Home'
            ? faHome
            : type === 'Schedule'
            ? faList
            : type === 'Analytics'
            ? faChartLine
            : type === 'Profile'
            ? faUser
            : null
        }
        color={focused ? '#000000' : '#8F8D8D'}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TabBarIcon;
