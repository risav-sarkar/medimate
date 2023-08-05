import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
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
        backgroundColor={'#212121'}
      />

      <View style={styles.mainContent}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {alignItems: 'center'},
  image: {height: '100%', width: '100%'},
  text: {
    fontSize: 24,
    color: '#fff',
    marginTop: 40,
  },
});

export default SplashScreen;
