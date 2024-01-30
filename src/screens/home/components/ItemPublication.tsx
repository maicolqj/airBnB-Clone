import { StyleSheet, View, TouchableOpacity, Dimensions, Alert, Pressable } from 'react-native';
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'react-native';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import CustomText from '../../../components/generals/CustomText';
import { Publication } from '../../../interfaces/GlobalInterfaces';
import { formatCurrency, shortText } from '../../../helpers/formats';

interface Props {
  navigation: any
  publication: Publication
}

const ItemPublication = ({ navigation, publication }: Props) => {

  return (
    <View style={{ ...styles.container }} >
      <Pressable style={{ ...styles.buttomContainer }} onPress={() => navigation.navigate('Favorites')}>
        <Icon name='heart-outline' style={{ ...styles.iconStyle }}></Icon>
      </Pressable>
      <View style={{
        ...styles.sliderContainer
      }}>
        <AppIntroSlider
          data={publication.images}
          showSkipButton={false}
          showNextButton={false}
          showDoneButton={false}
         
          renderItem={({ item }) => (
            <Pressable 
              style={{ height: '100%', }} 
              key={item.url}
              onPress={() => navigation.navigate('DetailsScreen', {publication: publication})}
            >
              <Image
                source={{ uri: item.url }}
                style={{ 
                  width:'100%',
                  height: hp('30%'),
                  borderRadius: 10, 
                }}
                // resizeMode='center'
              />
            </Pressable>
          )} />
      </View>

      <Pressable 
        style={{ ...styles.dataContainer }}
        onPress={() => navigation.navigate('DetailsScreen', {publication: publication})}
      >

        {/* NAME LOCATION AND RANKING */}
        <View style={{ paddingVertical: 4, justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <CustomText style={{ fontSize: hp(2), flex: 1, fontWeight: 'bold' }}>{shortText(publication.title,25)}</CustomText>
          {
            publication?.qualification &&
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText>
                  <Icon name='star' style={{  fontSize: hp(2) }}></Icon>
                </CustomText>
                <CustomText >{publication?.qualification}</CustomText>
              </View>
          }
          
        </View>
        {/* LOCATION  */}
        <CustomText style={{ fontSize: 16, fontWeight: '400', marginVertical: '1%' }}>
          {shortText(publication.rel_ubicacion?.address_component,37)}
        </CustomText>
        <CustomText style={{ fontSize: hp(2), fontWeight: 'bold', marginVertical: '1%', color:colorsApp.primary()}}>
          {formatCurrency(publication.price?.base) } <CustomText style={{fontWeight: 'normal', color:colorsApp.primary()}}>noche</CustomText> 
        </CustomText>
      </Pressable>
    </View>
  )
}

export default ItemPublication

const styles = StyleSheet.create({
  buttomContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    position: 'absolute',
    top: hp('1.5%'),
    right: wp('3%'),
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: hp('40%'),
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: hp('3%'),
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41,
    // elevation: 2,
  },
  dataContainer: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%')
  },
  iconStyle: {
    color: 'white',
    fontSize: hp(3.5),
  },
  slider: {
    width: '100%',
    height: hp('45%'),
    borderRadius: 20,
    backgroundColor: colorsApp.info(),
  },
  sliderContainer: {
    width: '100%',
    height: '67%',
  }

})

