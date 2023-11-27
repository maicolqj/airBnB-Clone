import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStatusBarComponent from '../../../components/CustomStatusBarComponent'
import GeneralButtonComponent from '../../../components/GeneralButtonComponent'
import { customStyles } from '../../../styles/globalComponentsStyles/GlobalComponentStyles';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import { StackScreenProps } from '@react-navigation/stack';
import { RootInitialStackParams } from '../../../routes/stackNavigation/InitialStackNavigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props extends StackScreenProps<RootInitialStackParams, 'SearchScreen'> { }
const SearchScreen = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={{ ...customStyles.safeArea,  }}>
      <CustomStatusBarComponent barStyle='dark-content' colorBar='#fff' />

      <GeneralButtonComponent
        icon='arrow-back'
        iconStyle={{ ...styles.iconStyle, backgroundColor: '#fff', borderRadius: 15 }}
        navigation={() => navigation.pop()} style={{
          position: 'absolute',
          left: wp('5%'),
          top: hp('5%'),
          zIndex: 999
        }} />

    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  iconStyle: {
    color: colorsApp.blackLeather(),
    fontSize: 35,
  },
})