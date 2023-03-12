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

import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
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
import Input from '../components/common/input';
import DropDown from '../components/common/dropDown';
import ActionButton from '../components/common/actionButton';
import {useToast} from 'react-native-toast-notifications';
import {getProfile, patchProfile, postProfile} from '../apiCalls';
import {AuthContext} from '../context/AuthContext';
import {useQuery} from '@tanstack/react-query';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const ProfileCreateEdit = () => {
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const {token, dispatch} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    age: '',
    medicalDepartment: '',
    qualification: '',
    location: '',
  });

  const {isError, isLoading, data} = useQuery({
    queryKey: [`Profile`, token],
    queryFn: getProfile,
    enabled: route.name === 'ProfileEdit',
  });

  useEffect(() => {
    if (route.name === 'ProfileEdit' && data) {
      setForm({
        ...form,
        name: data.name,
        phoneNumber: data.phoneNumber,
        age: data.age,
        medicalDepartment: data.medicalDepartment,
        qualification: data.qualification,
        location: data.location,
      });
    }
  }, [data]);

  const HandleSubmit = async () => {
    setLoading(true);
    if (route.name === 'ProfileCreate') {
      await postProfile(form, setLoading, token, navigation, toast, dispatch);
    } else {
      await patchProfile(form, setLoading, token, navigation, toast, dispatch);
    }
  };

  const medicalDepartment = [{name: 'Cardiology'}, {name: 'Pediatrics'}];

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
            route.name === 'ProfileCreate' ? 'Create Profile' : 'Edit Profile'
          }
        />
      </View>

      <View style={styles.content}>
        <View>
          <View style={styles.inputContainer}>
            <Input
              label={'Name'}
              value={form.name}
              placeholder={'A Roy'}
              handleOnChange={e => {
                setForm({...form, name: e});
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              label={'Age'}
              value={form.age}
              placeholder={'50'}
              handleOnChange={e => {
                setForm({...form, age: e});
              }}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              label={'Qualification'}
              value={form.qualification}
              placeholder={'MBBS, MD'}
              handleOnChange={e => {
                setForm({...form, qualification: e});
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <DropDown
              label="Department"
              data={medicalDepartment}
              value={form.medicalDepartment}
              handleChange={e => {
                setForm({...form, medicalDepartment: e});
              }}
              valueField={'name'}
              labelField={'name'}
              placeholder={'Choose Department'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              label={'Phone Number'}
              value={form.phoneNumber}
              placeholder={'7444444444'}
              handleOnChange={e => {
                setForm({...form, phoneNumber: e});
              }}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              label={'Location'}
              value={form.location}
              placeholder={'Kolkata, West Bengal'}
              handleOnChange={e => {
                setForm({...form, location: e});
              }}
            />
          </View>

          <View style={{paddingHorizontal: 20}}>
            <ActionButton
              loading={loading}
              label="Submit"
              handlePress={HandleSubmit}
            />
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
  submitBtn: {
    backgroundColor: dark1,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
});

export default ProfileCreateEdit;
