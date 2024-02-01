import React from "react";
import { StyleSheet, View } from "react-native";
import WebView, { WebViewNavigation, WebViewProps } from "react-native-webview";
import Modal from "react-native-modal";
import { getBaseUrl } from "../../../helpers/formats";

type MyProps = WebViewProps & {
    show:boolean
    setShow:Function
    urlRedirect:string
}

const WebViewPay = ({show,setShow,urlRedirect, ...restProps}:MyProps) => {
    return (
        <View >
            <Modal 
                isVisible={show} 
                style={{margin:0,justifyContent: 'flex-end'}}
                // onBackdropPress={() => setShow(false)}
            >
                <View style={styles.continerModal}>
                    <WebView
                        source={{ uri: urlRedirect }}
                        style={styles.webView}
                        startInLoadingState={true}
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
        backgroundColor:'white'
    },
    webView:{
        borderTopLeftRadius:30, 
        borderTopRightRadius:30, 
    }
})