import { StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import { colorsApp } from '../styles/globalColors/GlobalColors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface MyProps extends ViewProps {}

const DividerComponent = ({style, ...restProps}:MyProps) => {
  return (
    <View 
      style={[styles.divider,style]}
      // {...restProps}
    />
  )
}

export default DividerComponent

const styles = StyleSheet.create({

    divider: {
        width: "90%",
        height: 1,
        alignSelf: 'center',
        backgroundColor: colorsApp.light(0.5)
    }
})