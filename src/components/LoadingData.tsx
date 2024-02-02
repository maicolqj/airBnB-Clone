import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { colorsApp } from '../styles/globalColors/GlobalColors'

const LoadingData = () => {
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    }}>
      <ActivityIndicator color={colorsApp.primary()} size='large' />
    </View>
  )
}

export default LoadingData
