import React, { createContext, useReducer, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchApi } from '../api/ApiService';
import { User } from '../interfaces/UserInterfaces';

type AuthContextProps = {
    isAuthenticated: boolean
    loadingCheck:boolean
    validationMessage:string
    loadingLogin:boolean
    token: string | undefined
    user: User | undefined
    setValidationMessage: (message:string) => void
    signIn: (data:LoginParams) => void
    logout: Function
}

export interface LoginParams {
    email:string,
    password:string,
    device_name?:string
}

export const AuthContext = createContext({} as AuthContextProps);


export const  AuthProvider = ({ children }:  any) =>{
    const device_name = "APP"
    // Para identificar si esta autententicado
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    // Para saber cuando esta en proceso de validacion de la autenticacion
    const [loadingCheck, setLoadingCheck] = useState<boolean>(true)
    // Para saber cuando se esta haciendo la petición de login al servidor
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false)
    // Para saber cuando hay algun error de validación en el login
    const [validationMessage, setValidationMessage] = useState('');
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
                setIsAuthenticated(true)
                setToken(token)
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
    const signIn = async({ email, password }:LoginParams) => {
        setLoadingLogin(true)
        try {
            const resp = await fetchApi('/auth/login-with-email',{
                method:'POST',
                body:{ email, password, device_name } as LoginParams
            })
            console.log('signIn', resp);
            
            if (resp.code == 200) {
                const token = resp?.data?.token
                setIsAuthenticated(true)
                setToken(token)
                setUser(resp?.data)
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('user', JSON.stringify(resp?.data) );
            }else{
                setValidationMessage('Verifique los datos de acceso')
            }

        } catch (error) {
        } finally {
            setLoadingLogin(false)
        }

    }

    const logout = async () => {
        setIsAuthenticated(false)
        setUser(undefined)
        AsyncStorage.removeItem('user')
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
            signIn,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )

}
