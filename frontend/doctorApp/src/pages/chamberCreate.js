import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useIsFocused, useRoute} from '@react-navigation/native';
import {
  backgroundColor1,
  backgroundColor2,
  chamberColor,
  color1,
  dark1,
  fontBold,
  fontMedium,
  fontSemiBold,
  shadow,
} from '../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseMedical, faPlus} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/header';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const ChamberCreate = ({navigation}) => {
  const route = useRoute();
  const [chamber, setChamber] = useState({});

  const HandleSubmit = () => {};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor2}
      />

      <View style={styles.header}>
        <Header
          name={
            route.name === 'ChamberCreate' ? 'Create Chamber' : 'Edit Chamber'
          }
        />
      </View>

      <View style={styles.content}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={'Hope Clinic'}
              value={chamber.name}
              onChangeText={e => {
                setChamber({...chamber, name: e});
              }}
              placeholderTextColor={'#adadad'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={'32/A, Sector 1'}
              value={chamber.address}
              onChangeText={e => {
                setChamber({...chamber, address: e});
              }}
              placeholderTextColor={'#adadad'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={'110001'}
              value={chamber.pincode}
              onChangeText={e => {
                setChamber({...chamber, pincode: e});
              }}
              placeholderTextColor={'#adadad'}
              keyboardType="numeric"
            />
          </View>

          <View style={{paddingHorizontal: 20}}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => HandleSubmit()}>
              <Text style={{color: '#fff', ...fontBold, fontSize: 16}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
  },
  inputContainer: {paddingHorizontal: 20, marginBottom: 15},
  label: {...fontSemiBold, fontSize: 16, marginBottom: 8},
  inputStyle: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: dark1,
    paddingHorizontal: 15,
    color: '#000000',
  },
  submitBtn: {
    backgroundColor: dark1,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
});

export default ChamberCreate;
