import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootBottomTabsNavigator, botomTabs } from '../bottomTabNavigation/BottonTabNavigation';
import DetailsScreen from '../../screens/publicationDetailsScreen/DetailsScreen';
import { Publication } from '../../interfaces/GlobalInterfaces';
import Login from '../../screens/auth/LoginScreen';
import { AuthContext } from '../../context/AuthContext';
import Init from '../../components/splash/Init';
import ConfirmAndPay from '../../screens/publicationDetailsScreen/ConfirmAndPay';
import ReserveDetail from '../../screens/reserves/ReserveDetail';
import { Reserve } from '../../interfaces/ReserveInterface';
import { Contact } from '../../interfaces/Chat';
import ContactMessages from '../../screens/messages/ContactMessages';

export type RootInitialStackParams = RootBottomTabsNavigator & {
    Init:undefined
    botomTabs: undefined
    SearchScreen: undefined
    Login: undefined
    Favorites: undefined
    ConfirmAndPay: undefined
    ReserveDetail:{reserve: Reserve, addReserveList?:boolean}
    DetailsScreen: {publication: Publication}
    ContactMessages:{contact:Contact, isNewContact?:boolean}
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
                        {/* <Stack.Screen name='SearchScreen' component={SearchScreen} /> */}

                        {/* Rutas para detalle de publicación y reservar */}
                        <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
                        <Stack.Screen name='ConfirmAndPay' component={ConfirmAndPay} />

                        {/* Rutas para el detalle de una reserva */}
                        <Stack.Screen name='ReserveDetail' component={ReserveDetail} />

                        {/* Ruta para ver los mensajes de un ocntacto  */}
                        <Stack.Screen name='ContactMessages' component={ContactMessages} />
                        

                    </>
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default InitialStackNavigation