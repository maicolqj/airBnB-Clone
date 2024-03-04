import { Image, SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Pressable, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { RootInitialStackParams } from '../../routes/stackNavigation/InitialStackNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import CustomText from '../../components/generals/CustomText';
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
import RangeReserve from './components/RangeReserve';
import FastImage from 'react-native-fast-image';
import LoadingData from '../../components/LoadingData';
import ImageView from "react-native-image-viewing";
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Share from 'react-native-share';
import { PATH_SERVER } from '../../../config';


const imageProfileDefault = require("../../assets/system/default/user_default.jpeg");
const imageItemDefault = require("../../assets/system/default/item_default.png");


interface Props extends StackScreenProps<RootInitialStackParams, 'DetailsScreen'> { }

const DetailsScreen = ({ navigation, route }: Props) => {
  const {
    publicationSelected,
    toggleFavorite,
    setPublicationSelected,
    loadPublicationsBySlug, 
    getVisibleInSubtitle,
    setShowRangeReserve,
    isLoadingPublicationSlug,
    selectedStartDate,
    selectedEndDate
  } = useContext(PublicationsContext)
  const location = route.params.publication;

  const [viewAllImage, setViewAllImage] = useState(false)

  const [region,setRegion] = useState<Region>({
    latitude: 4.7110,
    longitude: -74.0721,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  })

  useEffect(()=>{
    setPublicationSelected(location)
    loadPublicationsBySlug(location.slug)
  },[location])

  useEffect(()=>{
    setRegion({
      latitude: Number(publicationSelected?.location?.latitude ?? 0),
      longitude: Number(publicationSelected?.location?.longitude ?? 0),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    })
  },[publicationSelected])

  const iconName = () =>{
    return publicationSelected?.is_favorite ? 'heart' : 'heart-outline'
  }
  const iconColor = () =>{
    return publicationSelected?.is_favorite ? colorsApp.primary() : colorsApp.blackLeather()
  }

  const ArrayImageUri = ():Array<any> =>{
    return publicationSelected ? publicationSelected.images.map((item) => {return {uri:item.url}}) : []
  }

  const shareContent = async () => {
    try {
      const options = {
        title: publicationSelected?.title,
        url: publicationSelected?.share_url ?? `${PATH_SERVER}/publication-detail/${publicationSelected?.slug}`,
        message: 'Te comparto este anuncio que vi en Alquilapp',
      };
      await Share.open(options);
    } catch (error:any) {
      console.log('Error al compartir:', error?.message);
    }
  };
  
  return (
    <SafeAreaView style={[customStyles.safeArea, {paddingTop: !viewAllImage ? 0 : hp(10)}, !isLoadingPublicationSlug && styles.container]}>
      {
        isLoadingPublicationSlug ?
          <LoadingData/>
        :
        <>
          <CustomStatusBarComponent colorBar='rgba(255, 255, 255, 0.01)' />
          <ScrollView style={{  marginBottom: hp('2% ') }} showsVerticalScrollIndicator={false}>
            
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Pressable style={styles.continerIcon} onPress={() => navigation.pop()}>
                    <Icon name='chevron-left' style={[styles.iconStyle]} ></Icon>
                </Pressable>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable style={{...styles.continerIcon, marginRight:wp(1.5)}} onPress={() => shareContent()}>
                    <Icon name='share-variant-outline' style={[styles.iconStyle]} ></Icon>
                </Pressable>
                <Pressable style={styles.continerIcon} onPress={() => toggleFavorite(publicationSelected?.id ?? 0)}>
                    <Icon name={iconName()} style={{...styles.iconStyle,color:iconColor()}}></Icon>
                </Pressable>
              </View>
            </View>

    
            {/* Imagenes */}
            <View style={{width:'100%'}}>
              {
                publicationSelected?.images &&
                  <AppIntroSlider
                    data={publicationSelected.images}
                    showSkipButton={false}
                    showNextButton={false}
                    showDoneButton={false}
                    style={{padding: 0, margin:0}}
                    renderItem={({ item }) => (
                      <Pressable style={{ height: hp('33%'), }} key={item.url} onPress={() => setViewAllImage(true)}>
                        <FastImage
                          source={{ uri: item.url, priority:'normal' }}
                          style={{ width: '100%', height: '100%'}}
                        />
                      </Pressable>
                    )}
                  />
              }
            </View>   
    
            {/* NAME LOCATION AND RANKING */}
            <View style={{ paddingVertical: 4, width: '100%', paddingHorizontal: wp('5%'), marginTop: hp('2%') }}>
              <View style={{ paddingVertical: 4, justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', alignItems: 'center', }}>
                <CustomText style={{ ...styles.title }}>{publicationSelected?.title}</CustomText>
              </View>
              <View>
                <CustomText style={{fontSize:hp(1.7), color:colorsApp.light()}}>{getVisibleInSubtitle()}</CustomText>
              </View>
            </View>
            <DividerComponent />
    
            {/* Anfitrion */}
            <View style={styles.boxCards}>
              <FastImage 
                source={{uri:publicationSelected?.user?.image ,priority:'high'}}
                style={styles.picturePerson}  
                defaultSource={imageProfileDefault}
              />
              <View style={{ marginHorizontal: wp('3%') }}>
                <View style={{ ...styles.rows }}>
                  <CustomText style={{ ...styles.textSubTitle }}> Anfitrion:</CustomText>
                  <CustomText> {publicationSelected?.user?.name}</CustomText>
                </View>
              </View>
            </View>
    
            <DividerComponent />
            {/* Description publication */}
            <View style={{ ...styles.boxCards }}>
              <CustomText style={{ fontSize: 16, fontWeight: '400', marginVertical: '1%' }} aria-valuemax={2}>
                {publicationSelected?.description}
              </CustomText>
            </View>

            <DividerComponent />
            {/* Services  */}
            <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
              <CustomText style={{ ...styles.title }}>
                Lo que ofrece esté lugar
              </CustomText>
            </View>
    
            <View style={{ paddingHorizontal: wp('5%'), marginBottom: hp('3%') }}>
              {
                publicationSelected?.services.map((service,key) => (
                  <View style={{ ...styles.rows }} key={key}>
                    <FastImage
                      source={{ uri:service.icon, priority:'high' }}  
                      style={styles.imageService} 
                      defaultSource={imageItemDefault}
                    />
                    <CustomText style={{ ...styles.morePlus }} >{service.name} </CustomText>
                  </View>
                ))
              
              }
            </View>
    
            <DividerComponent />
            
            {/* Ubicación */}
            <View style={{ ...styles.boxCards, paddingHorizontal: wp('5%'), }}>
              <CustomText style={{ ...styles.title }}> Donde vas a estar</CustomText>
            </View>
            <MapView
                  provider={PROVIDER_GOOGLE} // Usa Google Maps
                  style={styles.boxMap}
                  onMapReady={() => console.log('Map ready')}
                  initialRegion={region}
                  zoomTapEnabled={true} //solo ios
                  zoomControlEnabled={true} // solo android
                  rotateEnabled={true}
                >
                  {
                    publicationSelected?.location?.show_exact_point_publication ?
                      <Marker
                        coordinate={{
                            latitude: Number(publicationSelected?.location?.latitude ?? 0), 
                            longitude: Number(publicationSelected?.location?.longitude ?? 0)
                          }}
                      />
                    :
                      <Circle
                        center={{
                            latitude: Number(publicationSelected?.location?.latitude ?? 0), 
                            longitude: Number(publicationSelected?.location?.longitude ?? 0)
                        }}
                        radius={publicationSelected?.location.ratio ?? 500}
                        strokeColor={colorsApp.light()}
                        fillColor={colorsApp.primary(0.4)}
                      />
                  }
            </MapView>
            
          </ScrollView>
          
          {/* Price and btn reserve */}
          <View style={{ ...styles.boxButtomReserv }}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{paddingHorizontal: wp('2')}}>
                <Pressable onPress={() => {setShowRangeReserve(true)}}>
                  <CustomText style={{...styles.priceFormater }}>
                    {formatCurrency(publicationSelected?.price?.base ?? 0)}
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

          {/* Selecte range reserve */}
          <RangeReserve/>
          {/* View All images */}
          { publicationSelected?.images && (
            <ImageView
              images={ArrayImageUri()}
              imageIndex={0}
              visible={viewAllImage}
              onRequestClose={() => setViewAllImage(false)}
              swipeToCloseEnabled={true}
              
            />
          )}
        </>

      }
    </SafeAreaView >
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  textSubTitle: {
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
    marginVertical:hp(0.2),
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
    fontSize: hp(2.5),
    flex: 1,
    fontWeight: '600'
  },
  boxMap: {
    width: wp('90%'),
    height: hp('35%'),
    borderWidth: 1,
    borderColor: colorsApp.blackLeather(0.15),
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: colorsApp.info(0.62),
    marginBottom: hp(10)
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
  boxCards: {
    marginVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginBottom: hp('5%'),
  },
  iconStyle: {
    color: colorsApp.blackLeather(),
    fontSize: hp(2.5),
  },
  picturePerson: {
    width: hp(6),
    height: hp(6),
    borderRadius: wp("50%"),
  },
  header:{
    position: 'absolute',
    left: wp('5%'),
    top: hp('4%'),
    width: wp('90%'),
    zIndex: 999,
    borderRadius: wp('50%'),
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  imageService:{
    width:hp(5),
    height:hp(5),
    borderRadius:wp('50%')
  },
  continerIcon:{
    backgroundColor:'white',
    padding:hp(0.7),
    borderRadius:50
  }
})