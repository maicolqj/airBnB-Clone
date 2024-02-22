import React, { createContext,useState } from 'react';
import { DataSearchReserve, Reserve } from '../interfaces/ReserveInterface';
import useFetchApi from '../hooks/useFetchApi';

type ReserveContextProps = {
    dataReserve:DataSearchReserve
    reserveSelected:Reserve|null
    isLoadingReserveDetail:boolean,
    loadReserves:() => void
    loadReserveById:(id:number, addReserveList?:boolean) => void
    clearStore:Function
}


export const ReserveContext = createContext({} as ReserveContextProps);


export const  ReserveProvider = ({ children }:  any) =>{
    // hook para las peticiones fetch
    const {fetchApi} = useFetchApi()

    const [dataReserve, setDataReserve] = useState<DataSearchReserve>({
        limit:10,
        page:0,
        isLoading:false,
        isMorePage:true,
        reserves:[]
    })
    const [reserveSelected, setReserveSelected] = useState<Reserve|null>(null)
    const [isLoadingReserveDetail, setIsLoadingReserveDetail] = useState<boolean>(false)

    const loadReserves = async() => {
        try {
            if (dataReserve.isLoading || !dataReserve.isMorePage) {
                return
            }
            setDataReserve((prevData) => {
                return {...prevData, isLoading:true}
            })
            const params:any = {
              limit:dataReserve.limit,
              page:dataReserve.page + 1
            }
            const resp = await fetchApi(`/guest/reserves/history`,{
              method:'POST',
              body:params
            })
            
            if (resp.code == 200) {
                setDataReserve((prevData) => {
                    const uniqueNewData = resp.data.data.filter((newItem:any) => {
                        return !prevData.reserves.some(existingItem => existingItem.id === newItem.id);
                    });

                    return {
                        ...prevData, 
                        page: params.page,
                        reserves: [...prevData.reserves, ...uniqueNewData]
                    }
                })
                if (resp.data.data.length < dataReserve.limit) {
                    setDataReserve((prevData) => {
                        return {...prevData, isMorePage:false}
                    })
                }
            }
      
        } catch (error) {
            console.error(error);
        } finally {
            setDataReserve((prevData) => {
                return {...prevData, isLoading:false}
            })
        }
    }

    const loadReserveById = async(id:number, addReserveList?:boolean) =>{
        setIsLoadingReserveDetail(true)
        const resp = await fetchApi(`/reserve/${id}`,{
            method:'GET'
        })
        if (resp.code == 200) {
            setReserveSelected(resp.data)
            if (addReserveList) {
                setDataReserve((prevData) => {
                    return {
                        ...prevData, 
                        reserves: [...[resp.data], ...prevData.reserves,]
                    }
                })
            }
        }
        setIsLoadingReserveDetail(false)
    }

    const clearStore = () => {
        setDataReserve({
            limit:10,
            page:0,
            isLoading:false,
            isMorePage:true,
            reserves:[]
        })
        setReserveSelected(null)
    }
    return (
        <ReserveContext.Provider value={{
            dataReserve,
            isLoadingReserveDetail,
            loadReserves,
            loadReserveById,
            reserveSelected,
            clearStore
        }}>
            { children }
        </ReserveContext.Provider>
    )

}