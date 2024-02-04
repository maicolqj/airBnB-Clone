import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Pressable } from "react-native";
import CustomText from "./generals/CustomText";
import { colorsApp } from "../styles/globalColors/GlobalColors";

interface Props {
    title: string
    onPressBack?: () => void
}

const CustomHeader = ({title, onPressBack}: Props) => {
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
                    style={{    
                        paddingEnd:hp(12)
                    }}
                >
                    <Icon name={'chevron-back'} style={{fontSize:hp(3)}}></Icon>
                </Pressable>

            }
            <CustomText style={{fontWeight:'500'}}>{title}</CustomText>
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