import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import {useIsFocused, useRoute} from '@react-navigation/native';
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
} from '../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faHouseMedical,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/header';
import Tabbar from '../components/common/tabbar';
import PagerView from 'react-native-pager-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {format, isBefore, setDay} from 'date-fns';
import {useToast} from 'react-native-toast-notifications';
import {ToastError, ToastSuccess} from '../components/toastFunction';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const SlotCreate = ({navigation}) => {
  const toast = useToast();
  const route = useRoute();
  const ref = useRef(PagerView);
  const [index, setIndex] = useState(0);

  const [slot, setSlot] = useState({
    chamberId: '',
    time: {start: '-', end: '-'},
    date: '-',
  });
  const [days, setDays] = useState([]);
  const [dateRange, setDateRange] = useState({startDate: '-', endDate: '-'});

  const [slotDatePicker, setSlotDatePicker] = useState(false);
  const [slotStartTimePicker, setSlotStartTimePicker] = useState(false);
  const [slotEndTimePicker, setSlotEndTimePicker] = useState(false);
  const [slotStartDatePicker, setSlotStartDatePicker] = useState(false);
  const [slotEndDatePicker, setSlotEndDatePicker] = useState(false);

  const dayList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const HandleSingleSubmit = () => {
    if (slot.time.start === '-' || slot.time.end === '-') {
      ToastError(toast, 'Select timings for the slot');
      return;
    } else if (!isBefore(slot.time.start, slot.time.end)) {
      ToastError(toast, 'Start time should be less than end time');
      return;
    }

    if (slot.date === '-') {
      ToastError(toast, 'Select date for the slot');
      return;
    }

    console.log({...slot});
  };

  const HandleMultipleSubmit = () => {
    if (slot.time.start === '-' || slot.time.end === '-') {
      ToastError(toast, 'Select timings for the slot');
      return;
    } else if (!isBefore(slot.time.start, slot.time.end)) {
      ToastError(toast, 'Start time should be less than end time');
      return;
    }

    if (dateRange.startDate === '-' || dateRange.endDate === '-') {
      ToastError(toast, 'Select date range for the slot');
      return;
    } else if (!isBefore(dateRange.startDate, dateRange.endDate)) {
      ToastError(toast, 'Start date should be less than end date');
      return;
    }

    if (!days.length) {
      ToastError(toast, 'Select days');
      return;
    }

    console.log({
      chamberId: slot.chamberId,
      time: slot.time,
      ...dateRange,
      days: days,
    });
  };

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
        <Header name={'Create Slot'} />

        <View style={{marginTop: 20}}>
          <Tabbar
            tabBtns={[
              {name: 'Single', index: 0},
              {name: 'Multiple', index: 1},
            ]}
            selectFunc={e => {
              ref.current.setPage(e);
            }}
            currIndex={index}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.boxMainContainer}>
            <View style={styles.boxContainer}>
              <TouchableOpacity
                style={[styles.box, shadow]}
                onPress={() => {
                  setSlotStartTimePicker(true);
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 5,
                  }}>
                  <FontAwesomeIcon size={24} icon={faClock} />
                  <Text style={styles.boxTitle}>Start Time</Text>
                </View>

                <Text style={styles.boxValue}>
                  {slot.time.start !== '-'
                    ? format(slot.time.start, 'hh:mm b')
                    : slot.time.start}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.boxContainer}>
              <TouchableOpacity
                style={[styles.box, shadow]}
                onPress={() => {
                  setSlotEndTimePicker(true);
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 5,
                  }}>
                  <FontAwesomeIcon size={24} icon={faClock} />
                  <Text style={styles.boxTitle}>End Time</Text>
                </View>

                <View>
                  <Text style={styles.boxValue}>
                    {slot.time.end !== '-'
                      ? format(slot.time.end, 'hh:mm b')
                      : slot.time.end}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <PagerView
          ref={ref}
          style={{flex: 1}}
          initialPage={0}
          showPageIndicator={true}
          onPageSelected={e => {
            setIndex(e.nativeEvent.position);
          }}>
          {/* PAGE 1 */}
          <View style={styles.mainContent}>
            <View style={styles.boxMainContainer}>
              <View style={[styles.boxContainer]}>
                <TouchableOpacity
                  style={[styles.box, shadow]}
                  onPress={() => {
                    setSlotDatePicker(true);
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 5,
                    }}>
                    <FontAwesomeIcon size={24} icon={faClock} />
                    <Text style={styles.boxTitle}>Date</Text>
                  </View>

                  <View>
                    <Text style={styles.boxValue}>
                      {slot.date !== '-'
                        ? format(slot.date, 'd/M/y')
                        : slot.date}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{paddingHorizontal: 7.5, paddingTop: 20}}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => HandleSingleSubmit()}>
                <Text style={{color: '#fff', ...fontBold, fontSize: 16}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Page 2 */}
          <View style={styles.mainContent}>
            <Text
              style={{
                paddingHorizontal: 7.5,
                marginTop: 40,
                marginBottom: 5,
                fontSize: 20,
                ...fontBold,
              }}>
              Select Date Range
            </Text>

            <View style={styles.boxMainContainer}>
              <View style={[styles.boxContainer]}>
                <TouchableOpacity
                  style={[styles.box, shadow]}
                  onPress={() => {
                    setSlotStartDatePicker(true);
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 5,
                    }}>
                    <FontAwesomeIcon size={24} icon={faClock} />
                    <Text style={styles.boxTitle}>Start Date</Text>
                  </View>

                  <View>
                    <Text style={styles.boxValue}>
                      {dateRange.startDate !== '-'
                        ? format(dateRange.startDate, 'd/M/y')
                        : dateRange.startDate}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[styles.boxContainer]}>
                <TouchableOpacity
                  style={[styles.box, shadow]}
                  onPress={() => {
                    setSlotEndDatePicker(true);
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 5,
                    }}>
                    <FontAwesomeIcon size={24} icon={faClock} />
                    <Text style={styles.boxTitle}>End Date</Text>
                  </View>

                  <View>
                    <Text style={styles.boxValue}>
                      {dateRange.endDate !== '-'
                        ? format(dateRange.endDate, 'd/M/y')
                        : dateRange.endDate}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                paddingHorizontal: 7.5,
                marginTop: 20,
                marginBottom: 10,
                fontSize: 20,
                ...fontBold,
              }}>
              Select Days
            </Text>
            <View style={styles.boxMainContainer}>
              {dayList.map(e => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.dayBtn,
                      shadow,
                      days.includes(e) ? styles.dayBtnSelected : null,
                    ]}
                    onPress={() => {
                      let arr = [...days];

                      if (arr.includes(e)) {
                        let arr1 = arr.filter(function (item) {
                          return item !== e;
                        });
                        setDays([...arr1]);
                      } else {
                        arr.push(e);
                        setDays([...arr]);
                      }
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{e}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{paddingHorizontal: 7.5, paddingTop: 20}}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => HandleMultipleSubmit()}>
                <Text style={{color: '#fff', ...fontBold, fontSize: 16}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </PagerView>
      </View>

      <DateTimePicker
        isVisible={slotStartTimePicker}
        mode="time"
        onConfirm={time => {
          setSlot({...slot, time: {...slot.time, start: time}});
          setSlotStartTimePicker(false);
        }}
        onCancel={() => {
          setSlotStartTimePicker(false);
        }}
      />

      <DateTimePicker
        isVisible={slotEndTimePicker}
        mode="time"
        onConfirm={time => {
          setSlot({...slot, time: {...slot.time, end: time}});
          setSlotEndTimePicker(false);
        }}
        onCancel={() => {
          setSlotEndTimePicker(false);
        }}
      />

      <DateTimePicker
        isVisible={slotDatePicker}
        mode="date"
        onConfirm={date => {
          setSlot({...slot, date: date});
          setSlotDatePicker(false);
        }}
        onCancel={() => {
          setSlotDatePicker(false);
        }}
        minimumDate={new Date()}
      />

      <DateTimePicker
        isVisible={slotStartDatePicker}
        mode="date"
        onConfirm={date => {
          setDateRange({...dateRange, startDate: date});
          setSlotStartDatePicker(false);
        }}
        onCancel={() => {
          setSlotStartDatePicker(false);
        }}
        minimumDate={new Date()}
      />

      <DateTimePicker
        isVisible={slotEndDatePicker}
        mode="date"
        onConfirm={date => {
          setDateRange({...dateRange, endDate: date});
          setSlotEndDatePicker(false);
        }}
        onCancel={() => {
          setSlotEndDatePicker(false);
        }}
        minimumDate={new Date()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
  },
  mainContent: {paddingHorizontal: 12.5},
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
  boxMainContainer: {
    flexDirection: 'row',
  },
  boxContainer: {
    padding: 7.5,
    flex: 1,
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  boxTitle: {
    color: dark1,
    fontSize: 18,
    marginLeft: 10,
    ...fontSemiBold,
  },
  boxValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    ...fontMedium,
  },
  dayBtn: {
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
  },
  dayBtnSelected: {backgroundColor: '#fff', borderWidth: 2, borderColor: dark1},
});

export default SlotCreate;
