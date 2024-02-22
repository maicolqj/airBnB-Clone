import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { ProfileContext } from "../../../context/ProfileContext";
import { capitalizeFirstLetter, getFirstWord } from "../../../helpers/formats";

const SectionInfoPrincipal = () => {
    const {profile} = useContext(ProfileContext)

    return (
      
        <View style={styles.container}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                {/* Image */}
                <View style={styles.containerImage}>
                    {
                        profile?.image ?
                            <Image source={{ uri:profile?.image }}  style={styles.profileImage}/>
                        : 
                            <CustomText  style={styles.textLetter}>{capitalizeFirstLetter(profile?.name ?? '')}</CustomText>
                    }
                </View>
                <CustomText style={styles.textName}>{getFirstWord(profile?.name ?? '')}</CustomText>
                <CustomText style={{fontSize:hp(1.5)}}>Huesped</CustomText>
            </View>

            <View>
                <CustomText style={styles.textName}>{profile?.reviews ?? 0}</CustomText>
                <CustomText style={{fontSize:hp(1.5)}}>Evaluación</CustomText>

                {/* Division */}
                <View style={styles.divider}></View>

                <CustomText style={styles.textName}>{profile?.age_in_pltform ?? 0}</CustomText>
                <CustomText style={{fontSize:hp(1.5)}}>Años en Alquilap</CustomText>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',
        width:'85%',
        marginVertical:hp(2),
        paddingHorizontal:hp(2),
        paddingVertical:hp(3),
        borderRadius:hp(2),
    
        shadowColor: colorsApp.light(),
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation:3
    },
    containerImage:{
        backgroundColor:colorsApp.blackLeather(),
        width:hp(10),
        height:hp(10),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:wp('50%')
    },
    profileImage: {
        width:hp(10),
        height:hp(10),
        borderRadius:wp('50%'), // Hace que la imagen sea circular
    },
    textLetter:{
        color:'white', 
        fontSize:hp(3),
        fontWeight:'bold'
    },
    textName: {
        fontSize:hp(3),
        fontWeight:'bold'
    },
    divider:{
        marginVertical:hp(1),
        borderBottomWidth:hp(0.1),
        borderBottomColor:colorsApp.light(0.4)
    }
})
export default SectionInfoPrincipal