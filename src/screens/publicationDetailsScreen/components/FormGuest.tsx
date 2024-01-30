import React, { useContext, useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from "../../../components/generals/CustomText";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { DetailField } from "../../../interfaces/GlobalInterfaces";
import CustomInput from "../../../components/generals/CustomInput";
import { PublicationsContext } from "../../../context/PublicationContext";
import CustomSelect from "../../../components/generals/CustomSelect";
import { TouchableOpacity } from "react-native-gesture-handler";
import { customStyles } from "../../../styles/globalComponentsStyles/GlobalComponentStyles";
import { throw_if } from "../../../helpers/Exception";

interface MypProps {
    keyGuestDetail?:number,
    showModal:boolean
    setShowModal:Function
    guestDetail: DetailField|undefined
}
const FormGuest = ({showModal,setShowModal,guestDetail,keyGuestDetail}:MypProps) => {
    const {setValueGuestDetails} = useContext(PublicationsContext)

    const isFormComplete = ():boolean => {
        try {
            guestDetail?.fields.map(field => {
                throw_if(!field.value, `Verifica el atributo ${field.label}`)
                if (['text','number'].includes(field.type) && field.regex) {
                    let test = new RegExp(field.regex).test(field.value)
                    throw_if(!test, `Verifica el atributo ${field.label}`)
                }
            })
            return true
        } catch (error) {
            return false
        }
    }
   
    return (
        <View>
            <Modal 
                isVisible={showModal} 
                style={{margin:0,justifyContent: 'flex-end'}}
                // onBackdropPress={() => setShowModal(false)}
            >
                <View style={styles.continerModal}>
                    {/* Header */}
                    <View style={styles.containerHeader}>
                        <Pressable onPress={() => setShowModal(false)} style={{paddingEnd:hp(12)}}>
                            <Icon name='close' style={{ fontSize:hp(2.5) }}></Icon>
                        </Pressable>
                        <CustomText style={{fontWeight:'500'}}>{guestDetail?.name} {guestDetail?.position}</CustomText>
                    </View>
                    <ScrollView>
                        {
                            guestDetail?.fields.map((field,keyField) => (
                                <View style={{marginVertical:hp(0.7)}} key={keyField}>
                                    {
                                        field.type == 'select' ?
                                            <>
                                                <View style={styles.containerLable}>
                                                    <CustomText style={styles.label}>{field.label}</CustomText>
                                                </View>
                                                <CustomSelect
                                                    value={field.value}
                                                    onChange={(value:any) => keyGuestDetail !== undefined  && setValueGuestDetails(keyGuestDetail,keyField,value)}
                                                    options={field.options}
                                                />
                                            </>
                                        :
                                            <>
                                                <View style={styles.containerLable}>
                                                    <CustomText style={styles.label}>{field.label}</CustomText>
                                                </View>
                                                <CustomInput 
                                                    placeholder={field.label}
                                                    onChangeText={(value) => keyGuestDetail !== undefined && setValueGuestDetails(keyGuestDetail,keyField,value)}
                                                    value={field.value}
                                                />
                                            </>
                                    }
                                </View>
                            ))
                        }
                        <TouchableOpacity
                            style={[customStyles.button,styles.btnSave,  !isFormComplete() && styles.btnDisabled]}
                            disabled={!isFormComplete()}
                            onPress={() => setShowModal(false)}
                        >
                            <CustomText style={{color:'white', fontWeight:'bold'}}>Guardar</CustomText>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}
export default FormGuest
const styles = StyleSheet.create({
    continerModal:{
        height:'80%', 
        padding:20, 
        borderTopLeftRadius:30, 
        borderTopRightRadius:30, 
        backgroundColor:'white'
    },
    containerHeader:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:hp(1),
        paddingHorizontal:hp(1),
        borderBottomWidth:hp(0.02),
        borderBottomColor:colorsApp.light(),
        marginBottom:hp(2)
    },
    btnSave:{
        marginVertical:hp(3),
        backgroundColor:colorsApp.blackLeather(1)
        // width:'80%'
    },
    btnDisabled:{
        backgroundColor: colorsApp.blackLeather(0.4)
    },
    label:{
        // paddingVertical:hp(2)
    },
    containerLable:{
        marginBottom:hp(1)
    }
})