import React from 'react';
import { StyleSheet, TouchableOpacity, View, Platform, Alert, Linking } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import {check,request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { launchCamera, launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomText from '../generals/CustomText';
import { colorsApp } from '../../styles/globalColors/GlobalColors';

interface props {
    isVisible:boolean,
    setIsVisible:Function,
    handlerFile:Function
}

const options = {
    mediaType: 'photo',
    quality: .1,
    // includeBase64: true,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
} as ImageLibraryOptions;



const TakeImage = ({isVisible,setIsVisible,handlerFile}:props) =>{

    const showPermissionBlockedMessage = () => {
        Alert.alert(
          'Permisos de Cámara Bloqueados',
          'Para usar la cámara, debe permitir el acceso en la configuración de la aplicación.',
          [
            {
              text: 'Abrir Configuración',
              onPress: () => {
                Linking.openSettings();
              },
            },
            { text: 'Cancelar', onPress: () => console.log('Cancelado') },
          ]
        );
    };

    const  handleImage  = async(type:String) => {
        try {
            if(type === 'camera'){
                await request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA: PERMISSIONS.IOS.CAMERA)
                .then(status => {
                    if(status !== 'granted'){
                        return true;
                    }
                }).catch((error)=>console.error('error',error))

                check(Platform.OS ==='android' ? PERMISSIONS.ANDROID.CAMERA: PERMISSIONS.IOS.CAMERA).then((result)=>{
                    if(result === RESULTS.GRANTED){
                        launchCamera(options, response => {
                            if (response.didCancel) {
                            } else if (response.errorMessage) {
                                Alert.alert(response.errorMessage);
                            } else if(response.errorCode){
                                Alert.alert(response.errorCode);
                            }else {
                                handlerFile(response)
                                setIsVisible(false)
                            }
                        });
                    }else{
                        showPermissionBlockedMessage()
                    }
                })

            }else{
                launchImageLibrary(options, response => {
                    if (response.didCancel) {
                        console.log('Se ha cancelado la acción');
                    } else if (response.errorMessage) {
                        Alert.alert(response.errorMessage);
                    } else {
                        handlerFile(response)
                        setIsVisible(false)
                    }
                });
            }

        } catch (error) {
            console.log('handleImage:error=> ',error);
        }
    }
    return (
        <Modal 
            isVisible={isVisible}
            style={{margin:0,justifyContent: 'flex-end'}}
            onBackdropPress={() => setIsVisible(false)}
        >
            <View style={styles.continerModal}>
                <View style={styles.containerBody}>
                    <TouchableOpacity
                        style={styles.optionPickerItem}
                        onPress={() => handleImage('camera')}
                    >
                        <Icon name="camera-outline" size={hp(4)} />
                        <CustomText style={styles.optionListText}>Camara</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionPickerItem}
                        onPress={() => handleImage('library')}
                    >
                        <Icon name="image-outline" size={hp(4)} />
                        <CustomText style={styles.optionListText}>Galeria</CustomText>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>

    )
}
const styles = StyleSheet.create({
    continerModal:{
        height:'20%', 
        // padding:20, 
        borderTopLeftRadius:hp(1.5), 
        borderTopRightRadius:hp(1.5), 
        backgroundColor:'white',
    },

    containerBody:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginHorizontal:hp(2),
        marginVertical:hp(3)
    },
    optionPickerItem:{
        borderColor:colorsApp.blackLeather(),
        borderWidth:hp(0.1),
        borderRadius:10,
        paddingVertical:hp(2),
        paddingHorizontal:hp(3),
        justifyContent:'center',
        alignItems:'center'
    },
    optionListText:{
        // fontSize: hp(2),
        fontWeight: '500',
    }
    
})
export default TakeImage