import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {
  backgroundColor1,
  backgroundColor2,
  dark1,
  fontBold,
  fontMedium,
  fontRegular,
  patientColor,
  shadow,
} from '../../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock, faUserGroup} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

const SlotCard2 = ({data}) => {
  const navigation = useNavigation();
  const date = new Date(data.date.jsDate);

  return (
    <View style={styles.slotContainer}>
      <View style={styles.dateContainer}>
        <Text style={{...fontRegular, fontSize: 14, color: '#00000099'}}>
          {format(date, 'EEE')}
        </Text>
        <Text style={{...fontBold, fontSize: 16}}>{format(date, 'd')}</Text>
      </View>

      <View style={{flex: 1, paddingRight: 10}}>
        {data.slots.map(e => {
          return (
            <View style={styles.container}>
              <TouchableOpacity
                style={[
                  styles.content,
                  {...shadow, backgroundColor: backgroundColor1},
                ]}
                onPress={() => {
                  navigation.navigate('SlotView', {data: {...e}});
                }}>
                <View style={styles.textContainer}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <FontAwesomeIcon icon={faClock} color={dark1} size={14} />
                      <Text
                        style={{...fontMedium, fontSize: 16, marginLeft: 8}}
                        numberOfLines={1}>
                        {`${format(
                          new Date(e.time.start),
                          'h:mm aa',
                        )} - ${format(new Date(e.time.end), 'h:mm aa')}`}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: dark1,
                        alignSelf: 'flex-start',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 85,
                        marginTop: 10,
                        ...shadow,
                      }}>
                      <Text
                        style={{
                          ...fontMedium,
                          fontSize: 16,
                          color: '#fff',
                          marginLeft: 10,
                        }}>
                        {`${e.numberOfBookings || 0} / ${e.bookingLimit || 0}`}
                      </Text>

                      <FontAwesomeIcon
                        icon={faUserGroup}
                        color={patientColor}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    flexDirection: 'row',
  },
  dateContainer: {
    width: 70,
    alignItems: 'center',
    paddingVertical: 10,
  },
  container: {paddingHorizontal: 5, paddingVertical: 5},
  content: {
    borderRadius: 15,
    backgroundColor: backgroundColor1,
    flexDirection: 'row',
    padding: 5,
  },
  imageContainer: {height: 120, borderRadius: 15, overflow: 'hidden'},
  textContainer: {
    padding: 5,
    flex: 1,
  },
});

export default SlotCard2;
