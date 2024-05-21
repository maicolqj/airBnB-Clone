import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Pressable } from "react-native";
import { colorsApp } from "../styles/globalColors/GlobalColors";

interface Props {
    IoniconsName?:string
    children: ReactNode
    onPressBack?: () => void
}

const CustomHeader = ({IoniconsName,children, onPressBack}: Props) => {
    return (
        <Pressable style={{
                ...styles.header,
                justifyContent: onPressBack ? 'flex-start' : 'center'
            }}
            onPress={() => onPressBack && onPressBack() }
        >
            {
                onPressBack &&
                <View
                   
                    style={{ paddingEnd:hp(0.5) }}
                >
                    <Icon name={IoniconsName ?? 'chevron-back'} style={{fontSize:hp(2.5)}}></Icon>
                </View>
            }
            {children}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:hp(2),
        paddingHorizontal:hp(2),
        borderBottomWidth:hp(0.02),
        borderBottomColor:colorsApp.light()
    }
})
export default CustomHeader