import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { optionsProfile } from "../../../helpers/data";
import { OptionProfile } from "../../../interfaces/UserInterfaces";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { ProfileContext } from "../../../context/ProfileContext";
import ModalFormPersonalInformation from "./ModalFormPersonalInformation";


const AddictionalInformation = () => {
    const {profile} = useContext(ProfileContext)

    const itemDefaultOverYou = {
        key:'over_you', 
        title:'Sobre ti', 
        inputType:'textArea', 
        description:'Háblanos un poco de ti para que los futuros huéspedes o anfitriones te conozcan mejor.'
    } as OptionProfile
    
    //para el ModalFormPersonalInformation
    const [showModalForm, setShowModalForm] = useState<boolean>(false)
    //para el OptionProfile seleccionado
    const [itemSelected, setItemSelected] = useState<OptionProfile>()

    const handlerItem = (item:OptionProfile) => {
        setItemSelected(item)
        setShowModalForm(true)
    }


    return (
        <View style={{marginTop:hp(1)}}>
            {
                optionsProfile.map((item:OptionProfile,key:number) => (
                    <Pressable
                        style={styles.containerInformationAdittional}
                        key={key}
                        onPress={() => handlerItem(item)}
                    >
                        <View style={{flexDirection:'row', width:'80%', alignItems:'center'}}>
                            <Icon name={item.icon} size={hp(2.5)} style={{marginRight:hp(1),color:colorsApp.blackLeather(0.8)}} />
                            <CustomText style={{color:colorsApp.light()}}>{profile?.additional_information_user?.[item?.key] ?? item.text_button}</CustomText>
                        </View>

                        <Icon name="chevron-right" size={hp(2.5)} style={{marginRight:hp(1),color:colorsApp.blackLeather(0.8)}} />
                    </Pressable>
                ))
            }
            {/* Sobre ti */}
            <View style={styles.viewSection}>
                <CustomText style={styles.title}>Sobre ti</CustomText>
                <TouchableOpacity  
                    style={styles.overYou}
                    onPress={() => handlerItem(itemDefaultOverYou)}
                >
                    <CustomText style={styles.text}>
                        {profile?.additional_information_user?.over_you ?? 'Escribe algo divertido y contundente.'}
                    </CustomText>
                    <CustomText style={styles.textUnderline}>
                        {profile?.additional_information_user?.over_you ? 'Edita la introducción' : 'Preséntate'}
                    </CustomText>

                </TouchableOpacity>
            </View>


            <ModalFormPersonalInformation
                showModal={showModalForm}
                setShowModal={setShowModalForm}
                item={itemSelected}
            />
          
        </View>
    )
}
const styles = StyleSheet.create({
    containerInformationAdittional:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        marginVertical:hp(1),
        paddingBottom:hp(2),
        borderBottomWidth:hp(0.1),
        borderBottomColor:colorsApp.blackLeather(0.1)
    },
    title:{
        fontWeight:'600',
        fontSize:hp(2.2)
    },
    text:{
        // paddingTop:hp(1),
        fontSize:hp(1.8),
        color:colorsApp.light()
    },
    overYou:{
        marginVertical:hp(2),
        borderStyle:'dashed',
        borderWidth:hp(0.1),
        borderColor:colorsApp.light(0.9),
        padding:hp(1.2),
        borderRadius:8
    },
    textUnderline:{
        // fontSize:hp(2),
        textDecorationLine:'underline',
        fontWeight:'bold',
        marginVertical:hp(1)
    },
    viewSection:{
        marginTop:hp(2),
        borderBottomWidth:hp(0.1),
        borderBottomColor:colorsApp.blackLeather(0.1)
    },
})

export default AddictionalInformation