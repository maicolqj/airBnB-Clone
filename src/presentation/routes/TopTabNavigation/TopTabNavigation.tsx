import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ApartmentScreen from '../../screens/topTabScreens/apartmentScreen/ApartmentScreen';
import StudioApartmentScreen from '../../screens/topTabScreens/studioApartmentScreen/StudioApartmentScreen';
import RoomScreen from '../../screens/topTabScreens/roomScreen/RoomScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorsApp } from '../../styles/globalColors/GlobalColors';
import FavoritesSities from '../../screens/topTabScreens/favoritesSities/FavoritesSities';
import InitialStackNavigation from '../stackNavigation/InitialStackNavigation';


export type RootTopTabsNavigator = {
  ApartmentScreen: undefined,
  StudioApartmentScreen: undefined,
  RoomScreen: undefined,
  InitialStackNavigation: undefined,
}

const TopTabs = createMaterialTopTabNavigator<RootTopTabsNavigator>();

const TopTabNavigation = () => {
  return (
    <TopTabs.Navigator screenOptions={({ route }) => ({
      tabStyle: { width: 'auto' },
      tabBarLabel: () => null,
      animationEnabled: true,
      tabBarIndicatorStyle: {backgroundColor: colorsApp.blackLeather()} ,
      tabBarPressColor: 'rgba( 0, 11, 40, 0.25 )',
      tabBarIcon: ({ color, focused }) => {
          let iconName: string = ''
          switch (route.name) {
              case 'ApartmentScreen':
                  iconName = 'greenhouse'
                  break;
              case 'StudioApartmentScreen':
                  iconName = 'hoop-house'
                  break;
              case 'RoomScreen':
                  iconName = 'warehouse'
                  break;
             
              default:
                  break;
          }

          return <Icon name={iconName} color={colorsApp.blackLeather()} size={25}></Icon>
      },
      
  })

  }
>
      <TopTabs.Screen name='ApartmentScreen' component={ApartmentScreen} />
      <TopTabs.Screen name='StudioApartmentScreen' component={StudioApartmentScreen} />
      <TopTabs.Screen name='RoomScreen' component={RoomScreen} />
    </TopTabs.Navigator>
  )
}

export default TopTabNavigation

