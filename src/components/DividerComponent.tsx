import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorsApp } from '../styles/globalColors/GlobalColors'

const DividerComponent = () => {
  return (
    <View style={{...styles.divider}}/>
  )
}

export default DividerComponent

const styles = StyleSheet.create({

    divider: {
        width: "90%",
        height: 1,
        alignSelf: 'center',
        backgroundColor: '#99a1b7'
    }
})