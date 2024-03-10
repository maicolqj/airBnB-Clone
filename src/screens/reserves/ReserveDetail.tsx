import React, { useContext, useEffect } from "react";
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import CustomHeader from "../../components/CustomHeader";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../routes/stackNavigation/InitialStackNavigation";
import { ReserveContext } from "../../context/ReserveContext";
import moment from "moment";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import Icon from 'react-native-vector-icons/Ionicons';
import { formatCurrency } from "../../helpers/formats";
import TitleStateSection from "./components/TitleStateSection";
import DateSection from "./components/DateSection";
import PolicySection from "./components/PolicySection";
import PriceAndPaySection from "./components/PriceAndPaySection";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import LoadingData from "../../components/LoadingData";

{/* <ion-icon name="arrow-forward-outline"></ion-icon> */}

interface Props extends StackScreenProps<RootInitialStackParams, 'ReserveDetail'> { }

const ReserveDetail = ({navigation, route}:Props) => {
    const reserveRoute = route.params.reserve
    const addReserveList = route.params.addReserveList

    const {loadReserveById, reserveSelected, isLoadingReserveDetail} = useContext(ReserveContext)

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Evita que el usuario regrese a la pantalla de paga y confirma
            e.preventDefault();
            navigation.navigate('Reserves')
        });
        return () => {
          unsubscribe();
        };
    }, [navigation]);

    useEffect(() =>{
        if (reserveRoute.id) {
            loadReserveById(reserveRoute.id,addReserveList ?? false)
        }
    },[reserveRoute])

    const handlerBack = () =>{
        if (navigation.canGoBack()) {
            navigation.goBack()
        }else{
            navigation.navigate('Reserves')
        }
    }


    return (
        <SafeAreaView style={customStyles.safeArea}>
            <CustomHeader onPressBack={handlerBack}>
                <CustomText style={{fontWeight:'500'}}>{`Reserva ${reserveSelected?.id}` }</CustomText>
            </CustomHeader>

            {
                isLoadingReserveDetail ? 
                   <LoadingData/>
                :
                <>
                    <ScrollView style={{marginTop:hp(2)}}>
                        
                        {/* Titulo de publicacion y estado */}
                        <TitleStateSection/>
                        {/* Fechas de reserva */}
                        <DateSection/>

                        {/* Politica de cancelación */}
                        <PolicySection/>

                        {/* Precios*/}
                        <PriceAndPaySection/>
                        
                    </ScrollView>
                </>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    section:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:hp(2),
        paddingVertical:hp(2),
        borderBottomWidth:wp(0.1),
        borderBottomColor:colorsApp.light()
    },
   
  
})
export default ReserveDetail