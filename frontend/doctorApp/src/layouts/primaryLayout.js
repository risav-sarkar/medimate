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
import FocusAwareStatusBar from '../components/statusBar';

const PrimaryLayout = ({name, children}) => {
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
          <Header name={name} />
        </View>
      </View>

      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingTop: 20, paddingBottom: 30},
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 15,
    paddingBottom: 20,
    overflow: 'hidden',
  },
});

export default PrimaryLayout;
