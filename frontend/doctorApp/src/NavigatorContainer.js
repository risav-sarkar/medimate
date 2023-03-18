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
import ChamberCreateEdit from './pages/chamberCreateEdit';
import ChamberView from './pages/chamberView';
import SlotCreate from './pages/slotCreate';
import SlotEdit from './pages/slotEdit';
import StartUp from './pages/Auth/startup';
import Auth from './pages/Auth/auth';
import SlotView from './pages/slotView';
import ProfileCreateEdit from './pages/profileCreateEdit';
import ForgetPassword from './pages/Auth/forgetPassword';
import ResetEmail from './pages/Auth/resetEmail';

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
  console.log(token, profile, isFetching, error);
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
              <Stack.Screen name="ProfileEdit" component={ProfileCreateEdit} />
              <Stack.Screen name="ResetEmail" component={ResetEmail} />
              <Stack.Screen name="Schedule" component={Schedule} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen
                name="ChamberCreate"
                component={ChamberCreateEdit}
              />
              <Stack.Screen name="ChamberEdit" component={ChamberCreateEdit} />
              <Stack.Screen name="ChamberView" component={ChamberView} />
              <Stack.Screen name="SlotCreate" component={SlotCreate} />
              <Stack.Screen name="SlotEdit" component={SlotEdit} />
              <Stack.Screen name="SlotView" component={SlotView} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="ProfileCreate"
                component={ProfileCreateEdit}
              />
            </>
          )
        ) : (
          <>
            <Stack.Screen name="StartUp" component={StartUp} />
            <Stack.Screen name="Login" component={Auth} />
            <Stack.Screen name="Signup" component={Auth} />
            <Stack.Screen
              name="ForgetPasswordNoUser"
              component={ForgetPassword}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorContainer;
