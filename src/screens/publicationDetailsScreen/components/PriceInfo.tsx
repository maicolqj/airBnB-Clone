import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomText from "../../../components/generals/CustomText";
import { PublicationsContext } from "../../../context/PublicationContext";
import { formatCurrency } from "../../../helpers/formats";

const PriceInfo = ()=>{
    const {priceRangeSelected, quantityRangeSelected, publicationSelected} = useContext(PublicationsContext)
    return (
        <View style={styles.container}>
             <CustomText style={{fontWeight:'500', fontSize:hp(2)}}>Información del precio</CustomText>
             <View style={styles.containerDouble}>
                <CustomText style={{fontWeight:'500'}}>{formatCurrency(publicationSelected?.price?.base ?? 0)} x {quantityRangeSelected} noches </CustomText>
                <CustomText style={{fontWeight:'500'}}>{formatCurrency(priceRangeSelected ?? 0)}</CustomText>
             </View>
        </View>
    )
}
export default PriceInfo

const styles = StyleSheet.create({
    container:{
        paddingVertical:hp(2),
        paddingHorizontal:hp(2)
    },
    containerDouble:{
        marginVertical:hp(2),
        flexDirection:"row",
        justifyContent:'space-between'
    }
})