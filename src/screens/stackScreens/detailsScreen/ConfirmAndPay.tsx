import React, { useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../../routes/stackNavigation/InitialStackNavigation";
import CustomHeader from "../../../components/CustomHeader";
import { PublicationsContext } from "../../../context/publicationContext/PublicationContext";
import YourTrip from "../../../components/ConfirmAndPay/YourTrip";
import ImageAndTitle from "../../../components/ConfirmAndPay/ImageAndTitle";
import PriceInfo from "../../../components/ConfirmAndPay/PriceInfo";

interface Props extends StackScreenProps<RootInitialStackParams, 'ConfirmAndPay'> { }

const ConfirmAndPay = ({navigation}: Props) => {
    const {publicationSelected} = useContext(PublicationsContext)
    const handlerBack = () => {
        navigation.pop()
    }
    const Divider = () =>{
        return (
            <View style={{height:hp(0.6),backgroundColor:colorsApp.light(0.2)}}/>
        )
    }
    return (
        <SafeAreaView style={{flex:1}}>
            {/* Header */}
            <CustomHeader title="Confirma y paga" onPressBack={handlerBack}></CustomHeader>
            <ScrollView style={{}}>
                {/* Seccion de imagen */}
                <ImageAndTitle/>
                <Divider/>
                {/* Seccion tu viaje */}
                <YourTrip/>
                <Divider/>
                {/* Información del precio */}
                <PriceInfo/>
                <Divider/>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    
    
})
export default ConfirmAndPay