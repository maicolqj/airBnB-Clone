import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Pressable } from "react-native";
import { colorsApp } from "../styles/globalColors/GlobalColors";

interface Props {
    children: ReactNode
    onPressBack?: () => void
}

const CustomHeader = ({children, onPressBack}: Props) => {
    return (
        <View style={{
                ...styles.header,
                justifyContent: onPressBack ? 'flex-start' : 'center'
            }}
        >
            {
                onPressBack &&
                <Pressable
                    onPress={() => onPressBack() }
                    style={{ paddingEnd:hp(2) }}
                >
                    <Icon name={'chevron-back'} style={{fontSize:hp(2.5)}}></Icon>
                </Pressable>

            }
            {children}
        </View>
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