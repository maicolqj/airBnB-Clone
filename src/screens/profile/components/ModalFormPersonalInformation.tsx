import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from "../../../components/generals/CustomText";
import { OptionProfile } from "../../../interfaces/UserInterfaces";
import CustomInput from "../../../components/generals/CustomInput";
import { ProfileContext } from "../../../context/ProfileContext";
import moment from "moment";
import { respApi } from "../../../interfaces/GlobalInterfaces";
import { CustomDateTime } from "../../../components/date/CustomDateTime";


interface MyProps {
    showModal:boolean
    setShowModal:Function
    item:OptionProfile|undefined
}
const ModalFormPersonalInformation = ({showModal,setShowModal,item}:MyProps) => {

    const {profile,updateProfile,changeProfileContext} = useContext(ProfileContext)

    const [loadingSave, setLoadingSave] = useState<boolean>(false)
    const [value,setValue] = useState<string>();

    const [msgError, setMsgError] = useState<string>();

    useEffect(()=>{
        
        let newValue:any = profile?.additional_information_user?.[item?.key] ?? undefined
        if (item?.inputType == 'date') {
            newValue = newValue ? new Date(moment(newValue)) : new Date()
        }
        setValue(newValue)
    },[item])

    const savePorfile = async () => {
        setLoadingSave(true)
        try {
            if (item?.key) {
                let data:any = {}
                data[item?.key] = item.inputType == 'date' ? moment(value).format('YYYY-MM-DD') : value
                const resp:respApi = await updateProfile(data)
                if (resp.status) {
                    let newProfile = {...profile}

                    let newAdditionalInfo = newProfile?.additional_information_user ? {...newProfile?.additional_information_user} : {}
                    newAdditionalInfo = {...newAdditionalInfo, ...data}

                    newProfile.additional_information_user = newAdditionalInfo
                    // actualizar el profile en context
                    changeProfileContext(newProfile)

                    closeModal()
                }else{
                    setMsgError(resp.message)
                }
            }
        } catch (error:any) {
            setMsgError(error.message)
        }
        setLoadingSave(false)
    }

    const closeModal = () => {
        setShowModal(false)
        setMsgError(undefined)
    }
    return (
        <View> 
            <Modal 
                isVisible={showModal} 
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => closeModal()}
                // swipeDirection={['down']}
                // onSwipeComplete={()=>closeModal()}
            >
                <View style={styles.continerModal}>
                    {/* Header */}
                    <View style={styles.containerHeader}>
                        <Pressable onPress={() => closeModal()} style={{paddingEnd:hp(12)}}>
                            <Icon name='close' style={{ fontSize:hp(2.5) }}></Icon>
                        </Pressable>
                        {/* <CustomText style={{fontWeight:'500'}}>Editar perfil</CustomText> */}
                    </View>
                    <ScrollView style={{ marginBottom:hp(10) }}>
                       
                        <View  style={{marginHorizontal:hp(3) }}>
                            <View style={{marginTop:hp(0)}}>
                                <CustomText style={styles.title}>{item?.title}</CustomText>
                                <CustomText style={styles.text}>{item?.description}</CustomText>
                            </View>

                            {
                            msgError &&
                                <View style={styles.validationContainer} >
                                    {/* <CustomText style={styles.titleValidation}>Errores de validación</CustomText> */}
                                    <CustomText style={styles.messageValidation}>{msgError}</CustomText>
                                </View>
                            }
                            {/* Si es input text */}
                            {(item?.inputType == 'text' && (typeof value === 'string' || typeof value === 'undefined')  ) && (
                                <View style={{marginVertical:hp(3)}}>
                                    <CustomInput 
                                        style={styles.input}
                                        placeholder={item?.placeholder}
                                        // multiline
                                        onChangeText={(value) =>  setValue(value)}
                                        value={value}
                                    />
                                </View>
                            )}
                            {/* Si es un text area */}
                            {(item?.inputType == 'textArea' && (typeof value === 'string' || typeof value === 'undefined') ) && (
                                <View style={{marginVertical:hp(3)}}>
                                    <CustomInput 
                                        style={{...styles.input,minHeight:hp(10), paddingTop:hp(1)}}
                                        placeholder={item?.placeholder}
                                        multiline
                                        numberOfLines={5}
                                        onChangeText={(value) =>  setValue(value)}
                                        value={value}
                                    />
                                </View>
                            )}
                            {/* Si tipo date */}
                            <View style={{marginVertical:hp(0)}}>
                                {(item?.inputType == 'date' && value) && (
                                    <CustomDateTime
                                        date={value}
                                        setDate={setValue}
                                    />
                                )}
                            </View>


                        </View> 
                    </ScrollView>
                </View>

                <View style={styles.footerModal}>
                    <Pressable style={styles.buttomFooter} disabled={loadingSave} onPress={() => savePorfile()} >
                        {
                            loadingSave ? <ActivityIndicator color={'white'} size="small" /> :
                            <CustomText style={{color:'white'}}>Guardar</CustomText>
                        }
                    </Pressable>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    continerModal:{
        height:hp('50%'), 
        // padding:20, 
        borderTopLeftRadius:hp(1.5), 
        borderTopRightRadius:hp(1.5), 
        backgroundColor:'white'
    },
    containerHeader:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:hp(2),
        paddingHorizontal:hp(2),
        // borderBottomWidth:hp(0.02),
        // borderBottomColor:colorsApp.light()
    },
    footerModal: {
        position: 'absolute',
        // bottom: hp(0),
        width: wp('100%'),
        backgroundColor: '#fff',
        paddingHorizontal: hp(2.5),
        paddingVertical: hp(1),
        paddingBottom:hp(4),
        // borderTopColor:colorsApp.light(),
        // borderTopWidth:hp(0.02),
        flexDirection:'row', 
        // justifyContent:'flex-end',
        alignItems:'center'
    },
    buttomFooter: {
        padding:hp(1.4),
        width:'100%',
        borderRadius: hp(1),
        backgroundColor: colorsApp.blackLeather(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontWeight:'600',
        fontSize:hp(2.2)
    },
    text:{
        paddingTop:hp(1),
        fontSize:hp(1.8),
        color:colorsApp.light()
    },
    validationContainer:{
        padding:hp(1),
        backgroundColor:colorsApp.danger(0.8),
        borderRadius:hp(1),
        marginTop:hp(1)
    },
    messageValidation:{
        fontSize:hp(1.3),
        color:'white'
    },
    input:{
        fontSize:hp(1.7),
        paddingVertical:hp(2),  
        borderWidth:hp(0.1),
        backgroundColor:colorsApp.light(0.06)
    }
})
export default ModalFormPersonalInformation