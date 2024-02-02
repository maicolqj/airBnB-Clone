import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import HeaderScreenTab from "../../components/HeaderScreenTab";

const Messages = () => {
    return (
        <SafeAreaView style={customStyles.safeArea}>
            <HeaderScreenTab title="Mensajes" />
        </SafeAreaView>
    )
}

export default Messages