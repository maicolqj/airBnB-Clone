import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginEmailParams, LoginPhoneParams, RegisterUser, User } from '../interfaces/UserInterfaces';
import useFetchApi from '../hooks/useFetchApi';
import { respApi } from '../interfaces/GlobalInterfaces';
import { Platform } from 'react-native';


type AuthContextProps = {
    isAuthenticated: boolean
    loadingCheck:boolean
    validationMessage:string
    validationRegisterMessage:string
    validationGoogleMessage:string
    loadingLogin:boolean
    loadingRegister:boolean
    token: string | undefined
    user: User | undefined
    setValidationMessage: (message:string) => void
    setValidationRegisterMessage: (message:string) => void
    setValidationGoogleMessage: (message:string) => void
    loginWithEmail: (data:LoginEmailParams) => void
    loginWithPhone: (data:LoginPhoneParams) => void
    loginWithGoogle: (token:string) => void
    logout: Function
    sendSms:(country_id:number, phone:string) => respApi
    register:(data:RegisterUser) => void
}


export const AuthContext = createContext({} as AuthContextProps);


export const  AuthProvider = ({ children }:  any) =>{
    // hook para las peticiones fetch
    const {fetchApi} = useFetchApi()

    const device_name = Platform.OS
    // Para identificar si esta autententicado
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    // Para saber cuando esta en proceso de validacion de la autenticacion
    const [loadingCheck, setLoadingCheck] = useState<boolean>(true)
    // Para saber cuando se esta haciendo la petición de login al servidor
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false)
     // Para saber cuando se esta haciendo la petición de registro al servidor
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false)
    // Para saber cuando hay algun error de validación en el login
    const [validationMessage, setValidationMessage] = useState('');

    // Para saber cuando hay algun error de validación en el login con google
    const [validationGoogleMessage, setValidationGoogleMessage] = useState('');
    // Para saber cuando hay algun error de validación en el registro
    const [validationRegisterMessage, setValidationRegisterMessage] = useState('');
    // Token del usuario
    const [token, setToken] = useState<string|undefined>();
    // Información del usuario
    const [user, setUser] = useState<User>();
    

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        setLoadingCheck(true)
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setToken(token)
                setIsAuthenticated(true)
            }
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setUser(JSON.parse(user))
            }
        } catch (error) {
            console.error('checkToken',error);
        }
        setLoadingCheck(false)
    }

    const setRespLogin = async (resp:respApi) => {
        setValidationGoogleMessage('')
        setValidationMessage('')
        setValidationRegisterMessage('')

        const token = resp?.data?.token
        setToken(token)
        setIsAuthenticated(true)
        setUser(resp?.data)
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(resp?.data) );
    }

    const loginWithEmail = async({ email, password }:LoginEmailParams) => {
        setLoadingLogin(true)
        try {
            const resp = await fetchApi('/auth/login-with-email',{
                method:'POST',
                body:{ email, password, device_name } as LoginEmailParams
            })
            if (resp.status) {
                setRespLogin(resp)
            }else{
                setValidationRegisterMessage('Verifique los datos de acceso')
            }

        } catch (error) {
        } finally {
            setLoadingLogin(false)
        }
    }

    const loginWithGoogle = async(token:string) => {
        try {
            const resp = await fetchApi('/auth/verification-jwt-google',{
                method:'POST',
                body:{ token, device_name }
            })
            if (resp.status) {
                setRespLogin(resp)
            }else{
                setValidationGoogleMessage('Verifique los datos de acceso')
            }
        } catch (error) {
        } finally {
        }
    }

    const sendSms = async(country_id:number,phone:string) => {
        try {
            const resp = await fetchApi('/auth/send-code-verification',{
                method:'POST',
                body:{ country_id, phone}
            })
            return resp
        } catch (error) {
        } finally {
        }
    }

    const loginWithPhone = async(data:LoginPhoneParams) => {
        try {
            const resp = await fetchApi('/auth/code-verification',{
                method:'POST',
                body:data
            })
            if (resp.status) {
                setRespLogin(resp)
            }else{
                setValidationMessage('Verifique los datos de acceso')
            }
        } catch (error) {
        } finally {
        }
    }

    const register = async(data:RegisterUser) => {
        try {
            setLoadingRegister(true)
            const resp = await fetchApi('/auth/register',{
                method:'POST',
                body:{...data,device_name}
            })

            if (resp.status) {
                setRespLogin(resp)
            }else{
                setValidationRegisterMessage(resp?.message)
            }
        } catch (error:any) {
            setValidationRegisterMessage(error?.message)
        }finally {
            setLoadingRegister(false)
        }
    }


    const logout = async () => {
        try {
            setIsAuthenticated(false)
            setUser(undefined)
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('user')
        } catch (error:any) {
        }
        
    }


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            validationMessage,
            setValidationMessage,
            loadingLogin,
            loadingCheck,
            token,
            user,
            loadingRegister,
            validationRegisterMessage,
            validationGoogleMessage,
            loginWithEmail,
            logout,
            sendSms,
            loginWithPhone,
            register,
            setValidationRegisterMessage,
            setValidationGoogleMessage,
            loginWithGoogle
            
        }}>
            { children }
        </AuthContext.Provider>
    )

}
