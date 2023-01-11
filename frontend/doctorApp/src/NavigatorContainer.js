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
import Schedule from './pages/schedule';
import ChamberCreate from './pages/chamberCreate';
import ChamberView from './pages/chamberView';
import SlotCreate from './pages/slotCreate';
import StartUp from './pages/Auth/startup';
import Auth from './pages/Auth/auth';

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
        tabBarHideOnKeyboard: true,
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
              <Stack.Screen name="Schedule" component={Schedule} />
              <Stack.Screen name="ChamberCreate" component={ChamberCreate} />
              <Stack.Screen name="ChamberEdit" component={ChamberCreate} />
              <Stack.Screen name="ChamberView" component={ChamberView} />
              <Stack.Screen name="SlotCreate" component={SlotCreate} />
              <Stack.Screen name="SlotEdit" component={SlotCreate} />
            </>
          ) : (
            <>
              <Stack.Screen name="MainScreen" component={MainScreen} />
              {/* Profile Creation Pages */}
            </>
          )
        ) : (
          <>
            <Stack.Screen name="StartUp" component={StartUp} />
            <Stack.Screen name="Login" component={Auth} />
            <Stack.Screen name="Signup" component={Auth} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorContainer;
