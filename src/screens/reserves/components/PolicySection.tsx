import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ReserveContext } from "../../../context/ReserveContext";

const PolicySection = () =>{
    const {reserveSelected} = useContext(ReserveContext)

    const formDateCanceled = (date?:string, subtractDate = 0) => {
        if (date) {
            const fechaObj = new Date(date);
            if (subtractDate > 0) {
                fechaObj.setDate(fechaObj.getDate() - subtractDate);
            }
    
            const dia = fechaObj.getDate();
            const mes = fechaObj.toLocaleString('es', { month: 'short' });
    
            return `${dia} de ${mes}`;
        }
        return ''
    }

    return (
        <View style={{...styles.container, borderBottomWidth:wp(0.1),borderBottomColor:colorsApp.light()}}>
            <CustomText
                style={{
                    // color:colorsApp.blackLeather(),
                    fontWeight:'600',
                    fontSize:hp(2)
                }}
            >
                Politica de cancelación
            </CustomText>

            <CustomText
                style={{fontSize:hp(1.5), color:colorsApp.light(), paddingTop:hp(1.5)}}
            >
                Cancelación gratuita antes de las 15:00 del { formDateCanceled(reserveSelected?.start_date,1) }. Sí cancelas antes del check-in a las 15:00 el { formDateCanceled(reserveSelected?.start_date) }. recibirás un reembolso parcial.
            </CustomText>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:hp(2),
        paddingVertical:hp(2)
    },
})

export default PolicySection