import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';

import {useIsFocused} from '@react-navigation/native';
import {
  backgroundColor1,
  backgroundColor2,
  chamberColor,
  color1,
  dark1,
  fontBold,
  fontRegular,
  fontSemiBold,
  patientColor,
  shadow,
  slotColor,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheckToSlot,
  faCircleUser,
  faHourglass,
  faHouseMedical,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

import SlotCard from '../../components/common/slotCard';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const Home = ({navigation}) => {
  const {token, dispatch} = useContext(AuthContext);

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 20,
          }}>
          <View>
            <Text style={styles.headerText1}>Hello, Snowman</Text>
            <Text style={styles.headerText2}>Good Morning</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <FontAwesomeIcon icon={faCircleUser} color={'#fff'} size={40} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: dark1,
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            ...shadow,
          }}>
          <View style={styles.boxContainer}>
            <View style={styles.boxheaderContainer}>
              <FontAwesomeIcon icon={faHouseMedical} color={chamberColor} />
              <Text style={styles.boxheaderText} numberOfLines={1}>
                Chambers
              </Text>
            </View>

            <Text style={styles.boxheaderMainText} numberOfLines={1}>
              5
            </Text>
          </View>

          <View style={styles.boxBar} />

          <View style={styles.boxContainer}>
            <View style={styles.boxheaderContainer}>
              <FontAwesomeIcon icon={faCheckToSlot} color={slotColor} />
              <Text style={styles.boxheaderText} numberOfLines={1}>
                Slots
              </Text>
            </View>

            <Text style={styles.boxheaderMainText} numberOfLines={1}>
              5
            </Text>
          </View>

          <View style={styles.boxBar} />

          <View style={styles.boxContainer}>
            <View style={styles.boxheaderContainer}>
              <FontAwesomeIcon icon={faUserGroup} color={patientColor} />
              <Text style={styles.boxheaderText} numberOfLines={1}>
                Patients
              </Text>
            </View>

            <Text style={styles.boxheaderMainText} numberOfLines={1}>
              5
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{...fontBold, fontSize: 18}}>Today</Text>

          <TouchableOpacity
            style={{
              borderWidth: 1.5,
              borderColor: backgroundColor2,
              backgroundColor: '#fff',
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 8,
              alignItems: 'center',
              ...shadow,
            }}
            onPress={() => {
              navigation.navigate('Schedule');
            }}>
            <Text style={{...fontRegular, fontSize: 14}}>View Schedule</Text>
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 5}}>
          <SlotCard />
          <SlotCard />
          <SlotCard />
          <SlotCard />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {padding: 20, paddingBottom: 30},
  boxContainer: {flex: 1, paddingHorizontal: 20, paddingVertical: 15},
  boxheaderContainer: {flexDirection: 'row'},
  boxheaderText: {color: '#fff', marginLeft: 5, fontSize: 14, ...fontRegular},
  boxheaderMainText: {...fontBold, color: '#fff', fontSize: 24},
  boxBar: {
    width: 1,
    height: 40,
    backgroundColor: '#ffffff33',
    alignSelf: 'center',
  },
  headerText1: {color: color1, fontSize: 26, ...fontBold},
  headerText2: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 5,
    ...fontRegular,
  },
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
  },
});

export default Home;
