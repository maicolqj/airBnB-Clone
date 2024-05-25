import React, { createContext, useState } from 'react';
import { AdditionalInfoUser, InterestProfiles, User } from '../interfaces/UserInterfaces';
import { respApi } from '../interfaces/GlobalInterfaces';
import useFetchApi from '../hooks/useFetchApi';

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
    getDocumentTypes: () => void
    getCountries: () => void
    documentTypes: Array<any>
    countries: Array<any>
    isVerifiedIdentity: () => boolean
}

export const ProfileContext = createContext({} as ProfileContextProps);


export const  ProfileProvider = ({ children }:  any) =>{
    // hook para las peticiones fetch
    const {fetchApi} = useFetchApi()
    // Para saber cuando esta en proceso de consulta el perfil
    const [loadingProfile, setLoadingProfile] = useState<boolean>(false)
    // Información del perfil
    const [profile, setProfile] = useState<User|undefined>()
    // comunes: todas las opciones de interes y deportes
    const [interestInformation, setInterestInformation] = useState<InterestProfiles>()
    // comunes: todas las opciones de tipos de documentos
    const [documentTypes, setDocumentTypes] = useState<Array<any>>([])
    // comunes: todas las opciones de paises
    const [countries, setCoiuntries] = useState<Array<any>>([])

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

    const getDocumentTypes = async ()=>{
        try {
            if (documentTypes.length > 0) {
                return
            }
            const resp = await fetchApi(`/commons/document_types`,{
                method:'GET'
            })
            if (resp.status) {
                setDocumentTypes(resp.data)
            }
        } catch (error:any) {
            console.log(error?.message);
        }
    }

    const getCountries = async ()=>{
        try {
            if (countries.length > 0) {
                return
            }
            const resp = await fetchApi(`/commons/countries`,{
                method:'GET'
            })
            if (resp.status) {
                setCoiuntries(resp.data)
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

    const isVerifiedIdentity = ():boolean =>{
        return profile?.is_valid_identity ?? false
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
            getAllInterestAndSport,
            getDocumentTypes,
            documentTypes,
            getCountries,
            countries,
            isVerifiedIdentity
        }}>
            { children }
        </ProfileContext.Provider>
    )

}
