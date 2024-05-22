import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../routes/stackNavigation/InitialStackNavigation";
import CustomHeader from "../../components/CustomHeader";
import { PublicationsContext } from "../../context/PublicationContext";
import YourTrip from "./components/YourTrip";
import ImageAndTitle from "./components/ImageAndTitle";
import PriceInfo from "./components/PriceInfo";
import ListGuests from "./components/ListGuests";
import CustomText from "../../components/generals/CustomText";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import WebViewPay from "./components/WebViewPay";
import { throw_if } from "../../helpers/Exception";
import { Reserve } from "../../interfaces/ReserveInterface";
import { WebViewNavigation } from "react-native-webview";
import useFetchApi from "../../hooks/useFetchApi";

interface Props extends StackScreenProps<RootInitialStackParams, 'ConfirmAndPay'> { }

const ConfirmAndPay = ({navigation}: Props) => {
    // hook para las peticiones fetch
    const {fetchApi} = useFetchApi()

    const {
        publicationSelected,
        selectedStartDate,
        selectedEndDate,
        priceRangeSelected,
        fieldGuestDetails,
        clearStore
    } = useContext(PublicationsContext)
    const [showWebView,SetShowWebView] = useState(false)
    const [urlRedirect, setUrlRdirect] = useState()
    const [msgValidation,setMsgValidation] = useState<string|null>(null)
    const [reserve, setReserve] = useState<Reserve>()
    const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false)
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
                  value: field.type == 'select' ? field.value.name : field.value
                }
              })
            }
        })
    }

    const finishPayInWebView = (navState?:WebViewNavigation,isBack?:boolean) => {
        if (reserve && ((navState && navState.title == reserve.match_title_response) ||  isBack)) {
            navigation.navigate('ReserveDetail', {reserve: reserve,addReserveList:true})

            clearStore()
            SetShowWebView(false);
        }
    }
    
    const handlerPay = async () => {
        try {
            setIsLoadingApi(true)
            setMsgValidation(null)
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
                        id: detail.type.id,
                        quantity: detail.new_quantity
                    }
                })
            }
            const resp = await fetchApi(`/reserve/create`,{
                method:'POST',
                body:data
            })
            throw_if(!resp.status, resp.message)
            
            setReserve(resp.data)
            if (resp.data.interactive) { // si la reserva no es automática
                Alert.alert('Notificación!','¡Gracias por tu reserva! Hemos recibido tu solicitud y ahora está pendiente de la validación del anfitrión. Te notificaremos tan pronto como haya una actualización. Mientras tanto, siéntete libre de explorar otras opciones.')
                navigation.navigate('Home')
                return
            }
            setUrlRdirect(resp.data.url_redirect_app)
            SetShowWebView(true);
            setIsLoadingApi(false)

        } catch (error:any) {
            setMsgValidation(error.message)
        } finally {
            setIsLoadingApi(false)
        }
    }

   
    return (
        <SafeAreaView style={customStyles.safeArea}>
            {/* Header */}
            <CustomHeader onPressBack={handlerBack}>
                <CustomText style={{fontWeight:'500'}}>Confirma y paga</CustomText>
            </CustomHeader>
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

                {/* Mensajes de validación */}
                {
                    msgValidation &&
                    <View style={styles.containerMsgValidation}>
                        <CustomText style={styles.textMsgValidation}>{msgValidation}</CustomText>
                    </View>
                }
                {/* Boton pagar */}
                <TouchableOpacity
                    style={[customStyles.button, styles.btnPay ]}
                    disabled={isLoadingApi}
                    onPress={() => handlerPay()}
                >
                    {
                        isLoadingApi ?
                            <ActivityIndicator color='white' />
                        :
                            <CustomText style={{color:'white', fontWeight:'bold'}}>Confirmar y pagar</CustomText>
                    }
                </TouchableOpacity>

            </ScrollView>
            <WebViewPay
                show={showWebView}
                setShow={SetShowWebView}
                urlRedirect={urlRedirect ?? ''}
                // onNavigationStateChange={() => finishPayInWebView}
                finishPayInWebView={finishPayInWebView}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    btnPay:{
        marginHorizontal:hp(2),
        marginVertical:hp(2)
    },
    containerMsgValidation:{
        marginHorizontal:hp(2),
        marginVertical:hp(1),
        padding:hp(1),
        borderRadius:hp(1),
        backgroundColor:colorsApp.danger(0.1),
    },
    textMsgValidation:{
        color:colorsApp.danger(),
        fontWeight:'bold',
        fontSize:hp(1.3)
    }
    
})
export default ConfirmAndPay