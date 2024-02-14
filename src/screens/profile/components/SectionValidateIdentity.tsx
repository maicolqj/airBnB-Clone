import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { ProfileContext } from "../../../context/ProfileContext";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";

const SectionValidateIdentity = () => {
    const {profile} = useContext(ProfileContext)
    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Verificación de identidad</CustomText>
            <CustomText style={styles.text}>Antes de reservar en Alquilapp, tienes que completar este paso.</CustomText>

            <TouchableOpacity style={styles.btns}>
                <CustomText style={styles.textBtn}>Verifica tu identidad</CustomText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal:hp(3.5),
        marginVertical:hp(2.3),
        paddingBottom:hp(1.5),
        borderBottomWidth:hp(0.1),
        borderBottomColor:colorsApp.light(0.3)
    },
    title:{
        fontWeight:'600',
        fontSize:hp(2.2)
    },
    text:{
        paddingTop:hp(1),
        fontSize:hp(1.8)
    },
    btns:{
        width:'60%',
        marginTop:hp(1.4),
        alignItems:'center',
        paddingVertical:hp(1.2),
        borderWidth:hp(0.1),
        borderRadius:hp(1),
        borderColor:colorsApp.blackLeather(0.7)
    },
    textBtn:{
        fontWeight:'bold', 
        fontSize:hp(2), 
        color:colorsApp.blackLeather()
    }
})

export default SectionValidateIdentity