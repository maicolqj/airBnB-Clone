import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomText from "../../../components/generals/CustomText";
import CustomInput from "../../../components/generals/CustomInput";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { customStyles } from "../../../styles/globalComponentsStyles/GlobalComponentStyles";
import { AuthContext } from "../../../context/AuthContext";
import { CommonsContext } from "../../../context/CommonsContext";
import CustomSelect from "../../../components/generals/CustomSelect";
import OTPTextInputOT from "react-native-otp-textinput"

interface MyProps {
    isLoginPhone:boolean
}

const LoginPhone = ({isLoginPhone}:MyProps) => {
    const regexNumber = /^[0-9]+$/;
   
    const {setValidationMessage,sendSms,loginWithPhone} = useContext(AuthContext)

    const {countries} = useContext(CommonsContext)

    const [phone, setPhone] = useState<string>()
    const [countrySelected, setCountrySelected] = useState<any>()

    const [isSendSms, setIsSendSms] = useState<boolean>(false)
    const [loadingSms, setLoadingSms] = useState<boolean>(false)
    
    let otpInput = useRef(null)
    

    useEffect(() => {
        if (countries && countries.length > 0) {
            setCountrySelected(countries[0])
        }
    },[countries])

    useEffect(()=>{
        if (!isLoginPhone) {
            setPhone(undefined)
            clearOtp()
        }
    },[isLoginPhone])

    const clearOtp = () => {
        if (otpInput.current) {
            otpInput.current.clear();
        }
    }

    const eventChange = (value:string) => {
        if ((!value || regexNumber.test(value)) && value.length <= 10  ) {
            setPhone(value)
        }
    }

    const handlerSendSms = async () => {
        try {
            setLoadingSms(true)
            if (countrySelected && phone && regexNumber.test(phone) && phone.length == 10) {
                const respSms = await sendSms(countrySelected.id, phone)
                if (respSms.status) {
                    setIsSendSms(true)
                }else{
                    setValidationMessage(respSms.message)
                }
            }else{
                setValidationMessage("Debe completar toda la información")
            }
        } catch (error:any) {
            setValidationMessage(error.message)
        } finally {
            setLoadingSms(false)
        }
    }

    const handlerVerificateCode = async() =>{
        try {
            setValidationMessage('')
            let otpCode = otpInput.state.otpText.join('')
            setLoadingSms(true)
            if (phone && otpInput.state.otpText.length == 6 && regexNumber.test(otpCode)) {
                await loginWithPhone({ 
                    code:otpCode, 
                    phone,
                    device_name:"APP"
                })
            }else{
                setValidationMessage("Código de verificación invalido")
            }
        } catch (error:any) {
            setValidationMessage(error?.message)
        } finally {
            setLoadingSms(false)
        }
    }

    return (
        <View style={styles.container}>

            <View >
                {
                !isSendSms ?
                    <View style={styles.containerForm}>
                        {/* Pais */}
                        <View style={styles.contentInput}>
                            <CustomSelect
                                placeholder=""
                                labelObject={"indicative"}
                                value={countrySelected}
                                onChange={(value:any) => setCountrySelected(value)}
                                options={countries ?? []}
                            />
                        </View>

                        {/* Phone */}
                        <View style={styles.contentInput}>
                            <CustomInput 
                                placeholder="Teléfono"
                                onChangeText={(value) => eventChange(value)}
                                value={phone}
                            
                            />
                        </View>
                    </View>
                :
                    <View style={{justifyContent:'center',alignItems:'center'}}>

                        <CustomText style={{fontWeight:'bold', fontSize:hp(2), marginVertical:hp(2)}}>Verificación de dos factores</CustomText>
                        <CustomText>Introduzca el código de verificación de 6 dígitos que le enviamos al <CustomText style={{fontWeight:'bold'}}>{phone}</CustomText> </CustomText>

                        <OTPTextInputOT 
                            ref={e => (otpInput = e)} 
                            inputCount={6}
                        />
                       
                    </View>
                }

            </View>
            {/* Boton de login */}
            <View style={{marginTop:hp(2)}}>

                <TouchableOpacity 
                    style={[customStyles.button, loadingSms &&  styles.buttonDisabled]} 
                    onPress={() => isSendSms ? handlerVerificateCode() : handlerSendSms()}
                    disabled={loadingSms}
                >
                    {
                        loadingSms ? 
                            <ActivityIndicator color={'white'}/> 
                        : 
                            <CustomText style={{color:'white', fontWeight:'bold'}}>
                                {isSendSms ? 'Verificar' : 'Enviar sms' }
                            </CustomText>
                    }
                </TouchableOpacity>
            </View>
            
            {/* Corregir telefono */}
            {isSendSms && (
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity 
                        style={{alignItems:'center'}} 
                        onPress={() => setIsSendSms(false)}
                        disabled={loadingSms}
                    >
                        <CustomText 
                            style={{
                                fontWeight:'bold',
                                textDecorationLine:'underline'
                            }}
                        >
                        Corregir teléfono
                        </CustomText>
                    </TouchableOpacity>
                    

                    <TouchableOpacity 
                        style={{alignItems:'center'}} 
                        onPress={() => handlerSendSms()}
                        disabled={loadingSms}
                    >
                        <CustomText 
                            style={{
                                fontWeight:'bold',
                                textDecorationLine:'underline'
                            }}
                        >
                            Reenviar sms
                        </CustomText>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical:hp(2),
        justifyContent:'center',
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
    },
    containerForm:{
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    contentInput:{
        marginVertical:hp(0.2)
    }
})
export default LoginPhone;