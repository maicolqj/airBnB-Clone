import React, { createContext, useState } from 'react';
import { fetchApi } from '../api/ApiService';
import { AdditionalInfoUser, InterestProfiles, User } from '../interfaces/UserInterfaces';
import { respApi } from '../interfaces/GlobalInterfaces';

export type DataUpdateProfile = AdditionalInfoUser & {
    interests?: Array<number> | []
    sports?: Array<number> | []
}

type ProfileContextProps = {
    loadingProfile: boolean
    interestInformation:InterestProfiles|undefined
    getProfile:Function
    getInterests:Function 
    profile:User|undefined
    clearStore:Function
    updateProfile: (data:AdditionalInfoUser|FormData) => Promise<respApi>
    changeProfileContext: (profile:User) => void
    getAllInterestAndSport: () => Array<any>
}

export const ProfileContext = createContext({} as ProfileContextProps);


export const  ProfileProvider = ({ children }:  any) =>{
   
    // Para saber cuando esta en proceso de consulta el perfil
    const [loadingProfile, setLoadingProfile] = useState<boolean>(false)
    // Información del perfil
    const [profile, setProfile] = useState<User|undefined>()

    const [interestInformation, setInterestInformation] = useState<InterestProfiles>()

    const changeProfileContext = (profile: User) =>{ 
        setProfile(prevProfile => {
            return {...prevProfile, ...profile}
        })
    }

    const getProfile = async()=>{
        
        try {
            setLoadingProfile(true)
            if (profile) {
                return
            }
            const resp = await fetchApi(`/user/get-info`,{
                method:'GET'
            })
            
            if (resp.code == 200) {
                setProfile(resp.data)
            }
        } catch (error:any) {
            console.log('getProfile', error?.message);
        } finally {
            setLoadingProfile(false)
        }
    }

    const updateProfile = async (data:DataUpdateProfile|FormData):Promise<respApi> =>{
        try {
            let resp:respApi = await fetchApi(`/user/edit`, {
                method:'POST',
                body:data
            })
            return resp
        } catch (error:any) {
            return {
                status:false,
                message: error?.message
            } as respApi
        }
    }

    const getInterests = async ()=>{
        try {
            if (interestInformation) {
                return
            }
            const resp = await fetchApi(`/commons/interests`,{
                method:'GET'
            })
            if (resp.status) {
                setInterestInformation(resp.data)
            }
        } catch (error:any) {
            console.log(error?.message);
        }
    }

    const getAllInterestAndSport = ():Array<any> => {
        const interest = profile?.user_interests?.map((item) => {
            return item.interest ? item.interest : item
        }) ?? []
        const sports = profile?.user_sports?.map((item) => {
            return item.sport ? item.sport : item
        }) ?? []
        
        return [...interest,...sports];
    }

    const clearStore = () =>{
        setProfile(undefined)
    }

    return (
        <ProfileContext.Provider value={{
            loadingProfile,
            interestInformation,
            profile,
            getProfile,
            getInterests,
            updateProfile,
            clearStore,
            changeProfileContext,
            getAllInterestAndSport
        }}>
            { children }
        </ProfileContext.Provider>
    )

}
