import { View, Text, Platform } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



import Icon from 'react-native-vector-icons/Ionicons';
import { colorsApp } from '../../styles/globalColors/GlobalColors';
import Home from '../../screens/home/Home';
import CustomText from '../../components/Generals/CustomText';
import { ScreenProps } from 'react-native-screens';
import Favorities from '../../screens/favorities/Favorities';
import Messages from '../../screens/messages/Messages';
import Profile from '../../screens/profile/Profile';
import Reserves from '../../screens/reserves/Reserves';



export type RootBottomTabsNavigator = {
    Home: undefined,
    Favorites: undefined,
    Messages: undefined,
    Profile: undefined,
    Reserves: undefined
}
const BottomTabAndroid = createMaterialBottomTabNavigator<RootBottomTabsNavigator>();
const BottomTabIos = createBottomTabNavigator<RootBottomTabsNavigator>();

const renderLabel = (focused:boolean, routName:string) => {
    let title: string = ''
    switch (routName) {
        case 'Home':
            title = 'Home'
            break;
        case 'Favorites':
            title = 'Favoritos'
            break;
        case 'Reserves':
            title = 'Viajes'
            break;
        case 'Messages':
            title = 'Mensajes'
            break;
        case 'Profile':
            title = 'Perfil'
            break;
        default:
            break;
    }
    return <CustomText style={{fontSize:hp(1.3), color:focused ? colorsApp.primary() : colorsApp.light()}}>{title}</CustomText>
}

const renderIcon = (focused:boolean, routName:string) => {
    let iconName: string = ''
    switch (routName) {
        case 'Home':
            iconName = 'search-outline'
            break;
        case 'Favorites':
            iconName = 'heart-outline'
            break;
        case 'Reserves':
            iconName = 'rocket-outline'
            break;
        case 'Messages':
            iconName = 'chatbox-outline'
            break;
        case 'Profile':
            iconName = 'person-outline'
            break;
        default:
            break;

            
    }
    return <Icon name={iconName} color={focused ? colorsApp.primary() : colorsApp.light()} size={25}></Icon>
}

const BottomTabNavigationIos = () => {
    return (
        <BottomTabIos.Navigator  screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabel: ({focused }) => renderLabel(focused, route.name),
                // tabBarPressColor: 'rgba( 0, 11, 40, 0.25 )',
                tabBarIcon: ({focused }) => renderIcon(focused, route.name),
            })}
        >
            <BottomTabIos.Screen name='Home' component={Home}  />
            <BottomTabIos.Screen name='Favorites' component={Favorities} />
            <BottomTabIos.Screen name='Reserves' component={Reserves} />
            <BottomTabIos.Screen name='Messages' component={Messages} />
            <BottomTabIos.Screen name='Profile' component={Profile} />
        </BottomTabIos.Navigator>
    )
}

const BottomTabNavigationAndroid = () => {
    return (
        <BottomTabAndroid.Navigator  screenOptions={({ route }) => ({
                // tabBarLabel: ({focused }) => renderLabel(focused, route.name),
                tabBarIcon: ({focused }) => renderIcon(focused, route.name),
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
            <BottomTabAndroid.Screen name='Home' component={Home}  />
            <BottomTabAndroid.Screen name='Favorites' component={Home} />
            <BottomTabAndroid.Screen name='Messages' component={Home} />
            <BottomTabAndroid.Screen name='Profile' component={Home} />
        </BottomTabAndroid.Navigator>
    )
}

export const botomTabs =
  Platform.OS === 'ios' ? BottomTabNavigationIos : BottomTabNavigationAndroid;