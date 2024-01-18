import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import CustomText from "../Generals/CustomText";
import Modal from "react-native-modal";
import Init from "../Splash/Init";

interface MyProps {
    show:boolean
    setShow:Function
}
const WebViewPay = ({show,setShow}:MyProps) => {

    return (
        <View >
            <Modal 
                isVisible={show} 
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => setShow(false)}
            >
                <View style={styles.continerModal}>
                    <WebView
                        source={{ uri: 'https://reactnative.dev/' }}
                        style={styles.webView}
                        startInLoadingState={true}
                       
                        // renderLoading={() => 
                        //     <View style={{flex:1, justifyContent:'center', alignItems:'center', height:'100%'}}>
                        //         <ActivityIndicator/>
                        //     </View>
                        // }
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