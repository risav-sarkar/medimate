import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

import {useNavigation} from '@react-navigation/native';
import {
  backgroundColor1,
  color1,
  dark1,
  fontBold,
  fontSemiBold,
  shadow,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faEnvelope,
  faLock,
  faPenToSquare,
  faRightFromBracket,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {signOutUser} from '../../apiCalls';
import FocusAwareStatusBar from '../../components/statusBar';

const Profile = () => {
  const navigation = useNavigation();
  const {dispatch, profile} = useContext(AuthContext);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor1}
      />
      <Text
        style={{
          ...fontSemiBold,
          fontSize: 18,
          textAlign: 'center',
          paddingTop: 30,
          paddingBottom: 20,
        }}>
        Profile
      </Text>
      <View style={{alignItems: 'center', padding: 20}}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderRadius: 500,
              backgroundColor: '#fff',
              padding: 8,
              borderWidth: 2,
              ...shadow,
            }}>
            <FontAwesomeIcon icon={faPenToSquare} color={dark1} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text style={{...fontBold, fontSize: 22, textAlign: 'center'}}>
          {`Dr. ${profile.name}`}
        </Text>

        <Text
          style={{
            ...fontSemiBold,
            fontSize: 14,
            color: '#00000099',
            textAlign: 'center',
          }}>
          {`${profile.qualification} | ${profile.medicalDepartment}`}
        </Text>
      </View>

      <View style={{paddingTop: 40}}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}>
            <View style={styles.btnContent}>
              <View style={styles.btnIconContainer}>
                <FontAwesomeIcon icon={faUser} color={dark1} size={20} />
              </View>
              <Text style={styles.btnText}>Edit Profile</Text>
            </View>

            <FontAwesomeIcon icon={faAngleRight} color={dark1} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('ForgetPassword');
            }}>
            <View style={styles.btnContent}>
              <View style={styles.btnIconContainer}>
                <FontAwesomeIcon icon={faLock} color={dark1} size={20} />
              </View>
              <Text style={styles.btnText}>Reset Password</Text>
            </View>

            <FontAwesomeIcon icon={faAngleRight} color={dark1} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('ResetEmail');
            }}>
            <View style={styles.btnContent}>
              <View style={styles.btnIconContainer}>
                <FontAwesomeIcon icon={faEnvelope} color={dark1} size={20} />
              </View>
              <Text style={styles.btnText}>Reset Email</Text>
            </View>

            <FontAwesomeIcon icon={faAngleRight} color={dark1} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => {}}>
            <View style={styles.btnContent}>
              <View
                style={[
                  styles.btnIconContainer,
                  {backgroundColor: '#ff00006b'},
                ]}>
                <FontAwesomeIcon icon={faTrash} color={dark1} size={20} />
              </View>
              <Text style={styles.btnText}>Delete Account</Text>
            </View>

            <FontAwesomeIcon icon={faAngleRight} color={dark1} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              signOutUser(dispatch);
            }}>
            <View style={styles.btnContent}>
              <View
                style={[
                  styles.btnIconContainer,
                  {backgroundColor: '#ff00006b'},
                ]}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  color={dark1}
                  size={20}
                />
              </View>
              <Text style={styles.btnText}>Logout</Text>
            </View>

            <FontAwesomeIcon icon={faAngleRight} color={dark1} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor1},
  imageContainer: {
    height: 140,
    width: 140,
    backgroundColor: dark1,
    borderRadius: 500,
    shadowColor: color1,
    elevation: 50,
    borderWidth: 5,
    borderColor: color1,
  },
  btnContainer: {paddingHorizontal: 20, paddingTop: 2, paddingBottom: 12},
  btn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    paddingRight: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...shadow,
  },
  btnContent: {flexDirection: 'row', alignItems: 'center'},
  btnIconContainer: {
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: color1,
  },
  btnText: {...fontSemiBold, fontSize: 16},
});

export default Profile;
