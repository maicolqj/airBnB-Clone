import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../Generals/CustomText";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { shortFormatDate } from "../../helpers/formats";
import { PublicationsContext } from "../../context/publicationContext/PublicationContext";
import { Image } from "@rneui/themed";
import { colorsApp } from "../../styles/globalColors/GlobalColors";

const ImageAndTitle = ()=>{
    const {publicationSelected} = useContext(PublicationsContext)
    return (
        <View style={styles.sectionImage}>
            <View style={styles.containerImage}>
                <Image
                    source={{ uri: publicationSelected?.images[0].url }}
                    style={{ width: '92%', height: '98%', borderRadius:hp(1)}}
                />
            </View>
            <View style={{width:'60%'}}>
                <CustomText
                    style={{
                        fontSize:hp(1.4),
                        color:colorsApp.light(),
                        marginBottom:hp(1)
                    }}
                >
                    Estadía en {publicationSelected?.city?.name}
                </CustomText>
                <CustomText
                    style={{
                        fontSize:hp(1.5)
                    }}
                >
                    {publicationSelected?.title}
                </CustomText>
            </View>
        </View>
    )
}
export default ImageAndTitle

const styles = StyleSheet.create({
    sectionImage:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:hp(15),
        paddingHorizontal:hp(2),
        paddingVertical:hp(2)
    },
    containerImage:{
        width: '40%',
    },
})