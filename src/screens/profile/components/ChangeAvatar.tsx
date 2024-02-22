import React, { useContext } from "react";
import { StyleSheet, View, Platform, Pressable } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { capitalizeFirstLetter } from "../../../helpers/formats";
import { ProfileContext } from "../../../context/ProfileContext";
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from "@rneui/themed";

const ChangeImage = ()=> {
    const {profile} = useContext(ProfileContext)
    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                {
                    profile?.image ?
                        <Image source={{ uri:profile?.image }}  style={styles.profileImage}/>
                    : 
                    <CustomText  style={styles.textLetter}>{capitalizeFirstLetter(profile?.name ?? '')}</CustomText>
                }
            </View>
            <Pressable style={styles.editButton}>
                <Icon name='camera' style={{ fontSize:hp(2.5),marginRight:hp(1) }}></Icon>
                <CustomText >Editar</CustomText>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        marginVertical:hp(2)
    },
    containerImage:{
        backgroundColor:colorsApp.blackLeather(),
        width:hp(20),
        height:hp(20),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:wp('50%')
    },
    profileImage: {
        width:hp(20),
        height:hp(20),
        borderRadius:wp('50%'), // Hace que la imagen sea circular
    },
    textLetter:{
        color:'white', 
        fontSize:hp(5),
        fontWeight:'bold'
    },
    editButton: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        position: 'absolute',
        bottom: hp(-1), // Ajusta la posición según tus necesidades
        backgroundColor: 'white',
        paddingVertical: hp(0.7),
        paddingHorizontal: hp(1),
        borderRadius: hp(2),
        ...Platform.select({
            ios: {
                shadowColor: colorsApp.light(),
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
})
export default ChangeImage