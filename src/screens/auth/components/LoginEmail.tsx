import React, { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import {heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomText from "../../../components/generals/CustomText";
import CustomInput from "../../../components/generals/CustomInput";
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de importar el icono correcto
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { customStyles } from "../../../styles/globalComponentsStyles/GlobalComponentStyles";
import { useForm } from "../../../hooks/useForm";
import { throw_if } from "../../../helpers/Exception";
import { AuthContext } from "../../../context/AuthContext";
import { regexEmail } from "../../../helpers/formats";

const LoginEmail = () => {
    const [hidePass,setHidePass] = useState(true);
    const {email,password, onChange} = useForm({
        email:'david.raga@Alquilapp.com',
        password:'password'
    })
    const {loadingLogin,loginWithEmail,validationMessage, setValidationMessage} = useContext(AuthContext)


    const validationForm = () =>{
        setValidationMessage('')
        throw_if(!regexEmail.test(email),'El formato del email es incorrecto')
        throw_if(!password,'Debe escribir la contraseña')
    }
    const handleLogin = async()=>{
        try {
            validationForm()
            const data_login = {email,password}
            await loginWithEmail(data_login)
        } catch (error:any) {
            setValidationMessage(error?.message)
        }
        
    }

    return (
        <View style={styles.container}>
            {/* Email */}
            <CustomInput 
                placeholder="Correo"
                onChangeText={(value) => onChange('email', value)}
                value={email}
            />
            {/* Comtraseña */}
            <View style={styles.inputContainer}>
                <CustomInput 
                    style={{backgroundColor:colorsApp.light(0)}}
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
            <View style={{marginTop:hp(2)}}>
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
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical:hp(2),
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
        backgroundColor:colorsApp.light(0.1),
    },
    icon: {
        marginRight: 5,
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
    containerLogo:{
        justifyContent:"center",
        alignItems:"center"
    },
    buttonDisabled:{
        opacity:.6
    }
})
export default LoginEmail;