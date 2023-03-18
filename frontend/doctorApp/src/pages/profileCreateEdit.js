import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import Input from '../components/common/input';
import DropDown from '../components/common/dropDown';
import ActionButton from '../components/common/actionButton';
import {useToast} from 'react-native-toast-notifications';
import {getProfile, patchProfile, postProfile} from '../apiCalls';
import {AuthContext} from '../context/AuthContext';
import {useQuery} from '@tanstack/react-query';
import LoadingScreen from '../components/common/loadingScreen';
import ErrorScreen from '../components/common/errorScreen';
import PrimaryLayout from '../layouts/primaryLayout';

const ProfileCreateEdit = () => {
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const {token, dispatch} = useContext(AuthContext);

  const medicalDepartment = [{name: 'Cardiology'}, {name: 'Pediatrics'}];

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    age: '',
    medicalDepartment: '',
    qualification: '',
    location: '',
  });

  const {isError, isLoading, isRefetching, data, refetch} = useQuery({
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

  if (route.name === 'ProfileEdit' && isLoading) return <LoadingScreen />;
  if (route.name === 'ProfileEdit' && isError)
    return (
      <ErrorScreen refetch={refetch} loading={isLoading || isRefetching} />
    );

  return (
    <PrimaryLayout
      name={route.name === 'ProfileCreate' ? 'Create Profile' : 'Edit Profile'}>
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
    </PrimaryLayout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {paddingHorizontal: 20, marginBottom: 15},
});

export default ProfileCreateEdit;
