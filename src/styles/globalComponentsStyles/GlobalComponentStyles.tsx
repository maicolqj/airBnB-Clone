import { Platform, StyleSheet } from "react-native";
import { colorsApp } from "../globalColors/GlobalColors";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const customStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === 'android' ? hp(3) : 0
    },
    button:{
        marginVertical:hp(1),
        backgroundColor:colorsApp.primary(1),
        padding:hp(1.7),
        alignItems:'center',
        borderRadius:hp(1.2)
    }
});