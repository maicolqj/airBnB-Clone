import { View, Text, Platform } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



import ExploreScreen from '../../screens/bottomTabScreens/exploreScreen/ExploreScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colorsApp } from '../../styles/globalColors/GlobalColors';



export type RootBottomTabsNavigator = {
    ExploreScreen: undefined
}
const BottomTabAndroid = createMaterialBottomTabNavigator<RootBottomTabsNavigator>();
const BottomTabIos = createBottomTabNavigator<RootBottomTabsNavigator>();



const BottomTabNavigationIos = () => {
    return (
        <BottomTabIos.Navigator  screenOptions={({ route }) => ({

            headerShown: false,
            tabBarLabel: () => null,
            tabBarPressColor: 'rgba( 0, 11, 40, 0.25 )',
            tabBarIcon: ({ color, focused }) => {
                let iconName: string = ''
                switch (route.name) {
                    case 'ExploreScreen':
                        iconName = 'search'
                        break;
                    default:
                        break;
                }
      
                return <Icon name={iconName} color={colorsApp.blackLeather()} size={25}></Icon>
            },
            
        })
      
        }>
            <BottomTabIos.Screen name='ExploreScreen' component={ExploreScreen} />
        </BottomTabIos.Navigator>
    )
}

const BottomTabNavigationAndroid = () => {
    return (
        <BottomTabAndroid.Navigator  

        screenOptions={({ route }) => ({
            
            tabBarIcon: ({ color, focused }) => {
              let iconName: string = ''
              switch (route.name) {
                case 'ExploreScreen':
                  iconName = 'search-outline'
                  break;
                
                default:
                  break;
              }
    
              return <Icon name={iconName} color={color} size={25}></Icon>
            },

          })}
            activeColor={colorsApp.blackLeather()}
            sceneAnimationType='opacity'
            sceneAnimationEnabled={true}
            labeled={false}
            
            barStyle={{
              backgroundColor: '#fff',
              elevation: 2,
              borderTopWidth: 0.9,
              borderColor: 'rgba(0,0,0,0.05)',
              height: hp('7%'),             
            }}
            
            >
            <BottomTabAndroid.Screen name='ExploreScreen' component={ExploreScreen} />
        </BottomTabAndroid.Navigator>
    )
}

export const botomTabs =
  Platform.OS === 'ios' ? BottomTabNavigationIos : BottomTabNavigationAndroid;