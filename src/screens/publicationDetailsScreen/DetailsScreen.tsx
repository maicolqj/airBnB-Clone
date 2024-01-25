import { Image, SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Pressable } from 'react-native';
import React, { useContext, useEffect } from 'react'
import { RootInitialStackParams } from '../../routes/stackNavigation/InitialStackNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import CustomText from '../../components/Generals/CustomText';
import { customStyles } from '../../styles/globalComponentsStyles/GlobalComponentStyles';
import CustomStatusBarComponent from '../../components/CustomStatusBarComponent';
import AppIntroSlider from 'react-native-app-intro-slider';
import { colorsApp } from '../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerComponent from '../../components/DividerComponent';
import GeneralButtonComponent from '../../components/GeneralButtonComponent';
import { formatCurrency, shortFormatDate } from '../../helpers/formats';
import { PublicationsContext } from '../../context/PublicationContext';
import RangeReserve from '../../components/DetailScreen/RangeReserve';

interface Props extends StackScreenProps<RootInitialStackParams, 'DetailsScreen'> { }

const DetailsScreen = ({ navigation, route }: Props) => {
  const {
    publicationSelected,
    setPublicationSelected,
    loadPublicationsBySlug, 
    getVisibleInSubtitle,
    setShowRangeReserve,
    priceRangeSelected,
    selectedStartDate,
    selectedEndDate
  } = useContext(PublicationsContext)
  const location = route.params.data;


  useEffect(()=>{
    // (async () => {
      setPublicationSelected(location)
      loadPublicationsBySlug(location.slug)
    //   setInitalDates()
    // })()
  },[location])
  
  return (
    <SafeAreaView style={{ ...customStyles.safeArea, ...styles.container }}>
        
      {/* <CustomStatusBarComponent colorBar='rgba(255, 255, 255, 0.01)' /> */}
      <ScrollView style={{  marginBottom: hp('2% '), }} showsVerticalScrollIndicator={false}>
        <GeneralButtonComponent 
          icon='chevron-back'
          iconStyle={{...styles.iconStyle, }}
          navigation={() => navigation.pop()}
          style={{
            position: 'absolute',
            left: wp('5%'),
            top: hp('4%'),
            width: wp('7%'),
            height: wp('7%'),
            zIndex: 999,
            backgroundColor: '#fff',
            borderRadius: wp('50%'),
            alignItems:'center',
            justifyContent:'center'
          }}
        />


        <View style={{...styles.sliderContainer}}>
          {
            publicationSelected?.images &&
            <AppIntroSlider
              data={publicationSelected.images}
              showSkipButton={false}
              showNextButton={false}
              showDoneButton={false}
              style={{padding: 0, margin:0}}
              renderItem={({ item }) => (
                <View style={{ height: hp('33%'), }} key={item.url}>
                  <Image
                    source={{ uri: item.url }}
                    style={{ width: '100%', height: '100%'}}
                  // resizeMode='cover'
                  />
                </View>
              )} />
          }
        </View>   

        


        <View style={{ paddingVertical: 4, width: '100%', paddingHorizontal: wp('5%'), marginTop: hp('2%') }}>
          {/* NAME LOCATION AND RANKING */}
          <View style={{ paddingVertical: 4, justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', alignItems: 'center', }}>
            <CustomText style={{ ...styles.title }}>{publicationSelected?.title}</CustomText>
          </View>
          <View>
            <CustomText style={{fontSize:hp(1.7), color:colorsApp.light()}}>{getVisibleInSubtitle()}</CustomText>
          </View>
        </View>
        <DividerComponent />


        <View style={{ ...styles.boxCards }}>
          <Image source={{uri:publicationSelected?.user?.image}}
            style={{ ...styles.picturePerson, marginHorizontal: wp('2%') }} resizeMode='contain' />
          <View style={{ marginHorizontal: wp('3%') }}>
            <View style={{ ...styles.rows }}>
              <CustomText style={{ ...styles.textSubTitle }}>
                Anfitrion:
              </CustomText>
              <CustomText> {publicationSelected?.user?.name}</CustomText>
            </View>
          </View>
        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards }}>
          <View style={{ ...styles.rows }}>
            <Icon name='gift' style={{ ...styles.iconStyle, marginHorizontal: wp('4%') }}></Icon>
            <View style={{ marginHorizontal: wp('3%') }}>
              <CustomText style={{ ...styles.textSubTitle }}>
                Disfruta del Jacuzzi
              </CustomText>
              <CustomText style={{ fontSize: 12, }}>
                Esté es el unico lugar cerca con esté servicio.
              </CustomText>
            </View>
          </View>
        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards }}>
          <CustomText style={{ fontSize: 16, fontWeight: '400', marginVertical: '1%' }} aria-valuemax={2}>
            {publicationSelected?.description}
          </CustomText>
        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomText style={{ ...styles.title, fontSize: 22 }}>
            Dónde vas a dormir
          </CustomText>
        </View>

        <View>
          <View style={{ height: hp('20%'), borderRadius: 25 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                publicationSelected?.images.map((item, id) => (
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
          <CustomText style={{ ...styles.title, fontSize: 22 }}>
            Lo que ofrece esté lugar
          </CustomText>
        </View>

        <View style={{ paddingHorizontal: wp('10%'), marginBottom: hp('3%') }}>
          <View style={{ ...styles.rows }}>
            <Icon name='gift' style={{ ...styles.iconStyle }}></Icon>
            <CustomText style={{ ...styles.morePlus }} >
              Jacuzzi privado
            </CustomText>
          </View>
          <View style={{ ...styles.rows }}>
            <Icon name='car' style={{ ...styles.iconStyle }}></Icon>
            <CustomText style={{ ...styles.morePlus }} >
              Parqueadero privado
            </CustomText>
          </View>
          <View style={{ ...styles.rows }}>
            <Icon name='pizza' style={{ ...styles.iconStyle }}></Icon>
            <CustomText style={{ ...styles.morePlus }} >
              Alimentación
            </CustomText>
          </View>
        </View>

        <DividerComponent />

        <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomText style={{ ...styles.title, fontSize: 22 }}>
            Donde vas a estar
          </CustomText>
        </View>
        <View style={{ ...styles.boxMap }}>
          <CustomText>
            Aqui va la ubicacion
          </CustomText>
        </View>
        <DividerComponent />

        <TouchableOpacity style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomText style={{ ...styles.title, fontSize: 22 }}>
            Disponibilidad
          </CustomText>
          <Icon name='chevron-right' style={{ ...styles.iconStyle }}></Icon>
        </TouchableOpacity>

        <DividerComponent />

        <TouchableOpacity style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), justifyContent: 'space-between' }}>
          <View style={{width: wp('70%')}}>
            <CustomText style={{ ...styles.title, fontSize: 22 }}>
              Politicas de cancelación
            </CustomText>
            <CustomText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga a quisquam consequatur aliquid facilis molestias saepe veniam excepturi ipsa? Doloremque adipisci, temporibus consequatur quas iure labore officia optio quaerat ipsum.
            </CustomText>

          </View>
          <Icon name='chevron-right' style={{ ...styles.iconStyle }}></Icon>
        </TouchableOpacity>

        <DividerComponent />


        <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
          <CustomText style={{ ...styles.title, fontSize: 22 }}>
            Reglas de la casa
          </CustomText>
        </View>

        <View style={{ paddingHorizontal: wp('3%'), marginBottom: hp('3%') }}>
          <View style={{ ...styles.rows }}>
            <CustomText style={{ ...styles.morePlus }} >
              Llegar despues de las 15:00
            </CustomText>
          </View>
          <View style={{ ...styles.rows }}>
            <CustomText style={{ ...styles.morePlus }} >
              Máximo 6 huéspedes
            </CustomText> 
          </View>
          <View style={{ ...styles.rows }}>
            <CustomText style={{ ...styles.morePlus }} >
              No mascotas
            </CustomText>
          </View>
        </View>

        <DividerComponent />

        <TouchableOpacity style={{ flexDirection: 'row', width: wp('90%'), height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name='flag' style={{...styles.iconStyle}}></Icon>
          <CustomText style={{color: colorsApp.primary()}}>
            Denunciar publicación
          </CustomText>
        </TouchableOpacity>

        <View style={{ marginBottom: hp('10%') }} />
      </ScrollView>

  

      <View style={{ ...styles.boxButtomReserv }}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{paddingHorizontal: wp('2')}}>
            <Pressable onPress={() => {setShowRangeReserve(true)}}>
              <CustomText style={{...styles.priceFormater }}>
                {formatCurrency(publicationSelected?.price.base ?? 0)}
                <CustomText style={{fontSize:hp(1.7), fontWeight:'normal'}}> noche</CustomText>
              </CustomText>
              <CustomText style={{fontSize:hp(1.5), fontWeight:'bold', textDecorationLine:'underline'}}>
                { shortFormatDate(selectedStartDate) } - {shortFormatDate(selectedEndDate)}
              </CustomText>
            </Pressable>

          </View>
          <TouchableOpacity 
            style={{ ...styles.buttomReserv }}
            onPress={() => navigation.navigate('ConfirmAndPay')}
          >
            <CustomText style={{ color: '#fff', fontSize: hp(1.8), fontWeight:"bold" }}>
              Reservar
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <RangeReserve/>
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
  priceFormater: {
    fontSize: hp(2),
    fontWeight: 'bold',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttomReserv: {
    width: '40%',
    height: '90%',
    borderRadius: hp(1),
    backgroundColor: colorsApp.primary(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: hp(2),
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
  boxButtomReserv: {
    position: 'absolute',
    bottom: -hp(5),
    width: wp('100%'),
    height: hp('12%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    // flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    paddingBottom:hp(2.5),
    borderTopColor:"black",
    borderTopWidth:hp(0.05)
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
  },
  container: {
    // paddingHorizontal: wp('1%'),
    // marginTop: hp('5%'),
    // width: '100%',
    // backgroundColor: '#fff',
    marginBottom: hp('5%'),
  },
  iconStyle: {
    color: colorsApp.blackLeather(),
    fontSize: hp(2.5),
  },
  picturePerson: {
    width: 50,
    height: 50,
    borderRadius: 25,

  }
})