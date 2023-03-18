import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import Input from '../components/common/input';
import ActionButton from '../components/common/actionButton';
import {patchChamber, postChamber} from '../apiCalls';
import {AuthContext} from '../context/AuthContext';
import {useToast} from 'react-native-toast-notifications';
import PrimaryLayout from '../layouts/primaryLayout';

const ChamberCreateEdit = () => {
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const {token} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    pincode: '',
  });

  useEffect(() => {
    if (route.name === 'ChamberEdit') {
      const data = route.params.data;
      setForm({
        ...form,
        name: data.name,
        address: data.address,
        pincode: data.pincode,
        _id: data._id,
      });
    }
  }, [route.params]);

  const HandleSubmit = async () => {
    setLoading(true);
    if (route.name === 'ChamberCreate') {
      await postChamber(form, setLoading, token, navigation, toast);
    } else {
      await patchChamber(form, setLoading, token, navigation, toast);
    }
  };

  return (
    <PrimaryLayout
      name={route.name === 'ChamberCreate' ? 'Create Chamber' : 'Edit Chamber'}>
      <View>
        <View style={styles.inputContainer}>
          <Input
            label={'Name'}
            value={form.name}
            placeholder={'Hope Clinic'}
            handleOnChange={e => {
              setForm({...form, name: e});
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label={'Address'}
            value={form.address}
            placeholder={'32/A, Sector 1'}
            handleOnChange={e => {
              setForm({...form, address: e});
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label={'Pincode'}
            value={form.pincode}
            placeholder={'110001'}
            handleOnChange={e => {
              setForm({...form, pincode: e});
            }}
            keyboardType="numeric"
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <ActionButton
            label="Submit"
            loading={loading}
            handlePress={() => HandleSubmit()}
          />
        </View>
      </View>
    </PrimaryLayout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {paddingHorizontal: 20, marginBottom: 15},
});

export default ChamberCreateEdit;
