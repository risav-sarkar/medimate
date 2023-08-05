import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {getDoctorSearchResults} from '../apiCalls';
import {
  backgroundColor1,
  backgroundColor2,
  dark1,
  fontRegular,
  shadow,
} from '../globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import FocusAwareStatusBar from '../components/statusBar';
import Header from '../components/common/header';
import WarningScreen from '../components/common/warningScreen';
import DoctorCard from '../components/common/doctorCard';

const SearchPage = () => {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const [searchString, setSearchString] = useState('');
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchString) {
      const timer = setTimeout(() => {
        getDoctorSearchResults(searchString, setResult, setIsLoading, toast);
      }, 500);
      return () => clearTimeout(timer);
    } else setResult([]);
  }, [searchString]);

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
        <Header name="Search" />
        <View style={styles.searchbar}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color={backgroundColor2}
            size={20}
          />
          <TextInput
            autoCorrect={false}
            style={[styles.inputStyle]}
            placeholder={"Enter Doctor's name..."}
            value={searchString}
            onChangeText={e => {
              setSearchString(e);
            }}
            placeholderTextColor={'#adadad'}
          />
        </View>
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator color={dark1} style={{flex: 1}} />
        ) : searchString ? (
          result.length ? (
            <FlatList
              contentContainerStyle={{}}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={result}
              ItemSeparatorComponent={() => <View style={{}} />}
              keyExtractor={item => `doctor${item._id}`}
              renderItem={({item}) => {
                return <DoctorCard data={item} isShadow />;
              }}
            />
          ) : (
            <WarningScreen label="No results found..." />
          )
        ) : (
          <WarningScreen label="Search something..." />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor2},
  header: {paddingBottom: 30},
  searchbar: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: backgroundColor1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    ...shadow,
  },
  inputStyle: {
    color: '#000000',
    padding: 0,
    margin: 0,
    marginLeft: 10,
    flex: 1,
    ...fontRegular,
  },
  content: {
    flex: 1,
    backgroundColor: backgroundColor1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});

export default SearchPage;
