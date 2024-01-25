import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../Generals/CustomText";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome';

import { colorsApp } from "../../styles/globalColors/GlobalColors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PublicationsContext } from "../../context/PublicationContext";
import FormGuest from "./FormGuest";
import { DetailField } from "../../interfaces/GlobalInterfaces";


const ListGuests = () => {
    const {fieldGuestDetails} = useContext(PublicationsContext)
    const [showForm, setShowForm] = useState(false)
    const [selectGuestDetail, setSelectGuestDetail] = useState<DetailField|undefined>()
    const [key, setKey] = useState<number>()

    const handlerEdit = (key:number, guestDetail:DetailField) => {
        setSelectGuestDetail(guestDetail)
        setShowForm(true)
        setKey(key)
    }

    const renderSubtitle = (guestDetail:DetailField) => {
        const principalField = guestDetail.fields.find(item => item.name == 'name');
        return principalField?.value ?(<CustomText style={{fontWeight:'200', fontSize:hp(1.3)}}>{principalField.value}</CustomText>) : null
    }

    return (
        <View style={styles.section}>
            <CustomText style={{fontWeight:'500', fontSize:hp(2), marginBottom:hp(1.5)}}>Detalle de huéspedes</CustomText>
            {
                fieldGuestDetails.map((item, index) =>(
                    <TouchableOpacity 
                        style={styles.containerGuest} key={index}
                        onPress={() => handlerEdit(index,item)}
                    >
                        <View>
                            <CustomText style={{fontSize:hp(1.6), fontWeight:'600'}}>{item.name} {item.position}</CustomText>
                            {renderSubtitle(item)}
                        </View>
                        <View>
                            <Icon name={'edit'} style={{fontSize:hp(2)}}></Icon>
                        </View>
                    </TouchableOpacity>
                ))
            }
            <FormGuest
                keyGuestDetail={key}
                showModal={showForm}
                setShowModal={setShowForm}
                guestDetail={selectGuestDetail}
            />
        </View>
    )
}
export default ListGuests

const styles = StyleSheet.create({
    section:{
        paddingVertical:hp(2),
        paddingHorizontal:hp(2)
    },
    containerGuest:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:hp(0.4),
        padding:hp(1),
        backgroundColor:colorsApp.light(0.1),
        borderRadius:hp(1)
        
    }
})