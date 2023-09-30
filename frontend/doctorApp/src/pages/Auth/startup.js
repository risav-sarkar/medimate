import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';

import Thumbnail from '../../assets/images/startup_thumbnail.png';

import {
  backgroundColor2,
  dark1,
  fontBold,
  fontRegular,
  fontSemiBold,
  shadow,
} from '../../globalStyle';
import FocusAwareStatusBar from '../../components/statusBar';
import FastImage from 'react-native-fast-image';

const imageAspectRatio = 782 / 1024;
const scaledWidth = Dimensions.get('window').width - 60;
const scaledHeight = scaledWidth / imageAspectRatio;

const StartUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor2}
      />

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <FastImage
            style={{
              width: scaledWidth,
              height: scaledHeight,
              position: 'absolute',
              bottom: 0,
            }}
            source={Thumbnail}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.getstarted}>
          <Text
            style={{
              ...fontBold,
              fontSize: 26,
              paddingHorizontal: 20,
              paddingTop: 25,
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
            Manage all your patients effortlessly in a single app.
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
  imageContainer: {flex: 1},
  getstarted: {
    borderRadius: 15,
    backgroundColor: '#fff',
    ...shadow,
  },
});

export default StartUp;
