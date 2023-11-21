


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import RoomScreen from '../../screens/topTabScreens/homeScreen/HomeScreen';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { colorsApp } from '../../styles/globalColors/GlobalColors';
// import FavoritesSities from '../../screens/stackScreens/favoritesSities/FavoritesSities';
// import InitialStackNavigation from '../stackNavigation/InitialStackNavigation';
// import HomeScreen from '../../screens/topTabScreens/homeScreen/HomeScreen';


// export type RootTopTabsNavigator = {
//   ApartmentScreen: { category: string },
//   StudioApartmentScreen: { category: string },
//   RoomScreen: { category: string },
// }

// type TabParams = {
//   category?: string;
// };

// const TopTabs = createMaterialTopTabNavigator<RootTopTabsNavigator>();

// const TopTabNavigation = () => {
//   return (
//     <TopTabs.Navigator 
    
//     screenOptions={({ route }) => ({

//       tabStyle: { width: 'auto' },
//       tabBarLabel: () => null,
//       animationEnabled: false,
//       tabBarIndicatorStyle: {backgroundColor: colorsApp.blackLeather()} ,
//       tabBarPressColor: 'rgba( 0, 11, 40, 0.25 )',
  
//       tabBarIcon: ({ color, focused }) => {
//           let iconName: string = ''
//           switch (route.name) {
//               case 'ApartmentScreen':
//                   iconName = 'greenhouse'
//                   break;
//               case 'StudioApartmentScreen':
//                   iconName = 'hoop-house'
//                   break;
//               case 'RoomScreen':
//                   iconName = 'warehouse'
//                   break;
             
//               default:
//                   break;
//           }

//           return <Icon name={iconName} color={colorsApp.blackLeather()} size={25}></Icon>
//       },
      
//   })
  

//   }
// >
//       <TopTabs.Screen name='RoomScreen' component={HomeScreen}   initialParams={{ category: 'Habitacion' }} />
//       <TopTabs.Screen name='ApartmentScreen' component={HomeScreen}   initialParams={{ category: 'Apartamento' }} />
//       <TopTabs.Screen name='StudioApartmentScreen' component={HomeScreen}  initialParams={{ category: 'ApartaEstudio' }} />
//     </TopTabs.Navigator>
//   )
// }

// export default TopTabNavigation

