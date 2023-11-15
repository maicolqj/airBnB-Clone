
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { botomTabs } from '../bottomTabNavigation/BottonTabNavigation';
import SearchScreen from '../../screens/stackScreens/searchScreen/SearchScreen';
import TopTabNavigation from '../TopTabNavigation/TopTabNavigation';
import FavoritesSities from '../../screens/topTabScreens/favoritesSities/FavoritesSities';

export type RootInitialStackParams = {
    botomTabs: undefined
    SearchScreen: undefined
    TopTabNavigation: undefined
    FavoritesSities: undefined
}


const Stack = createStackNavigator<RootInitialStackParams>();

const InitialStackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='botomTabs' component={botomTabs} />
                <Stack.Screen name='SearchScreen' component={SearchScreen} />
                <Stack.Screen name='TopTabNavigation' component={TopTabNavigation} />
                <Stack.Screen name='FavoritesSities' component={FavoritesSities} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default InitialStackNavigation