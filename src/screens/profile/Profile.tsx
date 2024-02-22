import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import SectionInfoPrincipal from "./components/SectionInfoPrincipal";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import SectionConfirmedInformation from "./components/SectionConfirmedInformation";
import { ProfileContext } from "../../context/ProfileContext";
import SectionValidateIdentity from "./components/SectionValidateIdentity";
import { AuthContext } from "../../context/AuthContext";
import ModalEditProfile from "./components/ModalEditProfile";
import { optionsProfile } from "../../helpers/data";
import { ItemInterestProfile, OptionProfile } from "../../interfaces/UserInterfaces";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFirstWord } from "../../helpers/formats";


const Profile = () => {
    const {profile, getProfile,getInterests,getAllInterestAndSport} = useContext(ProfileContext)
    const {logout} = useContext(AuthContext)

    const [showModalProfile, setShowModalProfile] = useState<boolean>(false)
    useEffect(()=>{
        getProfile()
        getInterests()
    },[])
    return (
        <SafeAreaView style={customStyles.safeArea}>
            <ScrollView style={styles.container}>

                <View style={{alignItems:'center'}}>
                    {/* Seccion donde esta la imagen */}
                    <SectionInfoPrincipal/>

                    {/* Boton par editar o crear perfil */}
                    <TouchableOpacity 
                        style={styles.btns}
                        onPress={()=>setShowModalProfile(true)}
                    >
                        <CustomText style={styles.textBtn}>Editar perfil</CustomText>
                    </TouchableOpacity>

                </View>
                {/* Información diligenciada del perfil */}
                <View style={{marginHorizontal:hp(3.5), marginTop:hp(1)}}>
                    {
                        optionsProfile.map((item:OptionProfile,key:number) => (
                            profile?.additional_information_user?.[item?.key] &&
                            <View
                                style={styles.containerInformationAdittional}
                                key={key}
                            >
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Icon name={item.icon} size={hp(2.5)} style={{marginRight:hp(1),color:colorsApp.blackLeather(0.8)}} />
                                    <CustomText>{item.placeholder} {profile?.additional_information_user?.[item?.key]}
                                    </CustomText>
                                </View>

                            </View>
                        ))
                    }
                    {
                        profile?.additional_information_user?.over_you &&
                        <CustomText style={{marginTop:hp(2)}}>{profile?.additional_information_user?.over_you}</CustomText>
                    }
                </View>

                {/* Información confirmada */}
                <SectionConfirmedInformation/>

                {/* Información  de validacion de identidad */}
                <SectionValidateIdentity/>

                {/* Interes y deportes */}
                <View style={{marginHorizontal:hp(3.5)}}>
                    <CustomText style={styles.title}>Pregúntale a {getFirstWord(profile?.name ?? '')} acerca de...</CustomText>

                    <View style={styles.containerWrap}>
                        {
                            getAllInterestAndSport().map((item:ItemInterestProfile,key:number) =>(
                                <View style={[styles.pills]}  key={key}>
                                    <CustomText>{item.name}</CustomText>
                                </View>
                            ))
                        }
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        marginHorizontal:hp(3.5),
                        marginVertical:hp(2.5)
                    }}
                    onPress={()=>logout()}
                >
                    <CustomText style={styles.textLogout}>Cerrar sesión</CustomText>
                </TouchableOpacity>

            </ScrollView>

            <ModalEditProfile
                showModal={showModalProfile}
                setShowModal={setShowModalProfile}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        // marginHorizontal:hp(2)
    },
    btns:{
        width:'85%',
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
    },
    textLogout:{
        fontSize:hp(2),
        fontWeight:'500',
        textDecorationLine:'underline'
        
    },
    containerInformationAdittional:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        marginVertical:hp(1),
        // paddingBottom:hp(2),
    },
    title:{
        fontWeight:'600',
        fontSize:hp(2.2)
    },
    containerWrap:{
        flexWrap:'wrap',
        marginVertical:hp(2),
        flexDirection:'row',
    },
    pills:{
        borderWidth:hp(0.1),
        borderColor:colorsApp.light(0.6),
        borderRadius:12,
        padding:hp(1),
        margin:hp(0.4)
    },
})
export default Profile