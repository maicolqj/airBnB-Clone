import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { colorsApp } from '../styles/globalColors/GlobalColors';



interface Props {
    navigation: () => void
    icon: string,
    style?: ViewStyle
    iconStyle?: TextStyle
}


const GeneralButtonComponent = ({ navigation, icon, style = {}, iconStyle = {}}: Props) => {
    
    return (
        <TouchableOpacity style={style} onPress={navigation} activeOpacity={0.7}>
            <Icon name={icon} style={ iconStyle }></Icon>
        </TouchableOpacity>
    )
}

export default GeneralButtonComponent

const styles = StyleSheet.create({
    ChevronBackContainer: {
        position: 'absolute',
        top: '5%',
        left: 10,
        paddingVertical: 1,
        paddingHorizontal: 4,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05 )',
        zIndex: 9999
    },
    ChevronBack: {
        fontSize: 40,
        color: colorsApp.blackLeather(),
        fontWeight: 'bold',
    },
})