import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { botomTabs } from '../bottomTabNavigation/BottonTabNavigation';
import SearchScreen from '../../screens/stackScreens/searchScreen/SearchScreen';
import DetailsScreen from '../../screens/stackScreens/detailsScreen/DetailsScreen';
import FavoritesSities from '../../screens/stackScreens/favoritesSities/FavoritesSities';
import { Publication } from '../../interfaces/GlobalInterfaces';
import Login from '../../screens/stackScreens/Auth/LoginScreen';
import { AuthContext } from '../../context/publicationContext/AuthContext';
import Init from '../../components/Splash/Init';
import ConfirmAndPay from '../../screens/stackScreens/detailsScreen/ConfirmAndPay';

export type RootInitialStackParams = {
    Init:undefined
    botomTabs: undefined
    SearchScreen: undefined
    Login: undefined
    FavoritesSities: undefined
    ConfirmAndPay: undefined
    DetailsScreen: {data: Publication}
}

const Stack = createStackNavigator<RootInitialStackParams>();

const InitialStackNavigation = () => {
    const {loadingCheck,isAuthenticated} = useContext(AuthContext)
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {
                    loadingCheck ?
                        <Stack.Screen name='Init' component={Init} />
                    :
                    !isAuthenticated ?
                    <>
                        <Stack.Screen name='Login' component={Login} />
                    </>
                    :
                    <>
                        <Stack.Screen name='botomTabs' component={botomTabs} />
                        <Stack.Screen name='SearchScreen' component={SearchScreen} />
                        <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
                        <Stack.Screen name='ConfirmAndPay' component={ConfirmAndPay} />
                        <Stack.Screen name='FavoritesSities' component={FavoritesSities} />
                    </>
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default InitialStackNavigation