import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';

import {
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  fontSemiBold,
  shadow,
} from '../../globalStyle';
import FocusAwareStatusBar from '../../components/statusBar';

const StartUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor2}
      />

      <View style={styles.content}>
        <View style={styles.getstarted}>
          <Text
            style={{
              ...fontBold,
              fontSize: 26,
              paddingHorizontal: 20,
              paddingTop: 50,
            }}>
            Your best companion ever!
          </Text>

          <Text
            style={{
              ...fontRegular,
              fontSize: 16,
              paddingHorizontal: 20,
              color: '#a2a2a2',
              marginVertical: 15,
            }}>
            Create chambers, see patient booked in a sexy app Create chambers,
            see patient booked in a sexy app
          </Text>

          <View style={{padding: 15}}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: dark1,
                  borderRadius: 15,
                  padding: 15,
                  alignItems: 'center',
                },
                shadow,
              ]}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={{color: '#fff', ...fontSemiBold, fontSize: 16}}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor2,
    paddingHorizontal: 30,
  },
  content: {flex: 1, paddingBottom: 40},
  getstarted: {
    borderRadius: 15,
    backgroundColor: '#fff',
    ...shadow,
    marginTop: 'auto',
  },
});

export default StartUp;
