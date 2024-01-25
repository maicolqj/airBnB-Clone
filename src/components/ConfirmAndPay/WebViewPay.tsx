import React from "react";
import { StyleSheet, View } from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";
import Modal from "react-native-modal";
import { getBaseUrl } from "../../helpers/formats";

interface MyProps {
    show:boolean
    setShow:Function
    urlRedirect:string
    finishPay:() => void
}

const urlFinishes = ['https://epayco.com/']
const WebViewPay = ({show,setShow,urlRedirect,finishPay}:MyProps) => {

    const handleNavigationStateChange = (navState:WebViewNavigation) => {
        // Verifica si la URL actual indica que el pago se ha completado
        if (urlFinishes.includes(getBaseUrl(navState.url))) {
            finishPay()
        }
    };

    return (
        <View >
            <Modal 
                isVisible={show} 
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => setShow(false)}
            >
                <View style={styles.continerModal}>
                    <WebView
                        source={{ uri: urlRedirect }}
                        style={styles.webView}
                        startInLoadingState={true}
                        onNavigationStateChange={handleNavigationStateChange}
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
        backgroundColor:'white'
    },
    webView:{
        borderTopLeftRadius:30, 
        borderTopRightRadius:30, 
    }
})