import { StyleSheet, Text, View } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface Props {
  modalUseState: boolean,
  setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
}

const MapComponent = ({ modalUseState, setModalUseState }: Props) => {



  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity 
      style={{ ...styles.buttomClose}} 
      activeOpacity={0.8}
      onPress={() => setModalUseState(false)}>
        <Icon name='close'  style={{...styles.iconClose}}></Icon>
      </TouchableOpacity>

      <Text>MapComponent</Text>
    </View>
  )
}

export default MapComponent

const styles = StyleSheet.create({
  buttomClose: {
    position: 'absolute',
    top: hp('1.5%'),
    right: wp('4%'),
    width: 35,
    height: 35,
    backgroundColor: colorsApp.blackLeather(0.25),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
      
  },
  iconClose: {
    fontSize: 25,
    color: colorsApp.blackLeather()
  }
})