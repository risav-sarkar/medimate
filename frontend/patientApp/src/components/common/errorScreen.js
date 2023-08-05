import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text} from 'react-native';
import FocusAwareStatusBar from '../statusBar';
import {backgroundColor1, dark1} from '../../globalStyle';
import ActionButton from './actionButton';

const ErrorScreen = ({refetch, loading}) => {
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
        <FontAwesomeIcon icon={faTriangleExclamation} size={60} color={dark1} />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 5,
            marginBottom: 30,
          }}>
          Something Went Wrong
        </Text>

        <ActionButton
          label="Refresh"
          loading={loading}
          handlePress={() => {
            refetch();
          }}
        />
      </View>
    </View>
  );
};

export default ErrorScreen;
