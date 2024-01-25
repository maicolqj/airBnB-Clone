import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from "../Generals/CustomText";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { PublicationsContext } from "../../context/PublicationContext";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import { ScrollView } from "react-native-gesture-handler";
import { Detail } from "../../interfaces/GlobalInterfaces";
import EditChooseGuests from "./EditChooseGuests";


const ChooseGuests = () => {
    const {
        showChooseGuestReserve,
        setShowChooseGuestReserve, 
        guestDetails
    } = useContext(PublicationsContext)

    
    return (
        <View>
            <Modal 
                isVisible={showChooseGuestReserve} 
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => setShowChooseGuestReserve(false)}
            >
                <View style={styles.continerModal}>
                    {/* Header */}
                    <View style={styles.containerHeader}>
                        <Pressable onPress={() => setShowChooseGuestReserve(false)} style={{paddingEnd:hp(12)}}>
                            <Icon name='close' style={{ fontSize:hp(2.5) }}></Icon>
                        </Pressable>
                        <CustomText style={{fontWeight:'500'}}>Huéspedes</CustomText>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {
                                guestDetails.map((detail:Detail,key:number) => (
                                    detail.type.selectable_on_reservation ?
                                        <EditChooseGuests detail={detail} key={key}/>
                                    : null
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.footerModal}>
                    <Pressable 
                        style={styles.buttomFooter}
                        onPress={() => setShowChooseGuestReserve(false)} 
                    >
                        <CustomText style={{color:'white'}}>Guardar</CustomText>
                    </Pressable>
                </View>

            </Modal>
        </View>
    )
}
export default ChooseGuests

const styles = StyleSheet.create({
    continerModal:{
        height:'50%', 
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
        borderBottomColor:colorsApp.light()
    },
    footerModal: {
        position: 'absolute',
        bottom: hp(0),
        width: wp('100%'),
        backgroundColor: '#fff',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        paddingBottom:hp(2.5),
        borderTopColor:colorsApp.light(),
        borderTopWidth:hp(0.02),
        flexDirection:'row', 
        justifyContent:'flex-end',
        alignItems:'center'
    },
    buttomFooter: {
        padding:hp(1.6),
        borderRadius: hp(1),
        backgroundColor: colorsApp.blackLeather(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    
   
})