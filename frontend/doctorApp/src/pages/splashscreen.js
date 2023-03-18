import {StyleSheet, View, Image, StatusBar} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {fetchUser} from '../apiCalls';
import FocusAwareStatusBar from '../components/statusBar';

const SplashScreen = () => {
  const {dispatch} = useContext(AuthContext);

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return (
    <View style={styles.splashScreen}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={'#0F1145'}
      />

      <View style={styles.mainContent}>
        <View style={styles.imageConatiner}>
          <Image
            style={styles.image}
            source={require('../assets/splash.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#0F1145',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {alignItems: 'center'},
  imageConatiner: {height: 200, width: 200},
  image: {height: '100%', width: '100%'},
  text: {
    fontSize: 24,
    color: '#fff',
    marginTop: 40,
  },
});

export default SplashScreen;
