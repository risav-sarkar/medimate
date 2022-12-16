import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Error = () => {
  const {dispatch} = useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size={70}
          color={'blue'}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 5,
            marginBottom: 30,
          }}>
          Something Went Wrong
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
          onPress={() => {}}>
          <Text style={{color: '#fff'}}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Error;
