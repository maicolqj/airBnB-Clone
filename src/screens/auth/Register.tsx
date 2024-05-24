import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../routes/stackNavigation/InitialStackNavigation";
import CustomHeader from "../../components/CustomHeader";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomInput from "../../components/generals/CustomInput";
import { useForm } from "../../hooks/useForm";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import { AuthContext } from "../../context/AuthContext";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de importar el icono correcto
import { CustomDateTime } from "../../components/date/CustomDateTime";
import { throw_if } from "../../helpers/Exception";
import { isEmail, isNumber, regex10Digits } from "../../helpers/formats";
import CheckBox from '@react-native-community/checkbox';
import ModalTerms from "../../components/termCondition/ModalTerms";
import moment from "moment";


interface Props extends StackScreenProps<RootInitialStackParams, 'Register'> { }

const Register = ({navigation}:Props) => {
    const {loadingRegister,register,setValidationRegisterMessage,validationRegisterMessage} = useContext(AuthContext)

    const [showTerms,setShowTerms] = useState(false);

    const [hidePass,setHidePass] = useState(true);
    const [hidePassConfirm,setHidePassConfirm] = useState(true);
    const {first_name,last_name,phone,birthdate,email,password,password_confirmation,terms, onChange} = useForm({
        first_name:'',
        last_name:'',
        birthdate:new Date(),
        email:'',
        phone:'',
        password:'',
        password_confirmation:'',
        terms:false
    })

    useEffect(()=>{
        if (validationRegisterMessage) {
            Alert.alert("Validación",`${validationRegisterMessage}`)
        }
    },[validationRegisterMessage])

    const handlerBack = () => {
        setValidationRegisterMessage('')
        navigation.pop()
    }

    const handlerRegister = async() => {
        try {
            setValidationRegisterMessage('')
            throw_if(!first_name, `Debe escribir un nombre válido`)
            throw_if(!last_name, `Debe escribir un apellido válido`)
            throw_if(!email || !isEmail(email), `Debe escribir un email válido`)
            throw_if(!phone || !isNumber(phone) || !regex10Digits.test(phone), `Debe escribir un teléfono válido`)
            throw_if(!birthdate, `Debe escribir una fecha de nacimiento válida`)
            throw_if(!password, `Debe escribir una contraseña válida`)
            throw_if(password != password_confirmation, `No coinciden las contraseñas`)
            throw_if(!terms, `Debe aceptar los temrinos y condiciones`)

            await register({
                first_name,
                last_name,
                email,
                phone,
                birthdate:moment(birthdate).format('YYYY-MM-DD'),
                password,
                password_confirmation,
                terms
            })


        } catch (error:any) {
            setValidationRegisterMessage(error?.message)
        }finally {

        }
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            {/* Header */}
            <CustomHeader
                onPressBack={handlerBack}
            >
                <CustomText style={{fontWeight:'500'}}>Atrás</CustomText>
            </CustomHeader>
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={styles.container}>
                    <View style={{alignItems:'center'}}>
                        <CustomText style={styles.title}>Creación de cuenta</CustomText>
                    </View>
                    {/* Nombre */}
                    <View style={styles.containerItem}>
                        <View style={styles.containerLable}>
                            <CustomText style={styles.label}>Nombre completo</CustomText>
                        </View>
                        <CustomInput 
                            placeholder='Nombre completo'
                            onChangeText={(value) => onChange("first_name",value)}
                            value={first_name}
                        />
                    </View>

                     {/* Apellido */}
                     <View style={styles.containerItem}>
                        <View style={styles.containerLable}>
                            <CustomText style={styles.label}>Apellido</CustomText>
                        </View>
                        <CustomInput 
                            placeholder='Apellido'
                            onChangeText={(value) => onChange("last_name",value)}
                            value={last_name}
                        />
                    </View>

                    {/* Email */}
                    <View style={styles.containerItem}>
                        <View style={styles.containerLable}>
                            <CustomText style={styles.label}>Email</CustomText>
                        </View>
                        <CustomInput 
                            placeholder='Email'
                            onChangeText={(value) => onChange("email",value)}
                            value={email}
                        />
                    </View>

                    {/* phone */}
                    <View style={styles.containerItem}>
                        <View style={styles.containerLable}>
                            <CustomText style={styles.label}>Teléfono</CustomText>
                        </View>
                        <CustomInput 
                            placeholder='Teléfono'
                            onChangeText={(value) => onChange("phone",value)}
                            value={phone}
                        />
                    </View>

                    {/* birthDate */}
                    <View style={styles.containerItem}>
                        <View style={styles.containerLable}>
                            <CustomText style={styles.label}>Fecha de nacimiento</CustomText>
                        </View>

                        <CustomDateTime
                            date={birthdate}
                            setDate={(value:any) => onChange("birthdate",value)}
                            btnStyle={styles.btnDateStyle}
                            textStyle={{fontSize: hp(1.8)}}
                        />
                    </View>

                    {/* password */}
                    <View style={styles.containerItem}>
                        <View style={styles.containerLable}>
                            <CustomText style={styles.label}>Contraseña</CustomText>
                        </View>
                        <View style={styles.inputContainerWithIcon}>
                            <CustomInput 
                                style={{backgroundColor:colorsApp.light(0)}}
                                secureTextEntry={hidePass}
                                placeholder='Contraseña'
                                onChangeText={(value) => onChange("password",value)}
                                value={password}
                            />
                            <TouchableOpacity 
                                onPress={() => setHidePass(!hidePass)}
                            >
                                <Icon name={hidePass ? "eye-slash" : "eye"} size={20} color="black" style={styles.iconForm} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* password_confirmation */}
                    <View style={styles.containerItem}>
                        <View style={styles.containerLable}>
                            <CustomText style={styles.label}>Confirmar contraseña</CustomText>
                        </View>

                        <View style={styles.inputContainerWithIcon}>
                            <CustomInput 
                                style={{backgroundColor:colorsApp.light(0)}}
                                secureTextEntry={hidePassConfirm}
                                placeholder='Confirmar contraseña'
                                onChangeText={(value) => onChange("password_confirmation",value)}
                                value={password_confirmation}
                            />
                            <TouchableOpacity 
                                onPress={() => setHidePassConfirm(!hidePassConfirm)}
                            >
                                <Icon name={hidePassConfirm ? "eye-slash" : "eye"} size={20} color="black" style={styles.iconForm} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Terminos y condiciones */}
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <CheckBox
                            // tintColor={colorsApp.primary()}
                            onCheckColor={colorsApp.primary()}
                            // onFillColor={colorsApp.light()}
                            onTintColor={colorsApp.primary()}
                            style={styles.checkBox}
                            disabled={false}
                            value={terms}
                            onValueChange={(value:boolean) => onChange("terms",value)}
                        />
                        <TouchableOpacity
                            onPress={() => setShowTerms(true)}
                        >
                            <CustomText>
                                Acepto los <CustomText style={{fontWeight:'bold', color:colorsApp.primary()}}>terminos y condiciones</CustomText>
                            </CustomText>
                        </TouchableOpacity>

                    </View>

                    <ModalTerms
                        show={showTerms}
                        setShow={setShowTerms}
                    />

                </View>
            </ScrollView>

            <View style={{marginVertical:hp(1),paddingHorizontal:hp(4)}}>
                <TouchableOpacity 
                    style={[customStyles.button, loadingRegister &&  styles.buttonDisabled]} 
                    onPress={() => handlerRegister()}
                    disabled={loadingRegister}
                >
                    {
                        loadingRegister ? 
                            <ActivityIndicator color={'white'}/> 
                        : 
                            <CustomText style={{color:'white', fontWeight:'bold'}}>Registrar</CustomText>
                    }
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    container:{
        paddingHorizontal:hp(4),
        marginTop:hp(1),
        marginBottom:hp(3),
        justifyContent:'center',
    },
    title:{
        fontSize:hp(3),
        marginBottom:hp(2),
        fontWeight:'bold',
        color:colorsApp.primary(1)
    },
    containerLable:{
        marginBottom:hp(0.4)
    },
    label:{

    },
    containerItem:{
        marginVertical:hp(0.7)
    },
    buttonDisabled:{
        opacity:.6
    },
    iconForm: {
        marginRight: 5,
    },
    inputContainerWithIcon:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: hp(1),
        marginTop: hp(1),
        paddingLeft:0,
        paddingRight:hp(1),
        backgroundColor:colorsApp.light(0.1),
    },
    btnDateStyle:{
        marginVertical:hp(0),
        borderWidth:hp(0),
        backgroundColor:colorsApp.light(0.1),
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingHorizontal: hp(1.2),
    },
    
    checkBox:{
        ...Platform.select({
            ios:{
                // width:hp(2),
                // height:hp(2),
                marginEnd:wp(2)
            }
        })
    }

})
export default Register