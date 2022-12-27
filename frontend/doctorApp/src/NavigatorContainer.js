import React, {useContext} from 'react';

import {AuthContext} from './context/AuthContext';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Tab Navigator Pages
import Home from './pages/TabNavigatorPages/home';
import Chamber from './pages/TabNavigatorPages/chamber';
import Profile from './pages/TabNavigatorPages/profile';

import SplashScreen from './pages/splashscreen';
import Error from './pages/error';
import TabBarIcon from './components/tabBarIcon';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: () => {
          return null;
        },
        headerShown: false,
        tabBarStyle: {
          height: 65,
          borderTopWidth: 0.5,
          borderWidth: 0,
          elevation: 0,
          backgroundColor: '#fff',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} type={'Home'} />
          ),
        }}
      />

      <Tab.Screen
        name="Chamber"
        component={Chamber}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} type={'Chamber'} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} type={'Profile'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const NavigatorContainer = () => {
  const {token, profile, isFetching, error} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}>
        {error ? (
          <Stack.Screen name="Error" component={Error} />
        ) : isFetching ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : token ? (
          profile ? (
            <>
              <Stack.Screen name="MainScreen" component={MainScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="MainScreen" component={MainScreen} />
              {/* Profile Creation Pages */}
            </>
          )
        ) : (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            {/* Login Pages*/}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorContainer;
