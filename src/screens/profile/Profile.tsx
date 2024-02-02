import React from "react";
import { SafeAreaView, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import HeaderScreenTab from "../../components/HeaderScreenTab";

const Profile = () => {
    return (
        <SafeAreaView style={customStyles.safeArea}>
        <HeaderScreenTab title="Perfil" />
    </SafeAreaView>
    )
}

export default Profile