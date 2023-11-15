import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardSitesComponents from '../../../components/CardSitesComponents';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootInitialStackParams } from '../../../routes/stackNavigation/InitialStackNavigation';
import { MaterialTopTabNavigationProp, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';


interface Props {
  navigation: StackNavigationProp<RootInitialStackParams, 'TopTabNavigation'>
}

const ApartmentScreen = ({navigation}: Props) => {
  return (
    <View style={{...styles.container, ...styles.container}}>
      <CardSitesComponents navigation={() => navigation.navigate('FavoritesSities')}/>
    </View>
  )
}

export default ApartmentScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
    flex: 1

  }
})