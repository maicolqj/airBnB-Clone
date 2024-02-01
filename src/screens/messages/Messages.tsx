import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";

const Messages = () => {
    return (
        <SafeAreaView style={{backgroundColor:'white', flex:1}}>
            <View style={styles.constainerText}>
                <CustomText style={styles.title}>Mensajes</CustomText>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    constainerText:{
        paddingLeft:hp(2),
        paddingVertical:hp(1.3),
        borderBottomWidth:wp(0.1),
        borderBottomColor:colorsApp.light(1)
    },
    title:{
        fontWeight:'500',
        fontSize:hp(3)
    }
})
export default Messages