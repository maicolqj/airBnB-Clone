import { Platform, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'


interface Props {
  isOn: boolean,
  onChange: (value: boolean) => void

}

const CustomSwitch = ({ isOn, onChange }: Props) => {

  const [isEnable, setisEnable] = useState(isOn)

  const toggleSwitch = () => {
    setisEnable(!isEnable);
    onChange(!isEnable)
  }

  return (
    <Switch
      trackColor={{ false: '#ccc', true: 'green' }}
      thumbColor={(Platform.OS === 'android') ? 'white' : ''}
      value={isEnable}
      onValueChange={toggleSwitch}
      
    />
  )
}

export default CustomSwitch

const styles = StyleSheet.create({})