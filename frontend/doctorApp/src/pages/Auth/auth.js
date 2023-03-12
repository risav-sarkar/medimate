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

import {useIsFocused} from '@react-navigation/native';
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
import {userLogin, userRegister} from '../../apiCalls';
import ActionButton from '../../components/common/actionButton';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const Auth = ({navigation, route}) => {
  const toast = useToast();
  const {isLoading, dispatch} = useContext(AuthContext);
  const [form, setForm] = useState({email: '', password: ''});

  const HandleSubmit = () => {
    if (!form.email) {
      ToastError(toast, 'Enter Email');
      return;
    }
    if (!form.password) {
      ToastError(toast, 'Enter Password');
      return;
    }
    if (route.name === 'Login') {
      userLogin(form, toast, dispatch);
    } else userRegister(form, toast, dispatch);
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor2}
      />

      <View style={styles.content}>
        <View style={{marginBottom: 40}}>
          <Text
            style={{
              ...fontBold,
              fontSize: 26,
              paddingTop: 20,
              color: '#fff',
            }}>
            Hello!
          </Text>

          <Text
            style={{
              ...fontRegular,
              fontSize: 18,
              color: '#e5e5e5',
              marginTop: 10,
            }}>
            {route.name === 'Login'
              ? 'Login in to your account'
              : 'Create a new account'}
          </Text>
        </View>

        <ScrollView style={styles.auth} contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.inputContainer}>
            <Input
              label={'Email'}
              value={form.email}
              placeholder={'abc@gmail.com'}
              handleOnChange={e => {
                setForm({...form, email: e});
              }}
              autoCapitalize="none"
            />

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
          </View>

          {route.name === 'Login' ? (
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                alignItems: 'flex-end',
              }}>
              <Text style={{...fontSemiBold}}>Forget Password?</Text>
            </TouchableOpacity>
          ) : null}

          <View style={{padding: 15}}>
            <ActionButton
              loading={isLoading}
              label={route.name === 'Login' ? 'Login' : 'Signup'}
              handlePress={HandleSubmit}
            />
          </View>

          <View style={{flex: 1, paddingBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View style={styles.bar} />
              <Text
                style={{marginHorizontal: 5, ...fontRegular, color: '#adadad'}}>
                or
              </Text>
              <View style={styles.bar} />
            </View>

            <View style={{padding: 15}}>
              <TouchableOpacity
                style={[
                  {
                    borderWidth: 1.5,
                    borderColor: dark1,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 15,
                    paddingLeft: 20,
                    alignItems: 'center',
                    marginTop: 15,
                    flexDirection: 'row',
                  },
                  shadow,
                ]}>
                <FontAwesomeIcon icon={faGoogle} />
                <Text
                  style={{
                    color: dark1,
                    textAlign: 'center',
                    ...fontSemiBold,
                    fontSize: 16,
                    flex: 1,
                  }}>
                  Log in with Google
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                marginHorizontal: 20,
                alignItems: 'center',
                padding: 10,
                marginTop: 'auto',
              }}
              onPress={() => {
                navigation.navigate(
                  route.name === 'Login' ? 'Signup' : 'Login',
                );
              }}>
              <Text style={{...fontRegular, color: '#6d6d6d'}}>
                {route.name === 'Login'
                  ? "Don't have an account?"
                  : 'Already have an account?'}
              </Text>

              <Text style={{...fontBold, color: '#000000'}}>
                {route.name === 'Login' ? 'SignUp' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor2,
    padding: 20,
  },
  content: {flex: 1},
  auth: {
    borderRadius: 15,
    backgroundColor: '#fff',
    ...shadow,
    marginTop: 'auto',
  },
  inputContainer: {paddingHorizontal: 20, paddingTop: 20},
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
  bar: {backgroundColor: '#adadad', height: 1, flex: 1},
});

export default Auth;
