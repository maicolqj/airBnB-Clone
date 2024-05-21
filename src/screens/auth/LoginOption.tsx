import React, { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CustomText from "../../components/generals/CustomText";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colorsApp } from "../../styles/globalColors/GlobalColors";

import LoginEmail from "./components/LoginEmail";
import LoginPhone from "./components/LoginPhone";
import { AuthContext } from "../../context/AuthContext";
import { CommonsContext } from "../../context/CommonsContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../routes/stackNavigation/InitialStackNavigation";
import LoginGoogle from "./components/LoginGoogle";

interface Props extends StackScreenProps<RootInitialStackParams, 'LoginOption'> { }

const LoginOption = ({navigation}:Props) => {
    const logo = require("../../assets/system/logos/logo.png")
    
    const {getCountries} = useContext(CommonsContext)
    
    const [loginWithEmail, setLoginWithEmail] = useState(false)
    const [loginWithPhone, setLoginWithPhone] = useState(false)
    const {validationMessage, setValidationMessage} = useContext(AuthContext)


    useEffect(() => {
        getCountries()
    },[])

    const handlerOption = (withEmail:boolean) =>{
        setValidationMessage('')
        if (withEmail) {
            setLoginWithEmail(true)
            setLoginWithPhone(false)
        }else{
            setLoginWithEmail(false)
            setLoginWithPhone(true)
        }
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={styles.container}>

                    {/* Logo */}
                    <View style={styles.containerLogo}>
                        <Image 
                            source={logo}
                            resizeMode="center"
                        />
                    </View>
                    {/* boton de registro */}
                    <TouchableOpacity 
                        style={{flexDirection:'row', justifyContent:'center',marginBottom:hp(2)}}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <CustomText>¿Eres nuevo? </CustomText>
                        <CustomText style={{fontWeight:'bold', textDecorationLine:'underline', color:colorsApp.primary()}}>Regístrate aquí</CustomText>
                    </TouchableOpacity>


                    <LoginGoogle/>

                    {((!loginWithEmail && !loginWithPhone) || loginWithPhone) && (
                        <TouchableOpacity style={[ styles.btn]} onPress={() => handlerOption(true)}>
                            <Icon name='email' size={hp(2)} ></Icon>
                            <CustomText style={{ fontWeight:'bold',marginStart:wp(2)}}>Continuar con email</CustomText>
                        </TouchableOpacity>
                    )}

                    {((!loginWithEmail && !loginWithPhone) || loginWithEmail) && (
                        <TouchableOpacity style={[ styles.btn]}  onPress={() => handlerOption(false)}>
                            <Icon name='phone' size={hp(2)} ></Icon>
                            <CustomText style={{ fontWeight:'bold',marginStart:wp(2)}}>Continuar con teléfono</CustomText>
                        </TouchableOpacity>
                    )}

                    {/* Erores de validación */}
                    {
                        validationMessage &&
                        <View style={styles.validationContainer} >
                            <CustomText style={styles.titleValidation}>Errores de validación</CustomText>
                            <CustomText style={styles.messageValidation}>{validationMessage}</CustomText>
                        </View>
                    }
                    
                    {loginWithEmail && (
                        <LoginEmail/>
                    )}

                    {loginWithPhone && (
                        <LoginPhone
                            isLoginPhone={loginWithPhone}
                        />
                    )}  
                   
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:hp(4),
        justifyContent:'center',
    },
    title:{
        fontSize:hp(3),
        marginBottom:hp(2),
        fontWeight:'bold',
        color:colorsApp.primary(1)
    },

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

    validationContainer:{
        padding:hp(1),
        backgroundColor:colorsApp.danger(0.7),
        borderRadius:hp(1),
        marginBottom:hp(1)
    },
    titleValidation:{
        fontWeight:'bold',
        color:'white'
    },
    messageValidation:{
        fontSize:hp(1.3),
        color:'white'
    },
})
export default LoginOption;