import React, { useContext, useState } from "react";
import { StyleSheet, View, Platform, Pressable, ActivityIndicator } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { capitalizeFirstLetter, imageToBackend } from "../../../helpers/formats";
import { ProfileContext } from "../../../context/ProfileContext";
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from "@rneui/themed";
import TakeImage from "../../../components/file/TakeImge";
import { respApi } from "../../../interfaces/GlobalInterfaces";
import { ImagePickerResponse } from "react-native-image-picker";

const ChangeImage = ()=> {

    const {profile,updateProfile,changeProfileContext} = useContext(ProfileContext)

    const [openFile,setOpenFile] = useState(false);
    const [loadingSave,setLoadingSave] = useState(false);

    const handlerTakeImage = async (response:ImagePickerResponse) => {
        setLoadingSave(true)
        try {
            let avatar = imageToBackend(response.assets?.[0] ?? undefined)
            if (!avatar) {
                setLoadingSave(false)
                return
            }
            let data = new FormData()
            data.append('avatar',avatar)
            
            const resp:respApi = await updateProfile(data)
            
            if (resp.status) {
                let newProfile = {...profile}
                newProfile.image = avatar?.uri
                // actualizar el profile en context
                changeProfileContext(newProfile)
            }
            setOpenFile(false)
        } catch (error:any) {
            console.log('savePorfile:error => ', error.message);
        }
        setLoadingSave(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                {
                    profile?.image ?
                        <Image source={{ uri:profile?.image }}  style={styles.profileImage}/>
                    : 
                    <CustomText  style={styles.textLetter}>{capitalizeFirstLetter(profile?.name ?? '')}</CustomText>
                }
            </View>
            <Pressable 
                style={styles.editButton}
                onPress={() => setOpenFile(true)}
                disabled={loadingSave}
            >
                {
                    loadingSave ? <ActivityIndicator color={colorsApp.primary()}  />
                    :
                    <>
                        <Icon name='camera' style={{ fontSize:hp(2.5),marginRight:hp(1) }}></Icon>
                        <CustomText >Editar</CustomText>
                    </>
                }
            </Pressable>

            <TakeImage
                isVisible={openFile}
                setIsVisible={setOpenFile}
                handlerFile={handlerTakeImage}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        marginVertical:hp(2)
    },
    containerImage:{
        backgroundColor:colorsApp.blackLeather(),
        width:hp(20),
        height:hp(20),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:wp('50%')
    },
    profileImage: {
        width:hp(20),
        height:hp(20),
        borderRadius:wp('50%'), // Hace que la imagen sea circular
    },
    textLetter:{
        color:'white', 
        fontSize:hp(5),
        fontWeight:'bold'
    },
    editButton: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        position: 'absolute',
        bottom: hp(-1),
        backgroundColor: 'white',
        paddingVertical: hp(0.7),
        paddingHorizontal: hp(1),
        borderRadius: hp(2),
        ...Platform.select({
            ios: {
                shadowColor: colorsApp.light(),
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
})
export default ChangeImage