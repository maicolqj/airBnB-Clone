import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RouteProp } from '@react-navigation/native';

import CardSitesComponents from '../../../components/CardSitesComponents';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootInitialStackParams } from '../../../routes/stackNavigation/InitialStackNavigation';
import CustomTextComponent from '../../../components/CustonTextComponent';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customStyles } from '../../../styles/globalComponentsStyles/GlobalComponentStyles';
import MapHomeComponent from './components/MapHomeComponent';
import { ScrollView } from 'react-native-gesture-handler';

type RootStackParamList = {
  ApartaEstudio: { category: string };
  Habitacion: { category: string };
  Apartamento: { category: string };
};

type FilterScreenRouteProp = RouteProp<RootStackParamList, 'ApartaEstudio' | 'Habitacion' | 'Apartamento'>;

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ApartaEstudio' | 'Habitacion' | 'Apartamento'>;


type Props = {
  route: FilterScreenRouteProp;
  navigation: FilterScreenNavigationProp & StackNavigationProp<RootInitialStackParams, 'TopTabNavigation'>;
};

const HomeScreen = ({ route, navigation }: Props) => {

  const { category } = route.params || { category: 'Apartamento' };
  const [viewMAp, setViewMAp] = useState(false);
  console.log(`LA CATEGORIA SELECCIONADA ES ${category}`);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      // TODO: AQUI SE HACE EL LLAMADO A LA API PARA CARGAR DINAMICAMENTE 
      console.log(`final del scroll`);
      
    }
  };
  return (
    <View style={{ ...styles.container, ...styles.container }}>

      {
        viewMAp
          ? <MapHomeComponent />
          : <>
            <ScrollView onScroll={handleScroll}>
              <CardSitesComponents navigation={navigation} />
            </ScrollView>
          </>
      }

      <TouchableOpacity style={{ ...styles.buttonMap }} onPress={() => setViewMAp(!viewMAp)}>
        {
          !viewMAp ?
            <>
              <CustomTextComponent style={{ ...styles.textButtom }}>
                MAPA
              </CustomTextComponent>
              <Icon name='map' style={{ ...styles.iconMap }}></Icon>
            </> :
            <CustomTextComponent style={{ ...styles.textButtom }}>
              <Icon name='close-outline' style={{ ...styles.iconMap }}></Icon>
            </CustomTextComponent>
        }
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
    flex: 1
  },
  iconMap: {
    fontSize: 25,
    color: '#fff'
  },
  buttonMap: {
    width: wp('23%'),
    height: hp('6%'),
    backgroundColor: colorsApp.blackLeather(0.90),
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    paddingHorizontal: wp('4')

  },
  textButtom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 2
  }
})