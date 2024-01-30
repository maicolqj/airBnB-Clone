import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ReserveContext } from "../../../context/ReserveContext";
import moment from "moment";

const TitleStateSection = () =>{
    const {reserveSelected} = useContext(ReserveContext)

    const reservationNights = () =>{
        var fechaInicio = moment(reserveSelected?.start_date);
        var fechaFin = moment(reserveSelected?.end_date);
        // Calcular la diferencia en días
        var diferenciaDias = fechaFin.diff(fechaInicio, 'days');
        return diferenciaDias;
    }

    return (
        <View style={styles.section}>
            <View>
                <CustomText style={{fontSize:hp(1.6)}}>{reserveSelected?.publication.title}</CustomText>
                <CustomText style={{fontSize:hp(1.6), fontWeight:'600'}}>{reservationNights()} noches en {reserveSelected?.publication?.city?.name}</CustomText>
            </View>

            <View style={{...styles.badge, backgroundColor:reserveSelected?.state_type.color}}>
                <CustomText style={{fontSize:hp(1.5), color:'white', fontWeight:'bold'}}>{reserveSelected?.state_type.name}</CustomText>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:hp(2),
        paddingVertical:hp(2),
        borderBottomWidth:wp(0.1),
        borderBottomColor:colorsApp.light()
    },
    badge:{
        padding:wp(2),
        borderRadius:hp(1)
    },
})

export default TitleStateSection