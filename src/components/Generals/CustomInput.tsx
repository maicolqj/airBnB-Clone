import React, { ReactNode } from "react";
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorsApp } from "../../styles/globalColors/GlobalColors";


interface MyTextInputProps extends TextInputProps {
    style?: ViewStyle
    iconName?:string
}

const CustomInput = ({iconName,style, ...restProps}:MyTextInputProps)=>{
    return (
            <TextInput style={styles.input}  {...restProps}  placeholderTextColor='#8d8d8d'/>
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
        backgroundColor:colorsApp.light(0.2),
        borderRadius: hp(1),
        // marginVertical: 10,
        paddingHorizontal: hp(1.2),
    
    },
})