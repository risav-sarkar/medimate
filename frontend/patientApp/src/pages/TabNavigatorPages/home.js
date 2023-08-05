import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';

import {
  backgroundColor1,
  backgroundColor2,
  chamberColor,
  color1,
  dark1,
  fontBold,
  fontRegular,
  patientColor,
  shadow,
  slotColor,
  specialities,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheckToSlot,
  faCircleUser,
  faHouseMedical,
  faMagnifyingGlass,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

import {format} from 'date-fns';
import {useQuery} from '@tanstack/react-query';
import {getSlotsByDoctorAndDate} from '../../apiCalls';
import WarningScreen from '../../components/common/warningScreen';
import FocusAwareStatusBar from '../../components/statusBar';

const Home = ({navigation}) => {
  const {token, dispatch, profile} = useContext(AuthContext);

  // const {
  //   isError: slotsError,
  //   isLoading: slotsLoading,
  //   isRefetching: slotsRefetching,
  //   data: slotsData,
  //   refetch: slotsRefetch,
  // } = useQuery({
  //   queryKey: [
  //     `SlotsToday${format(new Date(), 'YMMdd')}`,
  //     profile.userId,
  //     format(new Date(), 'YMMdd'),
  //   ],
  //   queryFn: getSlotsByDoctorAndDate,
  // });

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     slotsRefetch();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const SpecialityCard = ({text}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 500,
            backgroundColor: backgroundColor1,
            ...shadow,
          }}></View>

        <Text
          style={{
            ...fontRegular,
            color: '#ffffffcc',
            marginTop: 8,
            fontSize: 10,
          }}>
          {text}
        </Text>
      </View>
    );
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <View>
            <Text style={styles.headerText}>{`Hi, ${profile.name}`}</Text>
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
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={styles.searchbar}
            onPress={() => {
              navigation.navigate('SearchPage');
            }}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color={backgroundColor2}
              size={20}
            />
            <Text style={styles.searchBarText}>Search for Doctors...</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.specialityHeader}>
            <Text style={styles.specialityHeaderText}>Speciality</Text>
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllBtnText}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            contentContainerStyle={{paddingHorizontal: 20, marginTop: 20}}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={specialities}
            ItemSeparatorComponent={() => <View style={{width: 15}} />}
            keyExtractor={item => `specialities${item.name}`}
            renderItem={({item}) => {
              return <SpecialityCard text={item.name} />;
            }}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={{paddingHorizontal: 5, flex: 1}}>
          {/* {slotsLoading ? (
            <ActivityIndicator color={dark1} style={{flex: 1}} />
          ) : !slotsData?.slots?.length ? (
            <WarningScreen label="No Slots Found" />
          ) : (
            slotsData.slots.map(e => {
              return (
                <SlotCard slotData={e.slotData} chamberData={e.chamberData} />
              );
            })
          )} */}
          <WarningScreen label="No Appoinments Today" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingBottom: 30},
  headerText: {color: color1, fontSize: 26, ...fontBold},
  searchbar: {
    backgroundColor: backgroundColor1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    ...shadow,
  },
  searchBarText: {...fontRegular, marginLeft: 15},
  specialityHeader: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specialityHeaderText: {...fontBold, color: '#fff', fontSize: 18},
  viewAllBtn: {
    backgroundColor: backgroundColor1,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
    ...shadow,
  },
  viewAllBtnText: {...fontRegular, fontSize: 12},
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
  },
});

export default Home;
