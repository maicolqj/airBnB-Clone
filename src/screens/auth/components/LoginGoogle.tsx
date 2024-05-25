import React, { useContext, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import CustomText from '../../../components/generals/CustomText';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import { AuthContext } from '../../../context/AuthContext';
import { throw_if } from '../../../helpers/Exception';
import { GOOGLE_WEB_CLIENT_ID } from '../../../../config';
const logoGoogle = require("../../../assets/system/logos/google_icon.png")


const LoginGoogle = () => {

  const {validationGoogleMessage,setValidationGoogleMessage,loginWithGoogle} = useContext(AuthContext)

  const [loading,setLoading] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:GOOGLE_WEB_CLIENT_ID,
      offlineAccess:true
    });
  }, []);

  useEffect(() => {
    if (validationGoogleMessage) {
      Alert.alert('Validación!', validationGoogleMessage)
    }
  }, [validationGoogleMessage]);

  const signIn = async () => {
    try {
      setLoading(true)
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      throw_if(!userInfo.idToken,'')
      if (!userInfo.idToken) {
        setValidationGoogleMessage('No se pudo obtener información de google')
      }else{
        await loginWithGoogle(userInfo?.idToken)
      }
    } catch (error:any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setValidationGoogleMessage('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setValidationGoogleMessage('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setValidationGoogleMessage('Play services not available or outdated');
      } else {
        setValidationGoogleMessage(error.message);
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <TouchableOpacity style={[ styles.btn]} onPress={()=>signIn()}>
        {/* <Icon name='google' size={hp(2)} ></Icon> */}
        <View style={{...styles.containerLogo, width:hp(3),height:hp(3)}}>
            <Image
                source={logoGoogle}
                resizeMode="center"
                style={{width:hp(4),height:hp(4)}}
            />
        </View>
        {
            loading ? 
                <ActivityIndicator color={colorsApp.primary()}/> 
            : 
            <CustomText style={{ fontWeight:'bold',marginStart:wp(2)}}>Acceder con Google</CustomText>
        }
        
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
    containerLogo:{
        justifyContent:"center",
        alignItems:"center"
    },

    btn:{
        marginVertical:hp(1),
        padding:hp(1.7),
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:hp(1.2),
        borderWidth:hp(0.1),
        borderColor:colorsApp.light()
    },
})

export default LoginGoogle;
