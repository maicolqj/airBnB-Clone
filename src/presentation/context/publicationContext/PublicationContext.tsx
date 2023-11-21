import React, { createContext, useEffect, useState } from "react";
import { FilterData, Publication, SearchPublications } from "../../../domain/interfaces/GlobalInterfaces";
import BackendApi from "../../../data/api/backendApi";

type PublicationsContextProps = {
    isLoading: boolean;
    publications: Publication[];
    loadPublications: () => Promise<void>;
    loadPublicationsById: (id: string) => Promise<Publication>;
    updateFilters: (partialFilters: Partial<FilterData>) => void; // Cambio aquí
    filters: FilterData; // Asegúrate de que filters sea de tipo FilterData
  };


export const PublicationsContext = createContext({} as PublicationsContextProps);

export const PublicationsProvider = ({ children }: any) => {

    const [isLoading, setIsLoading] = useState(false)
    const [publications, setPublications] = useState<Publication[]>([])
    const [filters, setFilters] = useState({
        page: 1,
        limit: 3,
        adultos: 0,
        ninos: 0,
        bebes: 0,
        mascotas: 0,
        // city: '',
        // category: ''
        // price_min: 393626,
        // price_max: 1768515,
        // checkin: "2023-11-18",
        // checkout: "2023-11-24"
    });

    useEffect(() => {
        loadPublications()
        // console.log(filters);
        
    }, [filters])

    const updateFilters = (data: Partial<FilterData>) => {
        console.log('Updating filters:', data);
        setFilters(prevFilters => {
          return {
            ...prevFilters,
            ...data,
          };
        });
      };

    const loadPublications = async () => {

        try {

            setIsLoading(true);
            const queryString = Object.entries(filters)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            const resp = await BackendApi.get<SearchPublications>(`/publication/search-publications?${queryString}`);

            if (filters.page == 1) {
                setPublications(resp.data.data)
            }else{
                publications.concat(resp.data.data)
            }
            setIsLoading(false)

        } catch (error) {
            console.log(error);
        }

    }

    
    const loadPublicationsById = async () => {
        throw new Error("Not implemented");
    }

    return (
        <PublicationsContext.Provider value={{
            publications,
            isLoading,
            filters,
            updateFilters,
            loadPublications,
            loadPublicationsById,
        }}>
            {children}
        </PublicationsContext.Provider>
    )
}