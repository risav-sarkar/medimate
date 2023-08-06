import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {getSlotsByChamberAndMonth, postBooking} from '../apiCalls';
import {
  backgroundColor1,
  backgroundColor2,
  color1,
  color1_dark,
  dark1,
  fontBold,
  fontRegular,
  shadow,
} from '../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import FocusAwareStatusBar from '../components/statusBar';
import Header from '../components/common/header';
import WarningScreen from '../components/common/warningScreen';
import ErrorScreen from '../components/common/errorScreen';
import {useQuery} from '@tanstack/react-query';
import {addMonths, format, subMonths} from 'date-fns';
import ActionButton from '../components/common/actionButton';
import {AuthContext} from '../context/AuthContext';

const SlotsView = () => {
  const route = useRoute();
  const toast = useToast();
  const {token, profile} = useContext(AuthContext);
  const navigation = useNavigation();
  const ChamberData = route.params.data;

  const [month, setMonth] = useState(new Date());
  const [currDate, setCurrDate] = useState('');
  const [currSlots, setCurrSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState('');

  const {
    isError,
    isLoading,
    isRefetching,
    data: slots,
    refetch,
  } = useQuery({
    queryKey: [
      `Slots`,
      ChamberData._id,
      format(new Date(month), 'YMMdd'),
      month,
    ],
    queryFn: getSlotsByChamberAndMonth,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation]);

  const HandleBooking = () => {
    if (loading) return;
    setLoading(true);
    postBooking(
      {slotId: selectedSlot, patientId: profile.userId},
      setLoading,
      token,
      navigation,
      toast,
    );
  };

  if (isError)
    return (
      <ErrorScreen refetch={refetch} loading={isLoading || isRefetching} />
    );

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
        <Header name={ChamberData.name} />

        <View style={{paddingHorizontal: 20}}>
          <View style={styles.monthBar}>
            <TouchableOpacity
              onPress={() => {
                setMonth(subMonths(month, 1));
                setSelectedSlot('');
                setCurrSlots([]);
                setCurrDate('');
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
                setSelectedSlot('');
                setCurrSlots([]);
                setCurrDate('');
              }}
              style={styles.monthBtn}>
              <FontAwesomeIcon icon={faAngleRight} color={dark1} size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={{
            flex: 1,
          }}>
          {isLoading ? (
            <>
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={dark1} />
              </View>
            </>
          ) : slots?.length ? (
            <View>
              <Text
                style={{
                  ...fontRegular,
                  padding: 20,
                  paddingBottom: 0,
                  fontSize: 16,
                }}>
                Select Date
              </Text>
              <FlatList
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 15,
                  marginTop: 15,
                }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={slots}
                ItemSeparatorComponent={() => <View style={{width: 10}} />}
                keyExtractor={item => `date${item.date.jsDate}`}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.dayBtn,
                        currDate === item.date.dateNumber
                          ? styles.dayBtnSelected
                          : '',
                      ]}
                      onPress={() => {
                        setCurrSlots(item.slots);
                        setCurrDate(item.date.dateNumber);
                        setSelectedSlot('');
                      }}>
                      <Text style={{...fontRegular, fontSize: 14}}>
                        {format(new Date(item.date.jsDate), 'cccccc')}
                      </Text>
                      <Text style={{...fontBold, fontSize: 18}}>
                        {format(new Date(item.date.jsDate), 'dd')}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />

              <View style={styles.slotsListContainer}>
                <Text
                  style={{
                    ...fontRegular,
                    paddingBottom: 20,
                    fontSize: 16,
                  }}>
                  Select Slot
                </Text>

                <FlatList
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={currSlots}
                  ItemSeparatorComponent={() => <View style={{height: 10}} />}
                  keyExtractor={item => `slot${item.time.start}`}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.slotBtn,
                          selectedSlot === item._id
                            ? styles.slotBtnSelected
                            : '',
                        ]}
                        onPress={() => {
                          setSelectedSlot(item._id);
                        }}>
                        <Text
                          style={{
                            ...fontRegular,
                            fontSize: 18,
                            color:
                              selectedSlot === item._id ? '#fff' : '#000000',
                          }}>{`${format(
                          new Date(item.time.start),
                          'h:mm aa',
                        )} - ${format(
                          new Date(item.time.end),
                          'h:mm aa',
                        )}`}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          ) : (
            <WarningScreen label="No Chambers added by the Doctor yet" />
          )}
        </View>

        {selectedSlot && (
          <View style={{padding: 15}}>
            <ActionButton
              loading={loading}
              handlePress={() => {
                HandleBooking();
              }}
              label="Confirm"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingBottom: 30},
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
    overflow: 'hidden',
  },
  dayBtn: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  dayBtnSelected: {backgroundColor: color1, borderColor: color1_dark},
  slotsListContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: '#00000033',
    padding: 20,
  },
  slotBtn: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color1_dark,
  },
  slotBtnSelected: {backgroundColor: color1_dark},
});

export default SlotsView;
