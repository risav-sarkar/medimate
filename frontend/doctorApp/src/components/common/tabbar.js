import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {dark1} from '../../globalStyle';

const Tabbar = ({tabBtns, selectFunc, currIndex}) => {
  return (
    <View style={styles.container}>
      {tabBtns.map(e => {
        return (
          <View style={styles.tabBtnContainer}>
            <TouchableOpacity
              style={[
                styles.tabBtn,
                {
                  backgroundColor:
                    currIndex === e.index ? '#fff' : 'transparent',
                },
              ]}
              onPress={() => {
                selectFunc(e.index);
              }}>
              <Text style={{color: currIndex === e.index ? dark1 : '#fff'}}>
                {e.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  tabBtnContainer: {
    flex: 1,
  },
  tabBtn: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default Tabbar;
