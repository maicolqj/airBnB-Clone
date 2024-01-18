import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../../routes/stackNavigation/InitialStackNavigation";
import CustomHeader from "../../../components/CustomHeader";
import { PublicationsContext } from "../../../context/publicationContext/PublicationContext";
import YourTrip from "../../../components/ConfirmAndPay/YourTrip";
import ImageAndTitle from "../../../components/ConfirmAndPay/ImageAndTitle";
import PriceInfo from "../../../components/ConfirmAndPay/PriceInfo";
import ListGuests from "../../../components/ConfirmAndPay/ListGuests";
import CustomText from "../../../components/Generals/CustomText";
import { customStyles } from "../../../styles/globalComponentsStyles/GlobalComponentStyles";
import WebViewPay from "../../../components/ConfirmAndPay/WebViewPay";
import { throw_if } from "../../../helpers/Exception";
import { fetchApi } from "../../../api/ApiService";

interface Props extends StackScreenProps<RootInitialStackParams, 'ConfirmAndPay'> { }

const ConfirmAndPay = ({navigation}: Props) => {
    const {publicationSelected,selectedStartDate,selectedEndDate,priceRangeSelected,fieldGuestDetails} = useContext(PublicationsContext)
    const [showWebView,SetShowWebView] = useState(false)
    const handlerBack = () => {
        navigation.pop()
    }
    const Divider = () =>{
        return (
            <View style={{height:hp(0.6),backgroundColor:colorsApp.light(0.2)}}/>
        )
    }

    const validate = () => {
        fieldGuestDetails.forEach((detail, index) => {
            for (let i = 0; i < detail.fields.length; i++) {
                let field = detail.fields[i];
                if (field.value && ['text','number'].includes(field.type) && field.regex) {
                    let test = new RegExp(field.regex).test(field.value)
                    throw_if(!test, `Debe completar correctamente todos los datos de ${detail.name} ${detail.position}`)
                }
                throw_if((field.value ? false : true), `Debe completar todos los datos de ${detail.name} ${detail.position}`)
            }
        });
    }

    const formatFieldGuestToApi = () =>{
        return fieldGuestDetails.map((guest) => {
            return {
              name: guest.name,
              fields: guest.fields.map((field) => {
                return {
                  id: guest.id,
                  name: field.name,
                  label: field.label,
                  value: field.value
                }
              })
            }
        })
    }

    const handlerPay = async () => {
        try {
            validate()
            let filterDetails = publicationSelected?.details.filter(item => item.new_quantity > 0) ?? []
            const data = {
                publicationId: publicationSelected?.id,
                price: priceRangeSelected,
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                guests: formatFieldGuestToApi(),
                details: filterDetails.map(detail => {
                    return {
                        id: detail.id,
                        quantity: detail.new_quantity
                    }
                })
            }

            const resp = await fetchApi(`/reserve/create`,{
                method:'POST',
                body:data
            })
            throw_if(!resp.status, resp.message)
            console.log('data Post', data);
            console.log('resp', resp);
        } catch (error) {
            console.log('error',error);
            
        }
        
        // SetShowWebView(true)
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
                {/* Información de los huéspeds */}
                <ListGuests/>
                <Divider/>
                {/* Información del precio */}
                <PriceInfo/>
                <Divider/>

                {/* Boton pagar */}
                <TouchableOpacity
                    style={[customStyles.button, styles.btnPay ]}
                    onPress={() => handlerPay()}
                >
                    <CustomText style={{color:'white', fontWeight:'bold'}}>Confirmar y pagar</CustomText>
                </TouchableOpacity>

            </ScrollView>
            <WebViewPay
                show={showWebView}
                setShow={SetShowWebView}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    btnPay:{
        marginHorizontal:hp(2),
        marginVertical:hp(2)
    }
    
})
export default ConfirmAndPay