import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import WebView, { WebViewNavigation, WebViewProps } from "react-native-webview";
import Modal from "react-native-modal";
import CustomHeader from "../../../components/CustomHeader";
import CustomText from "../../../components/generals/CustomText";

type MyProps = WebViewProps & {
    show:boolean
    setShow:Function
    urlRedirect:string
    finishPayInWebView:Function
}

const WebViewPay = ({show,setShow,urlRedirect,finishPayInWebView, ...restProps}:MyProps) => {
    const handlerBack = () =>{
        Alert.alert('¿Estas seguro de realizar esta acción?', 'Al regresar el pago puede quedar pendiente hasta recibir confirmación', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => finishPayInWebView(undefined,true)},
        ]);
        
    }

    const handlerNavigationStateChange = (navState:WebViewNavigation) =>{
        finishPayInWebView(navState)
    }
    return (
        <View >
            <Modal 
                isVisible={show} 
                style={{
                    margin:0,justifyContent: 'flex-end',
                }}
                // onBackdropPress={() => setShow(false)}
            >
                <View style={{...styles.continerModal,borderTopLeftRadius:20,borderTopRightRadius:20, }}>
                    {/* Header */}
                    <CustomHeader 
                        onPressBack={handlerBack}
                    >
                        <CustomText style={{fontWeight:'500'}}>Atrás</CustomText>
                    </CustomHeader>
                    <WebView
                        source={{ uri: urlRedirect }}
                        style={styles.webView}
                        startInLoadingState={true}
                        onNavigationStateChange={() => handlerNavigationStateChange}
                        {...restProps}
                    >
                    </WebView>
                </View>
            </Modal>
        </View>
    )
}

export default WebViewPay

const styles = StyleSheet.create({
    continerModal:{
        height:'93%', 
        borderTopLeftRadius:30, 
        borderTopRightRadius:30, 
        backgroundColor:'white',
    },
    webView:{
        borderTopLeftRadius:30, 
        borderTopRightRadius:30, 
    }
})