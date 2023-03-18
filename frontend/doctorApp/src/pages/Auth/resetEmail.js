import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {fontBold, fontRegular, fontSemiBold} from '../../globalStyle';
import Input from '../../components/common/input';
import {AuthContext} from '../../context/AuthContext';
import {ToastError} from '../../components/toastFunction';
import {useToast} from 'react-native-toast-notifications';
import {generateOTP, resetEmail} from '../../apiCalls';
import ActionButton from '../../components/common/actionButton';
import PrimaryLayout from '../../layouts/primaryLayout';
import {useNavigation, useRoute} from '@react-navigation/native';

const ResetEmail = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const route = useRoute();
  const {profile} = useContext(AuthContext);
  const [form, setForm] = useState({
    email1: profile.email,
    email2: '',
    otp1: '',
    otp2: '',
  });
  const [loading, setLoading] = useState(false);
  const [isEmailEntered, setIsEmailEntered] = useState(false);

  const GenerateOTP = async email => {
    setLoading(true);
    const res = await generateOTP(email, 'emailreset', setLoading, toast);
  };

  const HandleSubmit = () => {
    if (!form.otp1) {
      ToastError(toast, 'Enter OTP');
      return;
    }
    if (!form.otp2) {
      ToastError(toast, 'Enter OTP');
      return;
    }

    setLoading(true);
    resetEmail(form, setLoading, navigation, toast);
  };

  return (
    <PrimaryLayout name="Reset Email">
      <View style={styles.inputContainer}>
        {!isEmailEntered && (
          <Input
            label={'Enter Your New Email'}
            value={form.email}
            placeholder={'abc@gmail.com'}
            handleOnChange={e => {
              setForm({...form, email2: e});
            }}
            autoCapitalize="none"
          />
        )}

        {isEmailEntered && (
          <>
            <Input
              label={'OTP from current email'}
              value={form.otp1}
              placeholder={'******'}
              handleOnChange={e => {
                setForm({...form, otp1: e});
              }}
              secureTextEntry={true}
              keyboardType="numeric"
            />

            <Input
              label={'OTP from new email'}
              value={form.otp2}
              placeholder={'******'}
              handleOnChange={e => {
                setForm({...form, otp2: e});
              }}
              secureTextEntry={true}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={{
                paddingVertical: 5,
                alignItems: 'flex-end',
              }}
              onPress={() => {
                GenerateOTP();
              }}>
              <Text style={{...fontSemiBold}}>Resend OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={{paddingHorizontal: 15}}>
        <ActionButton
          loading={loading}
          label={!isEmailEntered ? 'Send OTP' : 'Submit'}
          handlePress={() => {
            if (!isEmailEntered) {
              if (!form.email2) ToastError(toast, 'Enter your email');
              else if (form.email2 === form.email1)
                ToastError(toast, 'Current and new emails same');
              else {
                setIsEmailEntered(true);
                GenerateOTP(form.email1);
                GenerateOTP(form.email2);
              }
            } else HandleSubmit();
          }}
        />
      </View>

      {route.name === 'ForgetPasswordNoUser' && (
        <View style={{flex: 1, paddingBottom: 20}}>
          <TouchableOpacity
            style={{
              marginHorizontal: 20,
              alignItems: 'center',
              padding: 10,
              marginTop: 'auto',
            }}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{...fontRegular, color: '#6d6d6d'}}>
              Already have an account?
            </Text>

            <Text style={{...fontBold, color: '#000000'}}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </PrimaryLayout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {paddingHorizontal: 20, marginBottom: 15},
});

export default ResetEmail;
