import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { PublicationsContext } from '../../../context/PublicationContext';
import { Publication } from '../../../interfaces/GlobalInterfaces';
import DetailPublicationToMap from './map/DetailPublicationToMap';
import CustomText from '../../../components/generals/CustomText';
import { formatCurrency } from '../../../helpers/formats';

interface Props {
  setViewMap: React.Dispatch<React.SetStateAction<boolean>>
}

const MapComponent = ({ setViewMap }: Props) => {
  const {mapPublication,loadMapPublications, region, setRegion, filters} = useContext(PublicationsContext)
  // para tener las publicaciones unicas por latitud y longitud
  const [uniquePublications, setUniquePublications] = useState<Array<Publication> | []>([]) 
  // ref del mapa
  const mapRef = useRef<MapView>(null);

  const [showDeatil,setShowDetail] = useState<boolean>(false)
  const [publicationSelected, setPublicationSelected] = useState<Publication>()

  // para hacer la consulta de publicaciones para el mapa cada vez que cambie region
  useEffect(()=>{
    loadMapPublications()
  },[region,filters])

  // para calcular las publicaciones unicas por latitud y longitud
  useEffect(()=>{
    const uniquePublications = mapPublication.publications.filter((publication, index, self) => {
      // Filtrar solo el primer elemento con cada conjunto único de latitud y longitud
      return index === self.findIndex(p => (
        p.rel_ubicacion.latitude === publication.rel_ubicacion.latitude &&
        p.rel_ubicacion.longitude === publication.rel_ubicacion.longitude
      ));
    });
    setUniquePublications(uniquePublications)
  },[mapPublication.publications])

  const isSelectedPublication = (publication:Publication):boolean => {
    return publication?.id == publicationSelected?.id
  }

  const handlerCloseDetail = () => {
    setShowDetail(false)
    setPublicationSelected(undefined)
  }

  // cuando selecciono un marker
  const handlerMarker = (publication:Publication) => {
    setPublicationSelected(publication)
    setShowDetail(true)
  }
  
  //capturar el evento cada que se mueve el mapa
  const handleMapIdle = (regionNow:Region) => {
    if (regionNow.latitude != region.latitude && regionNow.longitude != region.longitude) {
      setRegion(regionNow)
    }
  };

  return (
    <View style={styles.container}>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // Usa Google Maps
        style={styles.map}
        onMapReady={() => console.log('Map ready')}
        initialRegion={region}
        onRegionChangeComplete={handleMapIdle} // Evento eventIdle
        // showsUserLocation={true}
        // zoomEnabled={true}
        zoomTapEnabled={true} //solo ios
        zoomControlEnabled={true} // solo android
        rotateEnabled={true}
        // loadingEnabled={true}
        // loadingIndicatorColor={colorsApp.primary()}
      >
        {uniquePublications.map((publication, index) => (
          <Marker
            key={index}
            coordinate={{latitude: Number(publication.rel_ubicacion.latitude), longitude: Number(publication.rel_ubicacion.longitude)}}
            onPress={() => handlerMarker(publication)}
          >
            <View style={[styles.marker,isSelectedPublication(publication) && styles.markerActive]}>
                <CustomText style={{
                    fontWeight:'bold',
                    color:isSelectedPublication(publication) ? 'white' : 'black'
                  }}
                >
                  {formatCurrency(publication.price.base)}
                </CustomText>
            </View>
          </Marker>
        ))}
      </MapView>
      
      {/* Cerrar el mapa */}
      <Pressable 
        style={styles.buttomClose} 
        onPress={() => setViewMap(false)}
      >
        <Icon name='chevron-left' style={styles.iconClose}></Icon>
        <CustomText style={{color:'white'}}>Ver lista</CustomText>
      </Pressable>
      
      {/* Loading del mapa */}
      {mapPublication.isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colorsApp.primary()} />
        </View>
      )}
      
      {/* Detalle de la publicacion */}
      {publicationSelected && (
        <DetailPublicationToMap
          showModal={showDeatil}
          closeModal={handlerCloseDetail}
          publication={publicationSelected}
        />
      )}
     
    </View>
  )
}

export default MapComponent

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  
  marker:{
    paddingVertical:hp(1),
    paddingHorizontal:hp(2),
    borderRadius:15,
    backgroundColor:'white'
  },
  markerActive:{
    backgroundColor:colorsApp.blackLeather()
  },
  markertText:{
    fontWeight:'bold'
  },
  markertTextActive:{
    color:'white'
  },

  buttomClose: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('2%'),
    backgroundColor: colorsApp.blackLeather(),
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp(1.3),
    paddingVertical: hp(1),
    flexDirection:'row'
    
  },
  iconClose: {
    fontSize: hp(3),
    color: 'white'
  },

  loadingContainer: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('45%'),
    // transform: [{ translateX: -25 }, { translateY: -25 }],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    paddingHorizontal: hp(3),
    paddingVertical: hp(1)
  }
})