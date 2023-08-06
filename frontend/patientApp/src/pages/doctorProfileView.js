import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {getChamber, getChambers, getDoctorSearchResults} from '../apiCalls';
import {
  backgroundColor1,
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  shadow,
} from '../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMagnifyingGlass,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import FocusAwareStatusBar from '../components/statusBar';
import Header from '../components/common/header';
import WarningScreen from '../components/common/warningScreen';
import DoctorCard from '../components/common/doctorCard';
import LoadingScreen from '../components/common/loadingScreen';
import ErrorScreen from '../components/common/errorScreen';
import {useQuery} from '@tanstack/react-query';
import ChamberCard from '../components/common/chamberCard';

const DoctorProfileView = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const DoctorData = route.params.data;

  const {
    isError,
    isLoading,
    isRefetching,
    data: chambers,
    refetch,
  } = useQuery({
    queryKey: [`DoctorId${DoctorData.userId}`, DoctorData.userId],
    queryFn: getChambers,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation]);

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
        <Header />
        <View style={styles.heroSection}>
          <View style={styles.imageContainer}>
            <FontAwesomeIcon
              icon={faUserDoctor}
              color={backgroundColor2}
              size={60}
            />
          </View>
          <Text style={styles.doctorName}>{`Dr. ${DoctorData.name}`}</Text>
          <Text
            style={
              styles.departmentText
            }>{`${DoctorData.medicalDepartment}`}</Text>
          <Text style={styles.qualificationText}>
            {DoctorData.qualification}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text
          style={{
            ...fontRegular,
            padding: 10,
            fontSize: 18,
            textAlign: 'center',
            borderBottomWidth: 1,
            borderColor: '#00000033',
          }}>
          Chambers
        </Text>

        {chambers?.length ? (
          <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
            {chambers.map(e => {
              return <ChamberCard data={e} isShadow />;
            })}
          </View>
        ) : (
          <WarningScreen label="No Chambers added by the Doctor yet" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingTop: 10, paddingBottom: 30},
  heroSection: {alignItems: 'center', marginTop: 20},
  imageContainer: {
    height: 110,
    width: 110,
    backgroundColor: backgroundColor1,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  doctorName: {...fontBold, marginTop: 10, fontSize: 26, color: '#fff'},
  departmentText: {
    ...fontRegular,
    marginTop: 8,
    fontSize: 18,
    color: '#ffffffd9',
  },
  qualificationText: {...fontRegular, fontSize: 16, color: '#ffffffd9'},
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 5,
  },
});

export default DoctorProfileView;
