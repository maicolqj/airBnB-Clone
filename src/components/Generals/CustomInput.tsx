import React from "react";
import {  StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorsApp } from "../../styles/globalColors/GlobalColors";


interface MyTextInputProps extends TextInputProps {
    style?: TextStyle
    iconName?:string
}

const CustomInput = ({iconName,style, ...restProps}:MyTextInputProps)=>{
    return (
            <TextInput style={{...styles.input, ...style}} placeholderTextColor='#8d8d8d' {...restProps} />
    )
}
export default CustomInput

const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: hp(1.8),
        color: 'black',
        padding: hp(1.5),
        width:'100%',
        backgroundColor:colorsApp.light(0.1),
        borderRadius: hp(1),
        // marginVertical: 10,
        paddingHorizontal: hp(1.2),
    
    },
})