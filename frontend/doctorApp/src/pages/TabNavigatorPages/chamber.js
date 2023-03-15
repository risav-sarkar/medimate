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
import ChamberCard from '../../components/common/chamberCard';
import {getChamber} from '../../apiCalls';
import {useQuery} from '@tanstack/react-query';
import LoadingScreen from '../../components/common/loadingScreen';
import ErrorScreen from '../../components/common/errorScreen';
import WarningScreen from '../../components/common/warningScreen';
import FocusAwareStatusBar from '../../components/statusBar';
import {useNavigation} from '@react-navigation/native';

const Chamber = () => {
  const navigation = useNavigation();
  const {token, profile} = useContext(AuthContext);

  const {isError, isLoading, isRefetching, data, refetch} = useQuery({
    queryKey: [`Chambers`, profile.userId],
    queryFn: getChamber,
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
              {data.length}
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
        {data.length ? (
          <View style={{paddingHorizontal: 5}}>
            {data.map(e => {
              return <ChamberCard data={e} />;
            })}
          </View>
        ) : (
          <WarningScreen label="No Chambers Added" />
        )}
      </View>
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
    overflow: 'hidden',
  },
});

export default Chamber;
