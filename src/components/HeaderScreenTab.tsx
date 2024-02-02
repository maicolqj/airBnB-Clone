import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { colorsApp } from '../styles/globalColors/GlobalColors'
import CustomText from './generals/CustomText'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'

interface MyProps {
  title:string
}
const HeaderScreenTab = ({title}:MyProps) => {
  return (
    <View style={styles.constainerText}>
        <CustomText style={styles.title}>{title}</CustomText>
    </View>
  )
}
const styles = StyleSheet.create({
  constainerText:{
      paddingLeft:hp(2),
      paddingVertical:hp(1.3),
      borderBottomWidth:wp(0.1),
      borderBottomColor:colorsApp.light(1)
  },
  title:{
      fontWeight:'500',
      fontSize:hp(3)
  }
})
export default HeaderScreenTab
