import React, { useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import HeaderScreenTab from "../../components/HeaderScreenTab";
import SectionInfoPrincipal from "./components/SectionInfoPrincipal";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import SectionConfirmedInformation from "./components/SectionConfirmedInformation";
import { ProfileContext } from "../../context/ProfileContext";
import SectionValidateIdentity from "./components/SectionValidateIdentity";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
    const {getProfile} = useContext(ProfileContext)
    const {logout} = useContext(AuthContext)
    useEffect(()=>{
        getProfile()
    },[])
    return (
        <SafeAreaView style={customStyles.safeArea}>
            <ScrollView style={styles.container}>

                <View style={{alignItems:'center'}}>
                    {/* Seccion donde esta la imagen */}
                    <SectionInfoPrincipal/>

                    {/* Boton par editar o crear perfil */}
                    <TouchableOpacity style={styles.btns}>
                        <CustomText style={styles.textBtn}>Editar perfil</CustomText>
                    </TouchableOpacity>

                </View>
                {/* Información confirmada */}
                <SectionConfirmedInformation/>

                {/* Información  de validacion de identidad */}
                <SectionValidateIdentity/>

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
        textDecorationLine:'underline'
        
    }
})
export default Profile