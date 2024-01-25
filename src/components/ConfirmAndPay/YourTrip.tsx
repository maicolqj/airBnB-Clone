import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../Generals/CustomText";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { removeHyphenEndText, shortFormatDate } from "../../helpers/formats";
import { PublicationsContext } from "../../context/PublicationContext";
import RangeReserve from "../DetailScreen/RangeReserve";
import ChooseGuests from "./ChooseGuests";

const YourTrip = ()=>{
    const {selectedStartDate,selectedEndDate,setShowRangeReserve, setShowChooseGuestReserve, guestDetails} = useContext(PublicationsContext)
    
    const renderDetails = () => {  
        let groups = {}
        guestDetails.forEach(detail => {
            if(detail.quantity > 0 && detail.type.selectable_on_reservation){
            let type = detail.type;
            let { group_detail } = type
            if (!groups[group_detail.singular_name]) {
                groups[group_detail.singular_name] = {
                    name: group_detail.singular_name,
                    quantity: detail.new_quantity ?? detail.type.default_quantity
                };
            } else {
                groups[group_detail.singular_name].quantity += detail.new_quantity ?? detail.type.default_quantity
            }
            groups[group_detail.singular_name].name = groups[group_detail.singular_name].quantity > 1 ? group_detail.plural_name : group_detail.singular_name
            }
        });
        
        let text = ``
        for (const key in groups) {
            let element = groups[key]
            if (element.quantity > 0) {
                text += `${element.quantity} ${element.name} - `
            }
        }
        return removeHyphenEndText(text)
    }

    return (
        <View style={styles.sectionViaje}>
            <CustomText style={{fontWeight:'500', fontSize:hp(2)}}>Tu viaje</CustomText>
            {/* Fechas */}
            <View style={styles.containerDatesAnGuest}>
                <View>
                    <CustomText style={{fontWeight:'500'}}>Fechas</CustomText>
                    <CustomText style={{fontSize:hp(1.5), marginTop:hp(0.5)}}>
                        {shortFormatDate(selectedStartDate) } - {shortFormatDate(selectedEndDate)}
                    </CustomText>
                </View>
                <Pressable  onPress={() => {setShowRangeReserve(true)}}>
                    <CustomText style={{fontWeight:'500', textDecorationLine:'underline'}}>Edita</CustomText>
                </Pressable>
            </View>
            {/* Huesped */}
            <View style={styles.containerDatesAnGuest}>
                <View>
                    <CustomText style={{fontWeight:'500'}}>Huéspedes</CustomText>
                    <CustomText style={{fontSize:hp(1.5), marginTop:hp(0.5)}}>
                        {renderDetails()}
                    </CustomText>
                </View>
                <Pressable  onPress={() => {setShowChooseGuestReserve(true)}}>
                    <CustomText style={{fontWeight:'500', textDecorationLine:'underline'}}>Edita</CustomText>
                </Pressable>
            </View>
            <RangeReserve/>
            <ChooseGuests/>
        </View>
    )
}
export default YourTrip

const styles = StyleSheet.create({
    sectionViaje:{
        paddingVertical:hp(2),
        paddingHorizontal:hp(2)
    },
    containerDatesAnGuest:{
        marginVertical:hp(2),
        flexDirection:"row",
        justifyContent:'space-between'
    }
})