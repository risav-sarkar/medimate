import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
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
import ScheduleChamber from '../components/common/scheduleChamber';
import DeletePanel from '../components/common/deletePanel';
import {
  deleteChamber,
  getChamber,
  getSlotsByChamberAndMonth,
} from '../apiCalls';
import {useToast} from 'react-native-toast-notifications';
import {AuthContext} from '../context/AuthContext';
import FocusAwareStatusBar from '../components/statusBar';
import {useQuery} from '@tanstack/react-query';
import LoadingScreen from '../components/common/loadingScreen';
import ErrorScreen from '../components/common/errorScreen';
import WarningScreen from '../components/common/warningScreen';

const ChamberView = () => {
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const {token} = useContext(AuthContext);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [month, setMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const {isError, isLoading, isRefetching, data, refetch} = useQuery({
    queryKey: [`Chamber${route.params.data._id}`, route.params.data._id],
    queryFn: getChamber,
  });

  const {
    isError: slotsError,
    isLoading: slotsLoading,
    isRefetching: slotsRefetching,
    data: slotsData,
    refetch: slotsRefetch,
  } = useQuery({
    queryKey: [
      `SlotsChamberID${route.params.data._id}Date${format(month, 'YMMdd')}`,
      route.params.data._id,
      format(month, 'YMMdd'),
    ],
    queryFn: getSlotsByChamberAndMonth,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
      slotsRefetch();
    });
    return unsubscribe;
  }, [navigation]);

  const HandleDeleteChamber = () => {
    setLoading(true);
    deleteChamber(data._id, setLoading, token, navigation, toast);
  };

  if (isLoading) return <LoadingScreen />;
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
        <View style={{paddingHorizontal: 20}}>
          <Header name={data.name} />
        </View>

        <View style={styles.heroBtnContainer}>
          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => {
              navigation.navigate('SlotCreate', {data: route.params.data._id});
            }}>
            <FontAwesomeIcon icon={faCheckToSlot} color={slotColor} />
            <Text style={styles.heroBtnText} numberOfLines={1}>
              Create Slot
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => {
              navigation.navigate('ChamberEdit', {data});
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
        {slotsLoading ? (
          <ActivityIndicator color={dark1} style={{flex: 1}} />
        ) : !slotsData.length ? (
          <WarningScreen label="No Slots Found" />
        ) : (
          <ScheduleChamber data={slotsData} />
        )}
      </View>

      <DeletePanel
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        label="Delete"
        handlePress={() => {
          HandleDeleteChamber();
        }}
        loading={loading}
      />
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
    paddingTop: 10,
    paddingBottom: 20,
    overflow: 'hidden',
  },
});

export default ChamberView;
