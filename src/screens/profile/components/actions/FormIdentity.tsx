import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colorsApp } from "../../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from "../../../../components/generals/CustomText";
import { ItemInterestProfile } from "../../../../interfaces/UserInterfaces";
import { DataUpdateProfile, ProfileContext } from "../../../../context/ProfileContext";
import { File, respApi } from "../../../../interfaces/GlobalInterfaces";
import CustomSelect from "../../../../components/generals/CustomSelect";
import CustomRadio from "../../../../components/generals/CustomRadio";
import TakeImage from "../../../../components/file/TakeImge";
import { Asset, ImagePickerResponse } from "react-native-image-picker";
import { imageToBackend } from "../../../../helpers/formats";
import FastImage from "react-native-fast-image";
import { AvatarIconProps } from "react-native-paper";
import useFetchApi from "../../../../hooks/useFetchApi";


interface MyProps {
    showModal:boolean
    setShowModal:Function
}
const FormIdentity = ({showModal,setShowModal}:MyProps) => {

    const {getCountries, countries, getDocumentTypes, documentTypes} = useContext(ProfileContext)

    const {loadingApi,respApi,fetchApi} = useFetchApi()

    //para abrir el modal para seleccionar imagen
    const [openFile,setOpenFile] = useState(false);
    // Para el pais seleccionado
    const [countrySelected,setCountrySelected] = useState<any>()
    // para el tipo de documento seleccionado
    const [typeSelected,setTypeSelected] = useState<Record<string, any>>()
    // para saber el tipo de imagen que se está cargando
    const [typeImage,setTypeImage] = useState<"FRONT"|"BACK">()
    // para la imagen frontal
    const [frontImage,setFrontImage] = useState<File>()
    // para la imagen trasera
    const [backImage,setBackImage] = useState<File>()
    // si hay errores de validación
    const [msgError, setMsgError] = useState<string>();
    
    // Para consultar los tipos de docuemntos y paises
    useEffect(() =>{
        getDocumentTypes()
        getCountries()
    },[])

    // para seleccionar por defecto el primer país
    useEffect(() => {
        if (countries.length > 0) {
            setCountrySelected(countries[0])
        }
    }, [countries])

    const closeModal = () => {
        setShowModal(false)
    }

    const onPressImage = (type:"FRONT"|"BACK") =>{
        setTypeImage(type)
        setOpenFile(true)
    }

    const handlerTakeImage = (response:ImagePickerResponse) => {
        let image = imageToBackend(response.assets?.[0] ?? undefined)
        if (image) {
            if (typeImage === "FRONT") {
                setFrontImage(image)
            }else if(typeImage === "BACK"){
                setBackImage(image)
            }
        }
    }

    const clearState = () => {
        setCountrySelected(undefined)
        setTypeSelected(undefined)
        setFrontImage(undefined)
        setBackImage(undefined)
    }

    const sendForm = async () => {
        try {
            if (!countrySelected) {
                setMsgError('Debe elegir un país')  
            }else if (!typeSelected) {
                setMsgError('Debe elegir un tipo de documento')  
            }else if (!frontImage) {
                setMsgError('Debe elegir la imagen delantera')  
            }else if (!backImage) {
                setMsgError('Debe elegir la imagen trasera')  
            }else{
                setMsgError(undefined) 
                
                let data = new FormData
                data.append('country_id',countrySelected.id)
                data.append('document_type_id',typeSelected?.id)
                data.append('front_face_image',frontImage)
                data.append('back_face_image',backImage)
                
                let resp:respApi = await fetchApi(`/identity/save`, {
                    method:'POST',
                    body:data
                })
                
                if (resp.status) {
                    closeModal()
                    clearState()
                }else{
                    setMsgError(resp.message)
                }
            }
       
        } catch (error:any) {
            setMsgError(error?.message)
        }
        
    }
    
   
    return (
        <View> 
            <Modal 
                isVisible={showModal} 
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => closeModal()}
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
                            <View>
                                <CustomText style={styles.title}>Añade tu documento de identificación oficial</CustomText>
                                <CustomText style={styles.text}>Tendrás que añadir un documento de identificación oficial, este paso nos sirve para comprobar que eres quien dices ser.</CustomText>
                            </View>

                            {
                                msgError &&
                                <View style={styles.validationContainer} >
                                    {/* <CustomText style={styles.titleValidation}>Errores de validación</CustomText> */}
                                    <CustomText style={styles.messageValidation}>{msgError}</CustomText>
                                </View>
                            }

                            {/* Pais y tipo de documento */}
                            <View style={{marginVertical:hp(2)}}>
                                {/* Seleccionar pais */}
                                <View>
                                    <CustomSelect
                                        value={countrySelected}
                                        onChange={(value:any) => setCountrySelected(value)}
                                        options={countries ?? []}
                                    />
                                </View>
                                {/* Seleccionar tipo de documento */}
                                <View style={{marginVertical:hp(1)}}>
                                    <CustomRadio
                                        value={typeSelected}
                                        onChange={(value:any) => setTypeSelected(value)}
                                        options={documentTypes ?? []}
                                    />
                                </View>
                            </View>


                            <View style={styles.containerlight}>
                                <CustomText style={styles.title}>Sube imágenes {typeSelected?.name && `de tu ${typeSelected.name}`} </CustomText>
                                <CustomText style={styles.text}>Comprueba que las fotos no estén borrosas y que en la parte delantera del permiso de conducir se te vea bien la cara.</CustomText>
                            </View>

                            {/* Imagenes */}
                            <View>
                                <TouchableOpacity style={[!frontImage && styles.containerImage]} onPress={() => onPressImage("FRONT")}>
                                    {
                                        frontImage ?
                                            <FastImage
                                                source={{ uri: frontImage.uri, priority:'high' }}
                                                style={styles.image}
                                                // resizeMode="cover"
                                            />
                                        :
                                        <>
                                            <Icon name="badge-account-horizontal-outline" size={hp(5)} />
                                            <CustomText>Sube la cara delantera</CustomText>
                                        </>
                                    }
                                    
                                </TouchableOpacity>

                                <TouchableOpacity style={[!backImage && styles.containerImage]} onPress={() => onPressImage("BACK")}>
                                    {
                                        backImage ?
                                            <FastImage
                                                source={{ uri: backImage.uri, priority:'high' }}
                                                style={styles.image}
                                            />
                                        :
                                        <>
                                            <Icon name="badge-account-horizontal-outline" size={hp(5)} />
                                            <CustomText>Sube la cara trasera</CustomText>
                                        </>
                                    }
                                </TouchableOpacity>

                            </View>



                        </View> 
                    </ScrollView>
                </View>

                <View style={styles.footerModal}>
                    <TouchableOpacity style={styles.buttomFooter} disabled={loadingApi} onPress={() =>sendForm()}>
                        {
                            loadingApi ? <ActivityIndicator color={'white'} size="small" /> :
                            <CustomText style={{color:'white'}}>Guardar</CustomText>
                        }
                    </TouchableOpacity>
                </View>

                <TakeImage
                    isVisible={openFile}
                    setIsVisible={setOpenFile}
                    handlerFile={handlerTakeImage}
                />

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    continerModal:{
        height:hp('93%'), 
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
    },
    footerModal: {
        position: 'absolute',
        idth: wp('100%'),
        backgroundColor: '#fff',
        paddingHorizontal: hp(2.5),
        paddingVertical: hp(1),
        paddingBottom:hp(4),
        borderTopColor:colorsApp.light(),
        borderTopWidth:hp(0.02),
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center'
    },
    buttomFooter: {
        width:wp("90%"),
        padding:hp(1.4),
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
    containerlight:{
        backgroundColor:colorsApp.light(0.1),
        borderRadius:10,
        padding:hp(2)
    },
    containerImage:{
        borderWidth:hp(0.1),
        borderStyle:'dashed',
        borderColor:colorsApp.blackLeather(),
        borderRadius:10,
        padding:hp(2),
        marginVertical:hp(1),
        alignItems:'center',
        height:hp(11),
        width:wp(87)
    },
    image:{
        marginVertical:hp(1),
        height:hp(11),
        width:wp(87),
        borderRadius:10
    },
    validationContainer:{
        padding:hp(1),
        backgroundColor:colorsApp.danger(0.5),
        borderRadius:hp(1),
        marginTop:hp(1)
    },
    messageValidation:{
        fontSize:hp(1.3),
        color:'white',
        fontWeight:'bold'
    },
   
})
export default FormIdentity