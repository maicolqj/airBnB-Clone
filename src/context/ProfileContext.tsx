import React, { createContext, useReducer, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchApi } from '../api/ApiService';
import { User } from '../interfaces/UserInterfaces';

type ProfileContextProps = {
    loadingProfile: boolean
    getProfile:Function
    profile:User|undefined
    clearStore:Function
}

export const ProfileContext = createContext({} as ProfileContextProps);


export const  ProfileProvider = ({ children }:  any) =>{
   
    // Para saber cuando esta en proceso de consulta el perfil
    const [loadingProfile, setLoadingProfile] = useState<boolean>(false)
    // Información del perfil
    const [profile, setProfile] = useState<User|undefined>()


    const getProfile = async()=>{
        
        try {
            setLoadingProfile(true)
            if (profile) {
                return
            }
            const resp = await fetchApi(`/user/get-info`,{
                method:'GET'
            })
            console.log(resp);
            
            if (resp.code == 200) {
                setProfile(resp.data)
            }
        } catch (error:any) {
            console.log('getProfile', error?.message);
        } finally {
            setLoadingProfile(false)
        }
    }

    const clearStore = () =>{
        setProfile(undefined)
    }

    return (
        <ProfileContext.Provider value={{
           loadingProfile,
           profile,
           getProfile,
           clearStore
        }}>
            { children }
        </ProfileContext.Provider>
    )

}
