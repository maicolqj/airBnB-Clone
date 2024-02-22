import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../../../components/generals/CustomText";
import { getFirstWord } from "../../../../helpers/formats";
import { ProfileContext } from "../../../../context/ProfileContext";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { colorsApp } from "../../../../styles/globalColors/GlobalColors";

const SectionConfirmedInformation = () => {
    const {profile,isVerifiedIdentity} = useContext(ProfileContext)
    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Información confirmada de {getFirstWord(profile?.name ?? '')}</CustomText>

            <View style={styles.sectionCheck}>
                {
                    profile?.email ? <Icon name="check" size={hp(3)} style={styles.icon} /> : null
                }
                <CustomText style={styles.text}>Correo electrónico</CustomText>
            </View>

            <View style={styles.sectionCheck}>
                {
                    profile?.phone ? <Icon name="check" size={hp(3)} style={styles.icon} /> : null
                }
                <CustomText style={styles.text}>Número de teléfono</CustomText>
            </View>
            {isVerifiedIdentity() && (
                <View style={styles.sectionCheck}>
                    <Icon name="check" size={hp(3)} style={styles.icon} />
                    <CustomText style={styles.text}>Identidad verificada</CustomText>
                </View>
            )}
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
    sectionCheck:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:hp(1)
    },
    icon:{
        color:colorsApp.primary(),
        marginEnd:hp(1)
    },
    text:{
        fontSize:hp(1.8)
    }
})

export default SectionConfirmedInformation