import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ReserveContext } from "../../../context/ReserveContext";
import { formatCurrency } from "../../../helpers/formats";

const PriceAndPaySection = () =>{
    const {reserveSelected} = useContext(ReserveContext)

    return (
        <View>
            <View style={styles.containerPrice}>
                <CustomText
                    style={{
                        fontWeight:'600',
                        fontSize:hp(2)
                    }}
                >
                    Desgloce de precio
                </CustomText>

                <View style={styles.containerTarifas}>
                    <View>  
                        <CustomText style={{...styles.textTaxes ,paddingBottom:hp(1)}}>Tarifa de limpieza</CustomText>
                        <CustomText style={{...styles.textTaxes}}>Por servicio</CustomText>

                    </View>
                    <View>
                        <CustomText style={{...styles.textTaxes ,paddingBottom:hp(1)}}>{formatCurrency(0)}</CustomText>
                        <CustomText style={{...styles.textTaxes}}>{formatCurrency(0)}</CustomText>
                    </View>
                </View>
                
                <View
                    style={{flexDirection:'row', justifyContent:'space-between', marginTop:hp(2)}}
                >
                    <CustomText style={{...styles.textTaxes}}>Total</CustomText>
                    <CustomText style={{...styles.textTaxes}}>{formatCurrency(reserveSelected?.price ?? 0)}</CustomText>
                </View>
            </View>
        </View>

     
    )
}
const styles = StyleSheet.create({
    containerPrice:{
        marginHorizontal:hp(2),
        paddingVertical:hp(2)
    },
    containerTarifas: {
        paddingVertical:hp(2),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:wp(0.1),
        borderBottomColor:colorsApp.light()
    },
    textTaxes:{
        color:colorsApp.light()
    },
    containerPay:{
        marginHorizontal:hp(2),
        paddingVertical:hp(2)
    }
})

export default PriceAndPaySection