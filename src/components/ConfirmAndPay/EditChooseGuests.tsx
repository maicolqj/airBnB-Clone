import React, { useContext } from "react";
import { Pressable, View } from "react-native";
import CustomText from "../Generals/CustomText";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { shortText } from "../../helpers/formats";
import { Detail } from "../../interfaces/GlobalInterfaces";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { PublicationsContext } from "../../context/publicationContext/PublicationContext";
import { colorsApp } from "../../styles/globalColors/GlobalColors";

interface MypProps {
    detail: Detail
}

const EditChooseGuests = ({detail}:MypProps) => {
    const {IncrementDetail, DecrementDetail} = useContext(PublicationsContext)

    const isDecrementtDisabled = ():boolean =>{
        if (detail.new_quantity <= detail.type.default_quantity || detail.new_quantity < 1) {
            return true
        }
        return false
    }  
    const isIncremenDisabled = ():boolean =>{
        if (detail.new_quantity >= detail.quantity) {
            return true
        }
        return false
    }  

    return (
        <View style={styles.containerOptions}>
            <View>
                <CustomText>{detail.type.name}</CustomText>
                <CustomText style={{fontSize:hp(1.3)}} >
                    {shortText(detail.type.description,40)}
                </CustomText>
            </View>

            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable 
                    style={[styles.bottomActions, isDecrementtDisabled() && styles.bottomDisabled] }
                    onPress={() => DecrementDetail(detail.id)}
                    disabled={isDecrementtDisabled()}
                >
                    <Icon name='minus' style={{ fontSize:hp(2) }}></Icon>
                </Pressable>
                <CustomText style={{marginHorizontal:hp(1.5)}}>
                    {detail.new_quantity}
                </CustomText>
                <Pressable 
                    style={[styles.bottomActions, isIncremenDisabled() && styles.bottomDisabled]}
                    onPress={() => IncrementDetail(detail.id)}
                    disabled={isIncremenDisabled()}
                >
                    <Icon name='plus' style={{ fontSize:hp(2) }}></Icon>
                </Pressable>
            </View>
        </View>
    )
}
export default EditChooseGuests
const styles = StyleSheet.create({
    containerOptions:{
        paddingVertical:hp(1.8),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    bottomActions:{
        borderWidth:hp(0.02),
        padding:hp(1),
        borderRadius:50
    },
    bottomDisabled:{
        backgroundColor:colorsApp.light(0.2),
        borderColor:colorsApp.light(0.2),
    }
})