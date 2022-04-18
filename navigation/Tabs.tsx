import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'react-native';
import Icon from 'react-native-ionicons';

import Movies from '../screens/Movies';
import Search from '../screens/Search';
import TV from '../screens/TV';
import {BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR} from '../colors';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      initialRouteName={'Movies'}
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : 'white',
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
      }}>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="film" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={TV}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="tv" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name={'search'} color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
