import React, { useContext, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomText from "../../../components/Generals/CustomText";
import CustomInput from "../../../components/Generals/CustomInput";
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de importar el icono correcto
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { customStyles } from "../../../styles/globalComponentsStyles/GlobalComponentStyles";
import { useForm } from "../../../hooks/useForm";
import { throw_if } from "../../../helpers/Exception";
import { AuthContext, LoginParams } from "../../../context/publicationContext/AuthContext";

const Login = () => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const logo = require("../../../assets/system/logos/logo.png")
    const [hidePass,setHidePass] = useState(true);
    const {email,password, onChange} = useForm({
        email:'david.raga@alquilapp.com',
        password:'password'
    })
    const {loadingLogin,signIn,validationMessage, setValidationMessage} = useContext(AuthContext)


    const validationForm = () =>{
        setValidationMessage('')
        throw_if(!regexEmail.test(email),'El formato del email es incorrecto')
        throw_if(!password,'Debe escribir la contraseña')
    }
    const handleLogin = async()=>{
        try {
            validationForm()
            const data_login = {email,password}
            await signIn(data_login)
            console.log('handlerLogin',{email,password});
        } catch (error:any) {
            setValidationMessage(error?.message)
        }
        
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={styles.container}>
                    {/* Titulo */}
                    {/* <View>
                        <CustomText style={styles.title}>¡Bienvenido de nuevo!</CustomText>
                    </View> */}

                    {/* Logo */}
                    <View style={styles.containerLogo}>
                        <Image 
                            source={logo}
                            resizeMode="center"
                        />
                    </View>
                    {/* Erores de validación */}
                    {
                        validationMessage &&
                        <View style={styles.validationContainer} >
                            <CustomText style={styles.titleValidation}>Errores de validación</CustomText>
                            <CustomText style={styles.messageValidation}>{validationMessage}</CustomText>
                        </View>
                    }
                    {/* Email */}
                    <CustomInput 
                        placeholder="Correo"
                        onChangeText={(value) => onChange('email', value)}
                        value={email}
                    />
                    {/* Comtraseña */}
                    <View style={styles.inputContainer}>
                        <CustomInput 
                            secureTextEntry={hidePass}
                            placeholder="Contraseña"
                            onChangeText={(value) => onChange('password',value)}
                            value={password}
                        />
                        <TouchableOpacity 
                            onPress={() => setHidePass(!hidePass)}
                        >
                            <Icon name={hidePass ? "eye-slash" : "eye"} size={20} color="black" style={styles.icon} />
                        </TouchableOpacity>

                    </View>

                    {/* Boton de login */}
                    <View style={{marginTop:30}}>
                        <TouchableOpacity 
                            style={[customStyles.button, loadingLogin &&  styles.buttonDisabled]} 
                            onPress={() => handleLogin()}
                            disabled={loadingLogin}
                        >
                            {
                                loadingLogin ? 
                                    <ActivityIndicator color={'white'}/> 
                                : 
                                    <CustomText style={{color:'white', fontWeight:'bold'}}>Iniciar sesión</CustomText>
                            }
                        </TouchableOpacity>
                    </View>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: hp(1),
        marginTop: hp(1),
        paddingLeft:0,
        paddingRight:hp(1),
        backgroundColor:colorsApp.light(1),
    },
    icon: {
        marginRight: 5,
    },
    validationContainer:{
        padding:hp(1),
        backgroundColor:'red',
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
    containerLogo:{
        justifyContent:"center",
        alignItems:"center"
    },
    buttonDisabled:{
        opacity:.6
    }
})
export default Login;