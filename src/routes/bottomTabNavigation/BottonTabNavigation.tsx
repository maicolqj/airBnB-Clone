import { View, Text, Platform } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



import Icon from 'react-native-vector-icons/Ionicons';
import { colorsApp } from '../../styles/globalColors/GlobalColors';
import Home from '../../screens/home/Home';
import CustomText from '../../components/generals/CustomText';
import { ScreenProps } from 'react-native-screens';
import Favorities from '../../screens/favorities/Favorities';
import Profile from '../../screens/profile/Profile';
import Reserves from '../../screens/reserves/Reserves';
import Contacts from '../../screens/messages/Contacts';



export type RootBottomTabsNavigator = {
    Home: undefined,
    Favorites: undefined,
    Contacts: undefined,
    Profile: undefined,
    Reserves: undefined
}
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
        case 'Contacts':
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
        case 'Contacts':
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
                tabBarStyle:{
                    ...Platform.select({
                        android: {
                            height:hp(7),
                            paddingBottom:hp(1)
                        }
                    }),
                }
                
            })}
            // sceneContainerStyle={{height:hp(5)}}
        >
            <BottomTabIos.Screen name='Home' component={Home}  />
            <BottomTabIos.Screen name='Favorites' component={Favorities} />
            <BottomTabIos.Screen name='Reserves' component={Reserves} />
            <BottomTabIos.Screen name='Contacts' component={Contacts} />
            <BottomTabIos.Screen name='Profile' component={Profile} />
        </BottomTabIos.Navigator>
    )
}



export const botomTabs = BottomTabNavigationIos