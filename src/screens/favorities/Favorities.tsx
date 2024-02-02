import React from "react";
import { SafeAreaView, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import HeaderScreenTab from "../../components/HeaderScreenTab";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";

const Favorities = () => {
    return (
        <SafeAreaView style={customStyles.safeArea}>
            <HeaderScreenTab title="Favoritos" />
        </SafeAreaView>
    )
}

export default Favorities