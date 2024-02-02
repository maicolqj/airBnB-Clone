import React, { createContext, useEffect, useState } from "react";
import {
  Detail,
  DetailField,
  Field,
  FilterData,
  Publication,
  SearchPublications
} from "../interfaces/GlobalInterfaces";
import BackendApi from "../api/backendApi";
import { fetchApi } from "../api/ApiService";
import moment from "moment";
import { getDatesBetweenRange, removeHyphenEndText } from "../helpers/formats";
import { MarkedDates } from "react-native-calendars/src/types";
import { colorsApp } from "../styles/globalColors/GlobalColors";

type PublicationsContextProps = {
  isLoading: boolean;
  isMorePage: boolean;
  publications: Publication[];
  publicationSelected: Publication|undefined
  reserveDays: string[] | []
  loadPublications: () => Promise<void>;
  setPublicationSelected: Function
  getVisibleInSubtitle: Function
  loadPublicationsBySlug: (slug: string) => void;
  isLoadingPublicationSlug:boolean
  updateFilters: (partialFilters: Partial<FilterData>) => void; // Cambio aquí
  filters: FilterData;
  showRangeReserve: boolean;
  setShowRangeReserve: Function
  handleDayPress:Function
  getMarkedDates: Function
  priceRangeSelected:number
  setInitalDates:Function,
  selectedStartDate:string|null
  selectedEndDate:string|null
  quantityRangeSelected:number
  showChooseGuestReserve: boolean
  setShowChooseGuestReserve: Function
  incrementDetail:(detailId:number) =>void
  decrementDetail:(detailId:number) =>void
  guestDetails: Detail[] | [],
  fieldGuestDetails:DetailField[] | [],
  setValueGuestDetails: (keyGuestDetail:number,keyField:number, value:any) => void,
  clearStoreReserve:Function,
  complementFilters:any,
  setIsMorePage:Function,
  getComplementFilters: Function
};

export const PublicationsContext = createContext(
  {} as PublicationsContextProps,
);

const parseFields = (fields: string) => {
  let parse: [Field] = JSON.parse(fields);
  if (parse && parse.fields) {
      return parse.fields;
  }
  return []
}

