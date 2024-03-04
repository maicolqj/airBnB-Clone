import React, { createContext, useEffect, useState } from "react";
import {
  Detail,
  DetailField,
  Field,
  FilterData,
  Publication,
  SearchPublication,
} from "../interfaces/GlobalInterfaces";
import moment from "moment";
import { getDatesBetweenRange, removeHyphenEndText } from "../helpers/formats";
import { MarkedDates } from "react-native-calendars/src/types";
import { colorsApp } from "../styles/globalColors/GlobalColors";
import useFetchApi from "../hooks/useFetchApi";
import { Region } from "react-native-maps";

type PublicationsContextProps = {
  
  homePublication: SearchPublication
  mapPublication: SearchPublication
  publicationSelected: Publication|undefined
  reserveDays: string[] | []
  loadPublications: (resetSearch?:boolean) => Promise<void>;
  loadMapPublications: Function;
  region: Region,
  setRegion: Function,
  setPublicationSelected: Function
  getVisibleInSubtitle: Function
  loadPublicationsBySlug: (slug: string) => void;
  isLoadingPublicationSlug:boolean
  updateFilters: (partialFilters: Partial<FilterData>) => void; // Cambio aquí
  filters: FilterData|undefined;
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
  clearStore:Function,
  complementFilters:any,
  getComplementFilters: Function,
  favorities:SearchPublication,
  loadFavorities:Function,
  toggleFavorite:(publication_id:number) => void
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
  // hook para las peticiones fetch
  const {fetchApi} = useFetchApi()
  
  /* Flujo del home */
  // publicaciones del home que se llenan desde el loadPublications
  const [homePublication,setHomePublication] = useState<SearchPublication>({
    publications:[],
    isMorePage:true,
    isLoading:false,
    limit:10,
    page:0
  })

  // publicaciones del home que se llenan desde el loadMapPublications para usarse en la vista tipo mapa
  const [mapPublication,setMapPublication] = useState<SearchPublication>({
    publications:[],
    isMorePage:true,
    isLoading:false,
    limit:10,
    page:0
  })
  // para tener los valores aquí cada que se mueve el mapa
  const [region,setRegion] = useState<Region>({
    latitude: 4.7110,
    longitude: -74.0721,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  })
  // Informacion necesaria para ppintar los filtros del home
  const [complementFilters, setComplementFilters] = useState<any>()
  // Filtros del home
  const [filters, setFilters] = useState<FilterData>();
  /* Fin flujo del home */

  /* Flujo de reserva */
  // publicacion seleccionada, para mostrar el detalle se llena desde el loadPublicationSlug
  const [publicationSelected, setPublicationSelected] = useState<Publication>()
  // para saber si se está consiltando el loadPublicationSlug
  const [isLoadingPublicationSlug, setIsLoadingPublicationSlug] = useState<boolean>(false)
  // Array con los dias reservados o bloqueados que ya tiene una publicación
  const [reserveDays, setReserveDays] = useState<string[] | []>([])
  // Array con la configuracion de guests de una publicación
  const [guestDetails,setGuestDetails] = useState<Detail[]>([])
  // Fecha inical seleccinada en el calendario cuando se va realizar la reserva
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  // Fecha final seleccinada en el calendario cuando se va realizar la reserva
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  // se calcula de acuerdo a las fechas de selectedStartDate y selectedEndDate seleccionadas
  const [priceRangeSelected, setPriceRangeSelected] = useState<number>(0);
  // se calcula de acuerdo a las fechas de selectedStartDate y selectedEndDate seleccionadas
  const [quantityRangeSelected, setQuantityRangeSelected] = useState<number>(0);
  // Para activar el modal que se encarga de seleccionar las fechas de reserva
  const [showRangeReserve,setShowRangeReserve] = useState(false)
  //Para activar el modal en el que se eligen los huespedes al momento de la reserva
  const [showChooseGuestReserve,setShowChooseGuestReserve] = useState(false)
  // La informacion de los huespeds seleccionados
  const [fieldGuestDetails,setFieldGuestDetails] = useState<DetailField[] | []>([])
  /* Fin flujo de reserva */

  /* Flujo de favoritos */
  const [favorities,setFavorities] = useState<SearchPublication>({
    publications:[],
    isMorePage:true,
    isLoading:false,
    limit:16,
    page:0
  })
  /* Fin flujo de favoritos */

 
  // Se calcula la cantidad de dias y el precio que hay en el rango de fecha
  useEffect(()=>{
    let quantityDays = 0
    if (selectedStartDate && selectedEndDate) {
      quantityDays = getDatesBetweenRange(selectedStartDate,selectedEndDate).length - 1
    }
    setQuantityRangeSelected(quantityDays)
    setPriceRangeSelected(quantityDays * (publicationSelected?.price.base ?? 0))
    
  },[selectedStartDate,selectedEndDate])

  // Para selecciar unas fechas predetermindas teniendo en cuenta los dias reservados de la publicación
  useEffect(()=>{
    if (publicationSelected) {
      setInitalDates()
    }
  },[reserveDays])

  // para armar los datos que se deben pedir en el formulario de acuerdo a los huespeds seleccionados
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
      if (complementFilters) {
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

        setComplementFilters(resp.data)
        
        if (resp.data.cities && resp.data.cities.length > 0) {
          moreFilters['city'] = resp.data.cities[0]
        }
        updateFilters(moreFilters)
      }
    } catch (error:any) {
      updateFilters({price_min:0})
      // throw new Error(error?.message);
    }
  }

  const updateFilters =  (data: Partial<FilterData>) => {
    setFilters((prevFilters) => {
      return {...prevFilters,...data }
    })
  }

  const updateHomePublication = (data: Partial<SearchPublication>) => {
    setHomePublication((prev) => {
      return {
        ...prev,
        ...data
      };
    });
  }

  const updateMapPublication = (data: Partial<SearchPublication>) => {
    setMapPublication((prev) => {
      return {
        ...prev,
        ...data
      };
    });
  }

  const formatFilters = () => {
    if (filters) {
      let newFilters = {...filters}
      if (newFilters.city) {
        newFilters.city = newFilters.city?.slug
      }
      return newFilters
    }
    return {}
  }

  const loadPublications = async (resetSearch:boolean = false) => {
    try {
      if (homePublication.isLoading) {
        return
      }
      if (!homePublication.isMorePage && !resetSearch) {
          return
      }
      updateHomePublication({isLoading:true});

      const params:any = {
        ...formatFilters(),
        limit: homePublication.limit,
        page: resetSearch ? 1 : homePublication.page + 1
      }
      
      const queryString = new URLSearchParams(params).toString()
      // console.log('loadPublications',`/publication/search-publications?${queryString}`);
      const resp = await fetchApi(`/publication/search-publications?${queryString}`,{
        method:'GET'
      })

      if (resp.code == 200) {
        let newPublications = [] as Publication[]
        if (!resetSearch) {
          homePublication.publications.forEach(publication =>{
              if (!resp.data.some((item:Publication) => publication.id == item.id)) {
                  newPublications.push(publication)
              }
          })
        }
        updateHomePublication({
          publications:[...newPublications,...resp.data],
          page:params.page,
          isMorePage: resp.data.length < homePublication.limit ? false : true
        });
      }

    } catch (error) {
      console.error(error);
    } finally {
      updateHomePublication({isLoading:false});
    }
  }

  const loadMapPublications = async () => {
    try {
      if (mapPublication.isLoading) {
        return
      }
      if (!mapPublication.isMorePage) {
        return
      }
      updateMapPublication({isLoading:true});
      const params:any = {
        ...formatFilters(),
        lat: region.latitude,
        lng: region.longitude,
        // limit: mapPublication.limit,
        // page: resetSearch ? 1 : mapPublication.page + 1
      }
      const queryString = new URLSearchParams(params).toString()
  
      const resp = await fetchApi(`/publication/search-publications?${queryString}`,{
        method:'GET'
      })
  
      if (resp.code == 200) {
        let newPublications = [] as Publication[]
        mapPublication.publications.forEach(publication =>{
            if (!resp.data.some((item:Publication) => publication.id == item.id)) {
                newPublications.push(publication)
            }
        })
        updateMapPublication({
          publications:[...newPublications,...resp.data],
          page:params.page,
          // isMorePage: resp.data.length < mapPublication.limit ? false : true
        });
      }
    } catch (error) {
      console.log('loadMapPublications',error);
    } finally {
      updateMapPublication({isLoading:false});
    }

  }

  const updateFavorities =  (data: Partial<SearchPublication>) => {
    setFavorities((prev) => {
      return {
        ...prev,
        ...data
      };
    });
  };

  const loadFavorities = async () => {
    try {
      if (favorities.isLoading || !favorities.isMorePage) {
          return
      }
      updateFavorities({isLoading:true});

      const params:any = {
        limit:favorities.limit,
        page:favorities.page + 1
      }
      const resp = await fetchApi(`/publication/list-favorites`,{
        method:'GET'
      })
      if (resp.code == 200) {
        updateFavorities({page:params.page});
        
        let newPublications = [] as Publication[]
        favorities.publications.forEach(publication =>{
            if (!resp.data.some((item:Publication) => publication.id == item.id)) {
                newPublications.push(publication)
            }
        })
        updateFavorities({
          publications:[...newPublications,...resp.data],
          page:params.page,
          isMorePage: resp.data.length < favorities.limit ? false : true
        });
      }

    } catch (error) {
      console.error(error);
    } finally {
      updateFavorities({isLoading:false});
    }
  }

  const toggleFavorite = (publication_id:number) =>{
    //Publicaciones: favoritos
    fetchApi(`/publication/add-favorite`,{method:'POST',body:{publication_id}}).then(resp =>{
        if (resp.code == 200) {
          // publicaciones general: home
          const findPublication = homePublication.publications.find(item => item.id == publication_id)
          if (findPublication) {
            findPublication.is_favorite = !findPublication.is_favorite
          }
          // publicaciones general: home map
          const findMapPublication = mapPublication.publications.find(item => item.id == publication_id)
          if (findMapPublication) {
            findMapPublication.is_favorite = !findMapPublication.is_favorite
          }

          // Detalle de publicación
          const publicationDetail = {...publicationSelected} as Publication
          if (publicationDetail) {
            publicationDetail.is_favorite = !publicationDetail.is_favorite
            setPublicationSelected(publicationDetail)
          }

          // Publicaciones: favoritos
          let newFavorities = [...favorities.publications]
          const findPublicationFavorite = newFavorities.find(item => item.id == publication_id)
          if (findPublicationFavorite) { //sacar del listado
            newFavorities = newFavorities.filter(item => item.id != publication_id)
          }else{
            findPublication && newFavorities.push(findPublication)
          }
          updateFavorities({publications:newFavorities})
        }
    })
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

  const clearStore = () => {
    setGuestDetails([])
    setReserveDays([])
    setPublicationSelected(undefined)
    setFavorities({
      publications:[],
      isMorePage:true,
      isLoading:false,
      limit:16,
      page:0
    })
  }

  return (
    <PublicationsContext.Provider
      value={{
        homePublication,
        mapPublication,
        filters,
        updateFilters,
        getComplementFilters,
        loadPublications,
        loadMapPublications,
        region,
        setRegion,
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
        clearStore,
        complementFilters,
        favorities,
        loadFavorities,
        toggleFavorite

      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};
