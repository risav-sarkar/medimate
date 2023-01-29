import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useIsFocused} from '@react-navigation/native';
import {
  backgroundColor1,
  backgroundColor2,
  chamberColor,
  dark1,
  fontBold,
  fontRegular,
  fontSemiBold,
  shadow,
  slotColor,
} from '../globalStyle';
import Header from '../components/common/header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faCheckToSlot,
  faHouseMedical,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ScheduleComponent from '../components/common/scheduleComponent';
import PatientCard from '../components/common/patientCard';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const SlotView = ({navigation}) => {
  const [modal, setModal] = useState(false);

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
        <View style={{paddingHorizontal: 20}}>
          <Header name={'Belle Vue Clinic'} />
        </View>

        <View style={styles.heroBtnContainer}>
          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => {
              navigation.navigate('SlotCreate');
            }}>
            <FontAwesomeIcon icon={faPenToSquare} color={slotColor} />
            <Text style={styles.heroBtnText} numberOfLines={1}>
              Edit Slot
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => {
              setModal(true);
            }}>
            <FontAwesomeIcon icon={faTrash} color={'#ff6a6a'} />
            <Text style={styles.heroBtnText} numberOfLines={1}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text
          style={{
            ...fontBold,
            fontSize: 18,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}>
          Patients
        </Text>
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingTop: 20, paddingBottom: 30},
  heroBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  heroBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: dark1,
    margin: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    ...shadow,
  },
  heroBtnText: {color: '#fff', marginTop: 5, ...fontRegular},
  monthBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: dark1,
    borderRadius: 15,
    marginTop: 20,
    ...shadow,
  },
  monthBtn: {backgroundColor: '#ffffffcc', borderRadius: 50, padding: 10},
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default SlotView;
