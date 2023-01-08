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
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {endOfMonth, format, startOfMonth, addMonths, subMonths} from 'date-fns';
import ScheduleComponent from '../components/common/scheduleComponent';
import {SwipeablePanel} from 'rn-swipeable-panel';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const ChamberView = ({navigation}) => {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [month, setMonth] = useState(new Date());
  const [dates, setDates] = useState({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setDates({
      start: startOfMonth(month),
      end: endOfMonth(month),
    });
    setLoading(false);
  }, [month]);

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
            <FontAwesomeIcon icon={faCheckToSlot} color={slotColor} />
            <Text style={styles.heroBtnText} numberOfLines={1}>
              Create Slot
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => {
              navigation.navigate('ChamberEdit');
            }}>
            <FontAwesomeIcon icon={faHouseMedical} color={chamberColor} />
            <Text style={styles.heroBtnText} numberOfLines={1}>
              Edit Chamber
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => {
              setIsPanelActive(true);
            }}>
            <FontAwesomeIcon icon={faTrash} color={'#ff6a6a'} />
            <Text style={styles.heroBtnText} numberOfLines={1}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 20}}>
          <View style={styles.monthBar}>
            <TouchableOpacity
              onPress={() => {
                setMonth(subMonths(month, 1));
              }}
              style={styles.monthBtn}>
              <FontAwesomeIcon icon={faAngleLeft} color={dark1} size={18} />
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
              <Text style={{...fontBold, fontSize: 18, color: '#fff'}}>
                {format(month, 'MMMM')}
              </Text>
              <Text
                style={{
                  ...fontRegular,
                  fontSize: 14,
                  color: '#ffffffcc',
                  marginTop: 3,
                }}>
                {format(month, 'yyyy')}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setMonth(addMonths(month, 1));
              }}
              style={styles.monthBtn}>
              <FontAwesomeIcon icon={faAngleRight} color={dark1} size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            style={{alignItems: 'center', flex: 1}}
            color={dark1}
          />
        ) : (
          <ScheduleComponent />
        )}
      </View>

      <SwipeablePanel
        isActive={isPanelActive}
        fullWidth={true}
        noBackgroundOpacity={true}
        closeOnTouchOutside={true}
        showCloseButton={true}
        closeIconStyle={{backgroundColor: '#000000'}}
        onClose={() => {
          setIsPanelActive(false);
        }}>
        <View style={{paddingVertical: 15}}>
          <Text style={{...fontSemiBold, fontSize: 16, textAlign: 'center'}}>
            Are you sure you want to delete?
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#ff6a6a',
              maxWidth: 240,
              marginHorizontal: 20,
              alignSelf: 'center',
              padding: 12,
              borderRadius: 15,
              alignItems: 'center',
              width: '100%',
              marginTop: 15,
            }}>
            <Text style={{...fontBold, fontSize: 18, color: '#fff'}}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </SwipeablePanel>
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

export default ChamberView;
