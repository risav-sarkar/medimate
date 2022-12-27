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
  dark1,
  fontBold,
  fontRegular,
  shadow,
} from '../globalStyle';
import Header from '../components/common/header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {endOfMonth, format, startOfMonth, addMonths, subMonths} from 'date-fns';
import SlotCard from '../components/common/slotCard';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const Schedule = () => {
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
        <Header name={'Schedule'} />

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

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            style={{alignItems: 'center', flex: 1}}
            color={dark1}
          />
        ) : (
          <>
            <View style={styles.dateContainer}>
              <View style={styles.dateContent}>
                <Text
                  style={{...fontRegular, fontSize: 14, color: '#00000099'}}>
                  Thu
                </Text>
                <Text style={{...fontBold, fontSize: 16}}>29</Text>
              </View>

              <View style={{flex: 1, paddingRight: 10}}>
                <SlotCard isShadow={true} />
                <SlotCard isShadow={true} />
              </View>
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.dateContent}>
                <Text
                  style={{...fontRegular, fontSize: 14, color: '#00000099'}}>
                  Thu
                </Text>
                <Text style={{...fontBold, fontSize: 16}}>29</Text>
              </View>

              <View style={{flex: 1, paddingRight: 10}}>
                <SlotCard isShadow={true} />
                <SlotCard isShadow={true} />
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {padding: 20, paddingBottom: 30},
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
  dateContainer: {
    flexDirection: 'row',
  },
  dateContent: {
    width: 70,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default Schedule;
