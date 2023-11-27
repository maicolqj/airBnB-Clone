import { Image, SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react'
import { RootInitialStackParams } from '../../../routes/stackNavigation/InitialStackNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import CustomTextComponent from '../../../components/CustonTextComponent';
import { customStyles } from '../../../styles/globalComponentsStyles/GlobalComponentStyles';
import CustomStatusBarComponent from '../../../components/CustomStatusBarComponent';
import AppIntroSlider from 'react-native-app-intro-slider';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerComponent from '../../../components/DividerComponent';
import GeneralButtonComponent from '../../../components/GeneralButtonComponent';

interface Props extends StackScreenProps<RootInitialStackParams, 'DetailsScreen'> { }

const DetailsScreen = ({ navigation, route }: Props) => {

  const location = route.params.data;

  return (
    <SafeAreaView style={{ ...customStyles.safeArea, ...styles.container }}>
      
      <CustomStatusBarComponent colorBar='rgba(255, 255, 255, 0.01)' />

      <ScrollView style={{ ...customStyles.safeArea, marginBottom: hp('2% '), }} showsVerticalScrollIndicator={false}>
        <GeneralButtonComponent 
        icon='arrow-back'
        iconStyle={{...styles.iconStyle, }}
        navigation={() => navigation.pop()}
        style={{
          position: 'absolute',
          left: wp('5%'),
          top: hp('4%'),
          width: wp('9%'),
          zIndex: 999,
          backgroundColor: '#fff',
          borderRadius: 15
          }}/>
        
        <View style={{
          ...styles.sliderContainer,
        }}>
          <AppIntroSlider
            data={location.images}
            showSkipButton={false}
            showNextButton={false}
            showDoneButton={false}
            style={{backgroundColor: 'red'}}
            renderItem={({ item }) => (
              <View style={{ height: hp('50%'), }} key={item.url}>
                <Image
                  source={{ uri: item.url }}
                  style={{ width: '100%', height: '100%'}}
                // resizeMode='cover'
                />
              </View>
            )} />
        </View>


        <View style={{ paddingVertical: 4, width: '100%', paddingHorizontal: wp('5%'), marginTop: hp('2 %') }}>
          {/* NAME LOCATION AND RANKING */}
          <View style={{ paddingVertical: 4, justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', alignItems: 'center', }}>
            <CustomTextComponent style={{ ...styles.title }}>
              {location.title}
            </CustomTextComponent>

          </View>

          <CustomTextComponent style={{ fontSize: 20, fontWeight: '400', marginVertical: '1%' }}>
            {location.rel_ubicacion.address_component}
          </CustomTextComponent>
          <CustomTextComponent style={{ fontSize: 16, fontWeight: '400', marginVertical: '1%' }}>
            {location.rel_ubicacion.address}
          </CustomTextComponent>

        </View>
        <DividerComponent />


        <View style={{ ...styles.boxCards }}>
          <Image source={require('../../../assets/system/locations/1.jpg')}
            style={{ ...styles.picturePerson, marginHorizontal: wp('2%') }} resizeMode='contain' />
          <View style={{ marginHorizontal: wp('3%') }}>
            <View style={{ ...styles.rows }}>
              <CustomTextComponent style={{ ...styles.textSubTitle }}>
                Anfitrion:
              </CustomTextComponent>
              <CustomTextComponent>
                Nombre del Anfitrion
              </CustomTextComponent>
            </View>
            <CustomTextComponent>
              4 años de experiencia
            </CustomTextComponent>
          </View>
        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards }}>
          <View style={{ ...styles.rows }}>
            <Icon name='gift' style={{ ...styles.iconStyle, marginHorizontal: wp('4%') }}></Icon>
            <View style={{ marginHorizontal: wp('3%') }}>
              <CustomTextComponent style={{ ...styles.textSubTitle }}>
                Disfruta del Jacuzzi
              </CustomTextComponent>
              <CustomTextComponent style={{ fontSize: 12, }}>
                Esté es el unico lugar cerca con esté servicio.
              </CustomTextComponent>
            </View>
          </View>
        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards }}>
          <CustomTextComponent style={{ fontSize: 16, fontWeight: '400', marginVertical: '1%' }} aria-valuemax={2}>
            {location.description}
          </CustomTextComponent>
        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomTextComponent style={{ ...styles.title, fontSize: 22 }}>
            Dónde vas a dormir
          </CustomTextComponent>
        </View>

        <View>
          <View style={{ height: hp('20%'), borderRadius: 25 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                location.images.map((item, id) => (
                  <TouchableOpacity style={{ ...styles.cardSlipingscities }} key={id} activeOpacity={0.8}>
                    <Image source={{ uri: item.url }}
                      style={{ width: '100%', height: '100%', borderRadius: 25 }}
                    // resizeMode='center'
                    ></Image>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>

        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomTextComponent style={{ ...styles.title, fontSize: 22 }}>
            Lo que ofrece esté lugar
          </CustomTextComponent>
        </View>

        <View style={{ paddingHorizontal: wp('10%'), marginBottom: hp('3%') }}>
          <View style={{ ...styles.rows }}>
            <Icon name='gift' style={{ ...styles.iconStyle }}></Icon>
            <CustomTextComponent style={{ ...styles.morePlus }} >
              Jacuzzi privado
            </CustomTextComponent>
          </View>
          <View style={{ ...styles.rows }}>
            <Icon name='car' style={{ ...styles.iconStyle }}></Icon>
            <CustomTextComponent style={{ ...styles.morePlus }} >
              Parqueadero privado
            </CustomTextComponent>
          </View>
          <View style={{ ...styles.rows }}>
            <Icon name='pizza' style={{ ...styles.iconStyle }}></Icon>
            <CustomTextComponent style={{ ...styles.morePlus }} >
              Alimentación
            </CustomTextComponent>
          </View>
        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomTextComponent style={{ ...styles.title, fontSize: 22 }}>
            Donde vas a estar
          </CustomTextComponent>
        </View>
        <View style={{ ...styles.boxMap }}>
          <CustomTextComponent>
            Aqui va la ubicacion
          </CustomTextComponent>
        </View>
        <DividerComponent />

        <TouchableOpacity style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomTextComponent style={{ ...styles.title, fontSize: 22 }}>
            Disponibilidad
          </CustomTextComponent>
          <Icon name='arrow-right' style={{ ...styles.iconStyle }}></Icon>
        </TouchableOpacity>

        <DividerComponent />

        <TouchableOpacity style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), justifyContent: 'space-between' }}>
          <View style={{width: wp('70%')}}>
            <CustomTextComponent style={{ ...styles.title, fontSize: 22 }}>
              Politicas de cancelación
            </CustomTextComponent>
            <CustomTextComponent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga a quisquam consequatur aliquid facilis molestias saepe veniam excepturi ipsa? Doloremque adipisci, temporibus consequatur quas iure labore officia optio quaerat ipsum.
            </CustomTextComponent>

          </View>
          <Icon name='arrow-right' style={{ ...styles.iconStyle }}></Icon>
        </TouchableOpacity>

        <DividerComponent />


        <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomTextComponent style={{ ...styles.title, fontSize: 22 }}>
            Reglas de la casa
          </CustomTextComponent>
        </View>

        <View style={{ paddingHorizontal: wp('10%'), marginBottom: hp('3%') }}>
          <View style={{ ...styles.rows }}>
            <CustomTextComponent style={{ ...styles.morePlus }} >
              Llegar despues de las 15:00
            </CustomTextComponent>
          </View>
          <View style={{ ...styles.rows }}>
            <CustomTextComponent style={{ ...styles.morePlus }} >
              Máximo 6 huéspedes
            </CustomTextComponent>
          </View>
          <View style={{ ...styles.rows }}>
            <CustomTextComponent style={{ ...styles.morePlus }} >
              No mascotas
            </CustomTextComponent>
          </View>
        </View>

        <DividerComponent />

        <TouchableOpacity style={{ flexDirection: 'row', width: wp('90%'), height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name='flag' style={{...styles.iconStyle}}></Icon>
          <CustomTextComponent style={{color: colorsApp.primary()}}>
            Denunciar publicación
          </CustomTextComponent>
        </TouchableOpacity>

        <View style={{ marginBottom: hp('10%') }} />
      </ScrollView>

      <View style={{ position: 'absolute', bottom: -40, width: wp('100%'), height: hp('8%'), backgroundColor: colorsApp.info(0.10), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: wp('10%') }}>
        <CustomTextComponent style={{ fontSize: 23, fontWeight: '400', marginVertical: '1%', }}>
          $ {location.price.base}
        </CustomTextComponent>
        <TouchableOpacity style={{ width: '60%', height: '90%', borderRadius: 15, backgroundColor: colorsApp.danger(), justifyContent: 'center', alignItems: 'center' }}>
          <CustomTextComponent style={{ color: '#fff', fontSize: 20 }}>

            Reservar
          </CustomTextComponent>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  textSubTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  morePlus: {
    marginHorizontal: wp('3%')
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    flex: 1,
    fontWeight: '600'
  },
  boxMap: {
    width: wp('90%'),
    height: hp('30%'),
    borderWidth: 1,
    borderColor: colorsApp.blackLeather(0.15),
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: colorsApp.info(0.62),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('5%')
  },
  cardSlipingscities: {
    width: wp('35%'),
    height: '100%',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%')
  },
  boxCards: {
    marginVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center'
  },
  slider: {
    width: '100%',
    // height: '10%',
    borderRadius: 20,
    backgroundColor: colorsApp.info(0.3),
  },
  sliderContainer: {
    width: '100%',
    // height: '18%',
  },
  container: {
    // paddingHorizontal: wp('1%'),
    // marginTop: hp('5%'),
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: hp('5%'),
  },
  iconStyle: {
    color: colorsApp.blackLeather(),
    fontSize: 35,
  },
  picturePerson: {
    width: 50,
    height: 50,
    borderRadius: 25,

  }
})