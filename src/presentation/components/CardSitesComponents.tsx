import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'react-native';
import { colorsApp } from '../styles/globalColors/GlobalColors';
import GeneralButtonComponent from './GeneralButtonComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import CustomTextComponent from './CustonTextComponent';

const { width: widthScreen, height: heightScreen } = Dimensions.get('screen');

interface Props {
  navigation: any
}


const slides = [
  {
    key: 'one',
    image: require('../assets/system/locations/1.jpg'),
  },
  {
    key: 'two',
    image: require('../assets/system/locations/2.jpg'),
  },
  {
    key: 'three',
    image: require('../assets/system/locations/3.jpg'),
  },
  {
    key: 'four',
    image: require('../assets/system/locations/4.jpg'),
  },
  {
    key: 'five',
    image: require('../assets/system/locations/5.jpg'),
  }
];

const CardSitesComponents = ({ navigation }: Props) => {
  return (
    <TouchableOpacity style={{ ...styles.container }} onPress={() => navigation.navigate('DetailsScreen')}>
      <TouchableOpacity style={{ ...styles.buttomContainer }} onPress={() => navigation.navigate('FavoritesSities')}>
        <Icon name='heart' style={{ ...styles.iconStyle }}></Icon>
      </TouchableOpacity>
      <View style={{
        ...styles.sliderContainer
      }}>
        <AppIntroSlider
          data={slides}
          showSkipButton={false}
          showNextButton={false}
          showDoneButton={false}
          renderItem={({ item }) => (
            <View style={{ height: '100%', }} key={item.key}>
              <Image
                source={item.image}
                style={{ width: '100%', height: hp('30%'), borderRadius: 25 }}
                resizeMode='center' />
            </View>
          )} />
      </View>

      <View style={{ ...styles.dataContainer }}>

        {/* NAME LOCATION AND RANKING */}
        <View style={{paddingVertical: 4, justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <CustomTextComponent style={{ fontSize: 20, flex: 1, fontWeight: '600' }}>
            Nombre del lugar
          </CustomTextComponent>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomTextComponent style={{ fontSize: 18 }}>
              4.2
            </CustomTextComponent>
            <CustomTextComponent style={{ fontSize: 24 }}>
              <Icon name='star' style={{ ...styles.iconStyle, fontSize: 20 }}></Icon>
            </CustomTextComponent>
          </View>
        </View>
        {/* LOCATION  */}
          <CustomTextComponent style={{fontSize: 16, fontWeight: '400', marginVertical: '1%' }}>
            Ubicación
          </CustomTextComponent>
          <CustomTextComponent style={{fontSize: 16, fontWeight: '400', marginVertical: '1%' }}>
            Disponibilidad
          </CustomTextComponent>
          <CustomTextComponent style={{fontSize: 16, fontWeight: '400', marginVertical: '1%' }}>
            Costo $
          </CustomTextComponent>
      </View>
    </TouchableOpacity>
  )
}

export default CardSitesComponents

const styles = StyleSheet.create({
  buttomContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    position: 'absolute',
    top: hp('2%'),
    right: wp('5%'),
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: hp('50%'),
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: hp('5%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dataContainer: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%')
  },
  iconStyle: {
    color: colorsApp.blackLeather(),
    fontSize: 35,
  },
  slider: {
    width: '100%',
    height: hp('45%'),
    borderRadius: 20,
    backgroundColor: colorsApp.info(0.3),
  },
  sliderContainer: {
    width: '100%',
    height: '60%',
  }

})

