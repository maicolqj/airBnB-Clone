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
    handlerBack: Function
}

const WebViewPay = ({show,setShow,urlRedirect,handlerBack, ...restProps}:MyProps) => {

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
                        onPressBack={() => handlerBack()}
                        IoniconsName="close"
                    >
                        <CustomText style={{fontWeight:'500'}}>Cerrar</CustomText>
                    </CustomHeader>
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
        backgroundColor:'white',
    },
    webView:{
        // borderTopLeftRadius:30, 
        // borderTopRightRadius:30, 
    }
})