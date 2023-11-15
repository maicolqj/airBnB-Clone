import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'react-native';
import { colorsApp } from '../styles/globalColors/GlobalColors';
import GeneralButtonComponent from './GeneralButtonComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  navigation: any
}

const CardSitesComponents = ({navigation}: Props) => {
  return (
    <View style={{...styles.container}}>
      {/* <Image source={{uri:  }}/> */}
      <TouchableOpacity style={{...styles.buttomContainer}} onPress={navigation}>
        <Icon name='heart-outline' style={{...styles.iconStyle}}></Icon>
      </TouchableOpacity>
    </View>
  )
}

export default CardSitesComponents

const styles = StyleSheet.create({
  buttomContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: hp('3%'),
    right: wp('5%'),
    padding: 2
  },
  container: {
    width: '100%',
    height: hp('45%'),
    backgroundColor: colorsApp.info(0.3),
    borderRadius: 20
  },
  iconStyle: {
    color: 'red',
    fontSize: 35
  }
})