import React, { useState } from "react";
import Modal from "react-native-modal";
import CustomText from "./CustomText";
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonic from 'react-native-vector-icons/Ionicons';


interface MyProps {
    placeholder?:boolean
    options:any[]
    keyObject?:any
    labelObject?:any 
    onChange:Function
    value:any
}
const CustomSelect = ({keyObject='id', labelObject='name', placeholder,options, value, onChange, }:MyProps) => {
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
            <TouchableOpacity 
                onPress={() => setShowSelect(!showSelect)}
                style={styles.inputSelect}
            >
                {
                    value ? 
                        <CustomText>{value[labelObject]}</CustomText>
                    :
                    <CustomText style={styles.placeholder}>{placeholder ?? 'Seleccione una opción'}</CustomText>

                }
                <Icon name={showSelect ? 'chevron-up' : 'chevron-down'} color={'#8d8d8d'} style={{ fontSize:hp(2.5) }}/>
            </TouchableOpacity>
            <Modal
                isVisible={showSelect} 
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => setShowSelect(false)}
            >
                <View style={styles.continerModal}>
                    <ScrollView>
                        {
                            options.map((option,key) => (
                                <TouchableOpacity 
                                    style={[styles.containerOption, isSelected(option) && styles.optionSelect]} key={key}
                                    onPress={() => handlerPressOption(option)}
                                >
                                    <CustomText>{option[labelObject]}</CustomText>
                                    <IconIonic 
                                        name={isSelected(option) ? 'radio-button-on-outline' : 'radio-button-off-outline'} 
                                        color={isSelected(option) ? colorsApp.primary(1) : '#8d8d8d'}
                                        style={{ fontSize:hp(3) }}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}
export default CustomSelect

const styles = StyleSheet.create({
    inputSelect:{
        flex: 1,
        fontSize: hp(1.8),
        color: 'black',
        padding: hp(1.5),
        width:'100%',
        backgroundColor:colorsApp.light(0.2),
        borderRadius: hp(1),
        // marginVertical: 10,
        paddingHorizontal: hp(1.2),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    placeholder:{
        color:"#8d8d8d",
    },
    continerModal:{
        height:'50%', 
        padding:20, 
        borderTopLeftRadius:30, 
        borderTopRightRadius:30, 
        backgroundColor:'white'
    },
    containerOption:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:hp(1.5),
        paddingHorizontal:hp(1.5)
    },
    optionSelect:{
        // backgroundColor:colorsApp.primary(1),
        borderRadius:hp(1.2)
    }
})