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
import {AuthContext} from '../../context/AuthContext';

import {useIsFocused} from '@react-navigation/native';
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
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouseMedical, faPlus} from '@fortawesome/free-solid-svg-icons';
import {SwipeablePanel} from 'rn-swipeable-panel';
import ChamberCard from '../../components/common/chamberCard';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const Chamber = ({navigation}) => {
  const {token, dispatch} = useContext(AuthContext);
  const [chamber, setChamber] = useState({});

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
        <View>
          <Text style={{color: color1, fontSize: 26, ...fontBold}}>
            Chambers
          </Text>

          <View
            style={{
              marginTop: 15,
              backgroundColor: dark1,
              alignSelf: 'flex-start',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              ...shadow,
            }}>
            <Text
              style={{
                ...fontMedium,
                fontSize: 16,
                color: '#fff',
                marginLeft: 10,
              }}>
              10
            </Text>

            <FontAwesomeIcon icon={faHouseMedical} color={chamberColor} />
          </View>
        </View>

        <TouchableOpacity
          style={{padding: 15, borderRadius: 500, backgroundColor: '#fff'}}
          onPress={() => {
            navigation.navigate('ChamberCreate');
          }}>
          <FontAwesomeIcon icon={faPlus} color={dark1} size={25} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={{paddingHorizontal: 5}}>
          <ChamberCard />
          <ChamberCard />
          <ChamberCard />
        </View>
      </View>

      {/* <SwipeablePanel
        isActive={isPanelActive}
        fullWidth={true}
        full
        showCloseButton={true}
        onClose={() => {
          setIsPanelActive(false);
        }}>
        <View style={styles.chamberForm}></View>
      </SwipeablePanel> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {
    padding: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  chamberForm: {},
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

export default Chamber;
