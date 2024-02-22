import React, { useState } from "react";
import Modal from "react-native-modal";
import CustomText from "./CustomText";
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonic from 'react-native-vector-icons/Ionicons';


interface MyProps {
    options:any[]
    keyObject?:any
    labelObject?:any 
    onChange:Function
    value:Record<string, any>|undefined
}
const CustomRadio = ({keyObject='id', labelObject='name',options, value, onChange, }:MyProps) => {
    const [showSelect,setShowSelect] = useState(false)

    const isSelected = (option:any) => {
        if ((value && option[keyObject]) && option[keyObject] == value[keyObject]) {
            return true
        }
        return false
    }
    const handlerPressOption = (option:Object|undefined) => {
        onChange(option)
        setShowSelect(false)
    }
    return (
        <View>
             {
                options.map((option,key) => (
                    <TouchableOpacity 
                        style={[styles.containerOption, isSelected(option) && styles.optionSelect]} key={key}
                        onPress={() => handlerPressOption(option)}
                    >
                        <IconIonic 
                            name={isSelected(option) ? 'radio-button-on-outline' : 'radio-button-off-outline'} 
                            color={isSelected(option) ? colorsApp.primary(1) : '#8d8d8d'}
                            style={{ fontSize:hp(3), marginRight:hp(1) }}
                        />
                        <CustomText>{option[labelObject]}</CustomText>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}
export default CustomRadio

const styles = StyleSheet.create({
    containerOption:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingVertical:hp(0.4),
        alignItems:"center"
        // paddingHorizontal:hp(1.5)
    },
    optionSelect:{
        // backgroundColor:colorsApp.primary(1),
        borderRadius:hp(1.2)
    }
})