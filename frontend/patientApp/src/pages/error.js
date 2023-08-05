import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {fetchUser, signOutUser} from '../apiCalls';
import ActionButton from '../components/common/actionButton';
import FocusAwareStatusBar from '../components/statusBar';
import {AuthContext} from '../context/AuthContext';
import {backgroundColor1, dark1} from '../globalStyle';

const Error = () => {
  const {dispatch} = useContext(AuthContext);

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

        <View style={{marginBottom: 10}}>
          <ActionButton
            label="Refresh"
            handlePress={() => {
              fetchUser(dispatch);
            }}
          />
        </View>

        <ActionButton
          label="Sign Out"
          handlePress={() => {
            signOutUser(dispatch);
          }}
        />
      </View>
    </View>
  );
};

export default Error;
