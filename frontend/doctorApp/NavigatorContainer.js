import React, {useContext} from 'react';

import {AuthContext} from './src/context/AuthContext';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Tab Navigator Pages
import Home from './src/pages/TabNavigatorPages/home';
import Tab2 from './src/pages/TabNavigatorPages/tab2';
import Tab3 from './src/pages/TabNavigatorPages/tab3';
import Tab4 from './src/pages/TabNavigatorPages/tab4';

import SplashScreen from './src/pages/splashscreen';
import Error from './src/pages/error';
import TabBarIcon from './src/components/tabBarIcon';

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
        name="Tab2"
        component={Tab2}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} type={'Schedule'} />
          ),
        }}
      />

      <Tab.Screen
        name="Tab3"
        component={Tab3}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} type={'Analytics'} />
          ),
        }}
      />

      <Tab.Screen
        name="Tab4"
        component={Tab4}
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