export const PublicationsProvider = ({children}: any) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isMorePage, setIsMorePage] = useState(true);


  const [showRangeReserve,setShowRangeReserve] = useState(false)
  const [showChooseGuestReserve,setShowChooseGuestReserve] = useState(false)
  const [publications, setPublications] = useState<Publication[]>([]);
  const [publicationSelected, setPublicationSelected] = useState<Publication>()
  const [isLoadingPublicationSlug, setIsLoadingPublicationSlug] = useState<boolean>(false)
  const [reserveDays, setReserveDays] = useState<string[] | []>([])

  // Fechas seleccinadas en el calendario de reserva
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [priceRangeSelected, setPriceRangeSelected] = useState<number>(0);
  const [quantityRangeSelected, setQuantityRangeSelected] = useState<number>(0);
  const [guestDetails,setGuestDetails] = useState<Detail[]>([])
  const [fieldGuestDetails,setFieldGuestDetails] = useState<DetailField[] | []>([])

  const [complementFilters, setComplementFilters] = useState<any>()

  const [filters, setFilters] = useState<FilterData>({
    page: 0,
    limit: 10,
  });

  useEffect(()=>{
    let quantityDays = 0
    if (selectedStartDate && selectedEndDate) {
      quantityDays = getDatesBetweenRange(selectedStartDate,selectedEndDate).length - 1
    }
    setQuantityRangeSelected(quantityDays)
    setPriceRangeSelected(quantityDays * (publicationSelected?.price.base ?? 0))
    
  },[selectedStartDate,selectedEndDate])

  useEffect(()=>{
    if (publicationSelected) {
      setInitalDates()
    }
  },[reserveDays])

  useEffect(()=>{
    formatGuestFields()
  },[guestDetails])


  const formatGuestFields = () =>{
    let newFieldGuestDetails:any = []
    guestDetails.forEach((detail) => {
      for (let index = 0; index < detail.new_quantity; index++) {
        const fields = parseFields(detail.type.fields)
        newFieldGuestDetails.push({
          id: detail.type.id,
          name: detail.type.name,
          fields,
          position: index + 1
        })
      }
    })
    setFieldGuestDetails(newFieldGuestDetails)
  }

  const getComplementFilters = async()=>{
    try {
        if (complementFilters && complementFilters.length > 0) {
            return
        }
        const resp = await fetchApi(`/publication/get-complement-filters`,{
          method:'GET'
        })
       
        if (resp.status) {
            let moreFilters:any = {};
            resp.data.guestTpes.forEach((item:any) => {
                moreFilters[item.data] = 0
            });

            console.log('getComplementFilters =>resp.data',resp.data);
            
            setComplementFilters(resp.data)
            
            if (resp.data.cities && resp.data.cities.length > 0) {
              moreFilters['city'] = resp.data.cities[0]
            }
            updateFilters(moreFilters)
        }
    } catch (error:any) {
        throw new Error(error?.message);
    }
  }

  const updateFilters =  (data: Partial<FilterData>) => {
    setFilters((prevFilters) => {
      // console.log('prevFilters',prevFilters);
      // console.log('data',data);
      // if (reloadPublications) {
      //   loadPublications()
      // }
      return {
        ...prevFilters,
        ...data
      };
    });
  };

  const formatFilters = () => {
    let newFilters = {...filters}
    if (newFilters.city) {
      newFilters.city = newFilters.city?.slug
    }
    return newFilters
  }

  const loadPublications = async () => {
    try {
      if (isLoading || !isMorePage) {
          return
      }
      setIsLoading(true);

      const params:any = {
        ...formatFilters(),
        page:filters.page + 1
      }
      const queryString = new URLSearchParams(params).toString()
      console.log('loadPublications',`/publication/search-publications?${queryString}`);
      console.log('filters',filters);
      
      const resp = await fetchApi(`/publication/search-publications?${queryString}`,{
        method:'GET'
      })
      if (resp.code == 200) {
        updateFilters({...filters, page: params.page,})
        
        let newPublications = [] as Publication[]
        // if (filters.page > 1) {
          publications.forEach(publication =>{
              if (!resp.data.some((item:Publication) => publication.id == item.id)) {
                  newPublications.push(publication)
              }
          })
        // }
        
        setPublications([...newPublications,...resp.data] );
        if (resp.data.length < filters.limit) {
            setIsMorePage(false)
        }
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const loadPublicationsBySlug = async (slug:string) => {
    
    setIsLoadingPublicationSlug(true)
    const resp = await fetchApi(`/publication/datail-complements/${slug}`,{
      method:'GET'
    })
    if (resp.status) {
      resp.data.publication.details.map((detail:any) => {
        detail.new_quantity = detail.type.default_quantity
      })
      setGuestDetails(resp.data.publication.details)
      setPublicationSelected(resp.data.publication)
      setReserveDays(resp.data.reserve_days)
    }
    setIsLoadingPublicationSlug(false)
  };

  const setInitalDates = ()=>{
    let initialStartDate = moment()
    let initialEndDate = moment().add(1,'day')
    while (reserveDays.some(day => day == initialStartDate.format("YYYY-MM-DD")) || reserveDays.some(day => day == initialEndDate.format("YYYY-MM-DD"))) {
      initialStartDate.add(1,'day')
      initialEndDate.add(1,'day')
    }
    setSelectedStartDate(initialStartDate.format("YYYY-MM-DD"))
    setSelectedEndDate(initialEndDate.format("YYYY-MM-DD"))
}

  const handleDayPress = (day: any) => {
    const dateStr = day.dateString;
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(dateStr);
      setSelectedEndDate(null);
    } else {
      if (dateStr > selectedStartDate) {
        const rangeSelected = getDatesBetweenRange(selectedStartDate,dateStr)
        let islockedInRange = false
        for (let index = 0; index < reserveDays.length; index++) {
          islockedInRange = rangeSelected.some(rangeDay => rangeDay == reserveDays[index])
          if (islockedInRange) break
        }
        if (!islockedInRange) {
          setSelectedEndDate(dateStr);
        }else{
          setInitalDates()
        }
      } else {
        setSelectedStartDate(dateStr);
        setSelectedEndDate(null);
      }
    }
  };

  const getMarkedDates = (): MarkedDates => {
    const markedDays: MarkedDates = {};

    if (selectedStartDate) {
        markedDays[selectedStartDate] = { color: colorsApp.primary(), startingDay: true };
    }
    if (selectedEndDate) {
        markedDays[selectedEndDate] = { color: colorsApp.primary(), endingDay: true };
    }
    if (selectedStartDate && selectedEndDate) {
        const startDate = new Date(selectedStartDate);
        const endDate = new Date(selectedEndDate);

        const startDateStr = startDate.toISOString().split('T')[0]
        const endDateStr = endDate.toISOString().split('T')[0]
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            const currentDateStr = currentDate.toISOString().split('T')[0];
            markedDays[currentDateStr] = { 
              color: (currentDateStr != startDateStr && currentDateStr != endDateStr) ? colorsApp.primary(0.2)  : colorsApp.primary(), 
              startingDay: currentDateStr == startDateStr && true, 
              endingDay: currentDateStr == endDateStr && true
            };
        }

      }
      reserveDays.forEach((day) => {
        markedDays[day] = { 
          disabled:true,
          disableTouchEvent:true
        };
      });
    
    return markedDays;
  };

  const getVisibleInSubtitle = () => {
    let details = publicationSelected?.details
    let groups = {}
    details?.forEach(detail => {            
        if (detail.type.visible_in_subtitle) {
            const rel_tipo_detalle = detail.type;
            const { group_detail } = rel_tipo_detalle
            if (!groups[group_detail.singular_name]) {
                groups[group_detail.singular_name] = {
                    name: group_detail.singular_name,
                    quantity: detail.quantity
                };
            } else {
                groups[group_detail.singular_name].quantity += detail.quantity
            }
            groups[group_detail.singular_name].name = groups[group_detail.singular_name].quantity > 1 ? group_detail.plural_name : group_detail.singular_name
        }
    });
    let text = ``
    for (const key in groups) {
        let element = groups[key]
        if (element.quantity > 0) {
            text += `${element.quantity} ${element.name} - `
        }
    }
    return removeHyphenEndText(text)
  }

  const incrementDetail = (detailId:number) =>{
    let newGuestDetails = [...guestDetails]
    newGuestDetails.map((detail,key) => {
      if (detail.id == detailId ) {
        detail.new_quantity = detail?.new_quantity >= detail?.quantity ? detail?.new_quantity : detail?.new_quantity+1
      }
    });
    setGuestDetails(newGuestDetails)
  }

  const decrementDetail = (detailId:number) =>{
    let newGuestDetails = [...guestDetails]
    newGuestDetails.map((detail,key) => {
      if (detail.id == detailId ) {
        detail.new_quantity = detail?.new_quantity <= detail.type.default_quantity ? detail?.new_quantity : detail?.new_quantity-1
      }
    });
    setGuestDetails(newGuestDetails)
  }

  const setValueGuestDetails = (keyGuestDetail:number,keyField:number,value:any) =>{
    let newFieldGuestDetails = [...fieldGuestDetails]
    newFieldGuestDetails[keyGuestDetail].fields[keyField].value = value
    setFieldGuestDetails(newFieldGuestDetails);
  }

  const clearStoreReserve = () => {
    setGuestDetails([])
    setReserveDays([])
    setPublicationSelected(undefined)
  }

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        isLoading,
        isMorePage,
        filters,
        updateFilters,
        getComplementFilters,
        loadPublications,
        isLoadingPublicationSlug,
        loadPublicationsBySlug,
        setPublicationSelected,
        publicationSelected,
        reserveDays,
        getVisibleInSubtitle,
        showRangeReserve,
        setShowRangeReserve,
        handleDayPress,
        getMarkedDates,
        priceRangeSelected,
        setInitalDates,
        selectedStartDate,
        selectedEndDate,
        quantityRangeSelected,
        showChooseGuestReserve,
        setShowChooseGuestReserve,
        guestDetails,
        incrementDetail,
        decrementDetail,
        fieldGuestDetails,
        setValueGuestDetails,
        clearStoreReserve,
        complementFilters,
        setIsMorePage

      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};
