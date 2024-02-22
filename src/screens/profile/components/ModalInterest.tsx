import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from "../../../components/generals/CustomText";
import { ItemInterestProfile } from "../../../interfaces/UserInterfaces";
import { DataUpdateProfile, ProfileContext } from "../../../context/ProfileContext";
import { respApi } from "../../../interfaces/GlobalInterfaces";


interface MyProps {
    showModal:boolean
    setShowModal:Function
}
const ModalInterest = ({showModal,setShowModal}:MyProps) => {

    const {profile,interestInformation,updateProfile,changeProfileContext} = useContext(ProfileContext)
    // Para saber cuando se esta actuliazando el perfil
    const [loadingSave, setLoadingSave] = useState<boolean>(false)
    // Intereses seleccionados
    const [interests, setInterests] = useState<Array<ItemInterestProfile>|[]>([]);
    // deportes seleccionados
    const [sports, setSports] = useState<Array<ItemInterestProfile>|[]>([]);
    // Cantidad de item seleccionados
    const [countSelected, setCountSelected] = useState<number>(0);
    // Nombre de item seleccionados separados por coma
    const [nameSelected, setNameSelected] = useState<string>();


    
    // para sacar en variables el count y los item seleccionados separados por coma
    useEffect(() => {
        const interest = interests.map(item => item.name)
        const sport = sports.map(item => item.name)

        const count = interests.length + sports.length
        setCountSelected(count)
        if (count > 0) {
            setNameSelected([...interest,...sport].join(', '))
        }else{
            setNameSelected(undefined)
        }
    },[interests,sports])

    // para seleccionar las opciones de interest que ya tiene el perfil
    useEffect(() => {
        if (profile?.user_interests) {
            const newInterest = profile?.user_interests?.map(item => {
                if (item.name ) {
                    return item
                }else {
                    return item.interest
                }
            })
            setInterests(newInterest)

        }
    },[profile?.user_interests])

    // para seleccionar las opciones de sports que ya tiene el perfil
    useEffect(() => {
        if (profile?.user_sports) {
            const newSports = profile?.user_sports?.map(item => {
                if (item.name ) {
                    return item
                }else {
                    return item.sport
                }
            })
            setSports(newSports)
        }
    },[profile?.user_sports])


    const savePorfile = async () => {
        setLoadingSave(true)
        try {
            const data = {
                interests: interests.map(item => item.id),
                sports: sports.map(item => item.id)
            } as DataUpdateProfile
            
            const resp:respApi = await updateProfile(data)
            if (resp.status) {
                changeProfileContext({user_interests: interests, user_sports: sports})
            }

            closeModal()
        } catch (error) {
            
        }
        setLoadingSave(false)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const selectInterest = (item:ItemInterestProfile) => {
        let newInterests = [...interests]
        let exist = newInterests.some(interest => interest.id == item.id)
        if (!exist) {
            if ((interests.length + sports.length) == 7) {
                return
            }
            newInterests.push(item)
        }else{
            newInterests = newInterests.filter(interest => interest.id != item.id)
        }
        setInterests(newInterests);
    }

    const selectSport = (item:ItemInterestProfile) => {
        let newSports = [...sports]
        let exist = newSports.some(sport => sport.id == item.id)
        if (!exist) {
            if ((interests.length + sports.length) == 7) {
                return
            }
            newSports.push(item)
        }else{
            newSports = newSports.filter(sport => sport.id != item.id)
        }
        setSports(newSports);
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
                                <CustomText style={styles.title}>¿Cuáles son tus intereses ?</CustomText>
                                <CustomText style={styles.text}>Elige hasta 7 intereses o deportes que disfrutes y que quieras mostrar en tu perfil.</CustomText>
                            </View>

                            <CustomText style={{...styles.title, marginTop:hp(2)}}>Intereses</CustomText>
                            <View style={styles.containerWrap}>
                                {
                                    interestInformation && interestInformation?.interests.map((item:ItemInterestProfile,key:number) =>(
                                        <TouchableOpacity 
                                            style={[styles.pills, interests.some(interest => interest.id == item.id) && styles.pillsActive]} key={key}
                                            onPress={() => selectInterest(item)}
                                        >
                                            <CustomText>{item.name}</CustomText>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                            <CustomText style={{...styles.title, marginTop:hp(2)}}>Deportes</CustomText>
                            <View style={styles.containerWrap}>
                                {
                                    interestInformation && interestInformation?.sports.map((item:ItemInterestProfile,key:number) =>(
                                        <TouchableOpacity 
                                            style={[styles.pills, sports.some(sport => sport.id == item.id) && styles.pillsActive]} key={key}
                                            onPress={() => selectSport(item)}
                                        >
                                            <CustomText>{item.name}</CustomText>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                        </View> 
                    </ScrollView>
                </View>

                <View style={styles.footerModal}>
                    <View style={{width:'70%'}}>
                        <CustomText style={styles.title}>{countSelected}/7</CustomText>
                        <CustomText style={{...styles.text, fontSize:hp(1.4)}}>{nameSelected ?? 'Tus selecciones aparecerán aquí'}</CustomText>
                    </View>

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
        height:'90%', 
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
        justifyContent:'space-between',
        alignItems:'center'
    },
    buttomFooter: {
        padding:hp(1.4),
        // width:'100%',
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
    containerWrap:{
        flexWrap:'wrap',
        marginVertical:hp(2),
        flexDirection:'row',
    },
    pills:{
        borderWidth:hp(0.1),
        borderColor:colorsApp.light(0.6),
        borderRadius:12,
        padding:hp(1),
        margin:hp(0.4)
    },
    pillsActive:{
        borderColor:colorsApp.blackLeather(1),
        borderWidth:hp(0.3),
    }
})
export default ModalInterest