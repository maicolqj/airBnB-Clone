import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import CustomHeader from "../CustomHeader";
import CustomText from "../generals/CustomText";
import WebView from "react-native-webview";


interface MyProps {
    show:boolean
    setShow:Function
    urlRedirect:string
    
}
const ModalTerms = ({show,setShow,urlRedirect}:MyProps) => {
    const handlerBack = () => {
        setShow(false)
    }
    return (
        <View >
            <Modal
                isVisible={show} 
                style={{
                    margin:0,justifyContent: 'flex-end',
                }}
                onBackdropPress={() =>handlerBack}
            >
                <View style={{...styles.continerModal,borderTopLeftRadius:20,borderTopRightRadius:20, }}>
                    {/* Header */}
                    <CustomHeader 
                        IoniconsName="close"
                        onPressBack={handlerBack}
                    >
                        <CustomText style={{fontWeight:'500'}}>Terminos y condiciones</CustomText>
                    </CustomHeader>
                    <WebView
                        source={{ uri: urlRedirect }}
                        style={styles.webView}
                        startInLoadingState={true}
                        
                    >
                    </WebView>
                </View>
            </Modal>
        </View>
    )
}

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

export default ModalTerms