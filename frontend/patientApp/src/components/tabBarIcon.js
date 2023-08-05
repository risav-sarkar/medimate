import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {
  faCalendar,
  faCalendarDay,
  faHospitalUser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {backgroundColor1, backgroundColor2, shadow} from '../globalStyle';

const TabBarIcon = ({focused, type}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={[
          type === 'Chamber'
            ? {
                backgroundColor: backgroundColor2,
                padding: 13,
                borderRadius: 50,
              }
            : null,
          type === 'Chamber' && focused ? {...shadow} : null,
        ]}>
        <FontAwesomeIcon
          size={20}
          icon={
            type === 'Home'
              ? faHome
              : type === 'Appointments'
              ? faCalendarDay
              : faUser
          }
          color={focused ? '#000000' : '#8F8D8D'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TabBarIcon;
