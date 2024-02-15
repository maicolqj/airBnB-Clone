import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from "../../../components/generals/CustomText";
import ChangeImage from "./ChangeImage";
import { optionsProfile } from "../../../helpers/data";
import { OptionProfile } from "../../../interfaces/UserInterfaces";
// import Icon from 'react-native-vector-icons/Ionicons'; 

// camera-outline


interface MyProps {
    showModal:boolean
    setShowModal:Function
}
const ModalEditProfile = ({showModal,setShowModal}:MyProps) => {
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
                        <ChangeImage/>
                        <View 
                            style={{marginHorizontal:hp(3) }}
                        >
                            {/* texto del perfil */}
                            <View>
                                <CustomText style={styles.title}>Tu perfil</CustomText>
                                <CustomText style={styles.text}>La información que compartas se usará en todo Alquilapp para que otros huéspedes y anfitriones te conozcan mejor.</CustomText>
                            </View>

                            {/* Información adiccional */}
                            <View style={{marginTop:hp(1)}}>
                                {
                                    optionsProfile.map((item:OptionProfile,key) => (
                                        <View style={styles.containerInformationAdittional} key={key}>
                                            <Icon name={item.icon} size={hp(2.5)} style={{marginRight:hp(1),color:colorsApp.blackLeather(0.8)}} />
                                            <CustomText style={{color:colorsApp.light()}}>{item.text_button}</CustomText>
                                        </View>
                                    ))
                                }
                            </View>

                        </View>
                    </ScrollView>
                </View>

                <View style={styles.footerModal}>
                    <Pressable style={styles.buttomFooter} onPress={() => setShowModal(false)} >
                        <CustomText style={{color:'white'}}>Listo</CustomText>
                    </Pressable>
                </View>

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
    containerInformationAdittional:{
        flexDirection:'row',
        alignItems:"center",
        marginVertical:hp(1),

        paddingBottom:hp(2),
        borderBottomWidth:hp(0.1),
        borderBottomColor:colorsApp.blackLeather(0.1)
    }
})
export default ModalEditProfile