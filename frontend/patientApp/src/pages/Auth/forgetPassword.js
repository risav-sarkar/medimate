import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  fontSemiBold,
  shadow,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import Input from '../../components/common/input';
import {AuthContext} from '../../context/AuthContext';
import {ToastError, ToastSuccess} from '../../components/toastFunction';
import {useToast} from 'react-native-toast-notifications';
import {
  generateOTP,
  googleLogin,
  resetPassword,
  userLogin,
  userRegister,
  verifyEmail,
} from '../../apiCalls';
import ActionButton from '../../components/common/actionButton';
import PrimaryLayout from '../../layouts/primaryLayout';
import {useNavigation, useRoute} from '@react-navigation/native';

const ForgetPassword = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const route = useRoute();
  const [form, setForm] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);

  const GenerateOTP = async () => {
    setLoading(true);
    const res = await generateOTP(form.email, 'password', setLoading, toast);
    if (res === 'SUCCESS') setIsOtpSend(true);
  };

  const VerifyEmail = async () => {
    if (!form.email) {
      ToastError(toast, 'Enter Email');
      return;
    }

    setLoading(true);
    const res = await verifyEmail(form.email, setLoading, toast);
    if (res === 'SUCCESS') {
      setIsEmailVerified(true);
      GenerateOTP();
    }
  };

  const HandleSubmit = () => {
    if (!form.email) {
      ToastError(toast, 'Enter Email');
      return;
    }
    if (!form.password) {
      ToastError(toast, 'Enter Password');
      return;
    }

    setLoading(true);
    resetPassword(form, setLoading, navigation, toast);
  };

  return (
    <PrimaryLayout name="Reset Password">
      <View style={styles.inputContainer}>
        {!isEmailVerified && (
          <Input
            label={'Email'}
            value={form.email}
            placeholder={'abc@gmail.com'}
            handleOnChange={e => {
              setForm({...form, email: e});
            }}
            autoCapitalize="none"
          />
        )}

        {isOtpSend && (
          <>
            <Input
              label={'Password'}
              value={form.password}
              placeholder={'ah#%53'}
              handleOnChange={e => {
                setForm({...form, password: e});
              }}
              secureTextEntry={true}
              autoCapitalize="none"
            />

            <Input
              label={'OTP'}
              value={form.otp}
              placeholder={'******'}
              handleOnChange={e => {
                setForm({...form, otp: e});
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
          label={!isEmailVerified ? 'Continue' : 'Submit'}
          handlePress={() => {
            if (!isEmailVerified) VerifyEmail();
            else HandleSubmit();
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

export default ForgetPassword;
