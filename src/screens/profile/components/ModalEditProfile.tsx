import React, { useContext, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from "../../../components/generals/CustomText";
import ChangeAvatar from "./ChangeAvatar";
import { ItemInterestProfile } from "../../../interfaces/UserInterfaces";
import { ProfileContext } from "../../../context/ProfileContext";
import AddictionalInformation from "./AddictionalInformation";
import { TouchableOpacity } from "react-native";
import ModalInterest from "./ModalInterest";
interface MyProps {
    showModal:boolean
    setShowModal:Function
}
const ModalEditProfile = ({showModal,setShowModal}:MyProps) => {
    const {profile,getAllInterestAndSport} = useContext(ProfileContext)
     //para el ModalInterest
     const [showModalInterest, setShowModalInterest] = useState<boolean>(false)

    const existsInterestOrSports = ():boolean => {
        if ((profile?.user_interests && profile?.user_interests.length > 0) || (profile?.user_sports && profile?.user_sports.length > 0) ) {
            return true
        }
        return false 
    }

    return (
        <View>
            <Modal 
                isVisible={showModal} 
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => setShowModal(false)}
                // swipeDirection={['down']}
                // onSwipeComplete={()=>setShowModal(false)}
            >
                <View style={styles.continerModal}>
                    {/* Header */}
                    <View style={styles.containerHeader}>
                        <Pressable onPress={() => setShowModal(false)} style={{paddingEnd:hp(12)}}>
                            <Icon name='close' style={{ fontSize:hp(2.5) }}></Icon>
                        </Pressable>
                        <CustomText style={{fontWeight:'500'}}>Editar perfil</CustomText>
                    </View>
                    <ScrollView style={{ marginBottom:hp(10) }}>
                        {/* Image */}
                        <ChangeAvatar/>

                        <View style={{marginHorizontal:hp(3) }}>
                            {/* texto del perfil */}
                            <View style={{marginVertical:hp(2)}}>
                                <CustomText style={styles.title}>Tu perfil</CustomText>
                                <CustomText style={styles.text}>La información que compartas se usará en todo Alquilapp para que otros huéspedes y anfitriones te conozcan mejor.</CustomText>
                            </View>

                            {/* Información adiccional */}
                            <AddictionalInformation/>

                            {/* Interes y deporte */}
                            <View style={{...styles.viewSection,borderBottomWidth:hp(0) }}>
                                <CustomText style={styles.title}>¿Qué te gusta?</CustomText>

                                {
                                    existsInterestOrSports() ?
                                        <View style={styles.containerWrap}>
                                            {
                                                getAllInterestAndSport().map((item:ItemInterestProfile,key:number) =>(
                                                    <View style={[styles.pills]}  key={key}>
                                                        <CustomText>{item.name}</CustomText>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    :
                                        <CustomText  style={{...styles.text, marginTop:hp(1.5)}}>Para encontrar puntos en común con otros huéspedes y anfitriones, agrega intereses a tu perfil.</CustomText>
                                }

                                
                                <TouchableOpacity onPress={() => setShowModalInterest(true)} >
                                    <CustomText style={styles.textUnderline}>
                                    {existsInterestOrSports() ? 'Edita los intereses y deportes' : 'Agrega tus intereses y los deportes que practicas'} 
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                             {/* Fin Interes y deporte */}

                        </View>
                    </ScrollView>
                </View>

                <View style={styles.footerModal}>
                    <Pressable style={styles.buttomFooter} onPress={() => setShowModal(false)} >
                        <CustomText style={{color:'white'}}>Listo</CustomText>
                    </Pressable>
                </View>

                <ModalInterest
                    showModal={showModalInterest}
                    setShowModal={setShowModalInterest}
                />

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    continerModal:{
        height:'93%', 
        // padding:20, 
        borderTopLeftRadius:hp(1.5), 
        borderTopRightRadius:hp(1.5), 
        backgroundColor:'white'
    },
    containerHeader:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:hp(1.5),
        paddingHorizontal:hp(2),
        borderBottomWidth:hp(0.02),
        borderBottomColor:colorsApp.light()
    },
    footerModal: {
        position: 'absolute',
        // bottom: hp(0),
        width: wp('100%'),
        backgroundColor: '#fff',
        paddingHorizontal: hp(2.5),
        paddingVertical: hp(1),
        // marginBottom:hp(1),
        paddingBottom:hp(2.5),
        borderTopColor:colorsApp.light(),
        borderTopWidth:hp(0.02),
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
})
export default ModalEditProfile