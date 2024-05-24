import React, { createContext, useState } from 'react';
import { InterestProfiles } from '../interfaces/UserInterfaces';
import useFetchApi from '../hooks/useFetchApi';
import { PATH_SERVER } from '../../config';

type CommonsContextProps = {
    interestInformation:InterestProfiles|undefined
    getInterests:Function 
    getDocumentTypes: () => void
    getCountries: () => void
    documentTypes: Array<any>
    countries: Array<any>
    urlTerms: string
}

export const CommonsContext = createContext({} as CommonsContextProps);


export const  CommonsProvider = ({ children }:  any) =>{
    const urlTerms = `${PATH_SERVER}/terminos-condiciones?platform=app`
    // hook para las peticiones fetch
    const {fetchApi} = useFetchApi()
    // comunes: todas las opciones de interes y deportes
    const [interestInformation, setInterestInformation] = useState<InterestProfiles>()
    // comunes: todas las opciones de tipos de documentos
    const [documentTypes, setDocumentTypes] = useState<Array<any>>([])
    // comunes: todas las opciones de paises
    const [countries, setCountries] = useState<Array<any>>([])


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
                let countries = resp.data.map((item:any)=> {
                    return {
                        id:item.id,
                        name:item.name,
                        indicative: `${item.name} (+${item.indicative})`
                    }
                })
                setCountries(countries)
            }
        } catch (error:any) {
            console.log(error?.message);
        }
    }

    return (
        <CommonsContext.Provider value={{
            interestInformation,
            getInterests,
            getDocumentTypes,
            documentTypes,
            getCountries,
            countries,
            urlTerms
        }}>
            { children }
        </CommonsContext.Provider>
    )

}
