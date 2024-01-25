import React, { useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import CustomHeader from "../../components/CustomHeader";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../routes/stackNavigation/InitialStackNavigation";
import { ReserveContext } from "../../context/ReserveContext";

interface Props extends StackScreenProps<RootInitialStackParams, 'ReserveDetail'> { }

const ReserveDetail = ({navigation, route}:Props) => {
    const reserveRoute = route.params.reserve

    const {loadReserveById} = useContext(ReserveContext)

    useEffect(() =>{
        if (reserveRoute.id) {
            loadReserveById(reserveRoute.id)
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
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <CustomHeader title="Reserve #1" onPressBack={handlerBack}></CustomHeader>

            <ScrollView>
                <CustomText>Detalle</CustomText>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReserveDetail