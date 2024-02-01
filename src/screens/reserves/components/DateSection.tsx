import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../../components/generals/CustomText";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ReserveContext } from "../../../context/ReserveContext";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";


const DateSection = () =>{
    const {reserveSelected} = useContext(ReserveContext)

    const navigation = useNavigation<any>()

    const formatDate = (date?:string) => {
        if (date) {
            const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
            const fechaObj = new Date(date);
            const diaSemana = diasSemana[fechaObj.getDay()];
            const dia = fechaObj.getDate();
            const mes = fechaObj.toLocaleString('es', { month: 'short' });
            const anio = fechaObj.getFullYear();
    
            return `${diaSemana}, ${dia} de ${mes}. de ${anio}`;
        }
        return ''
    }

    return (
        <View style={{...styles.section}}>
            <View style={{width:'72%'}}>
                <CustomText style={{fontSize:hp(1.6)}}>
                    {formatDate(reserveSelected?.start_date)} <Icon name='arrow-forward-outline' style={{ marginVertical: wp('10') }}></Icon> {formatDate(reserveSelected?.end_date)}
                </CustomText>
                
                <CustomText style={{fontSize:hp(1.6), fontWeight:'400', paddingTop:hp(0.6)}}>{reserveSelected?.publication.rel_categoria?.name} - {reserveSelected?.guest_quantity} huesped</CustomText>
                
                <CustomText style={{fontSize:hp(1.6), fontWeight:'600', paddingTop:hp(0.6)}}>Anfitrion: {reserveSelected?.publication?.user?.name}</CustomText>

                <Pressable
                    onPress={() => navigation.navigate('DetailsScreen', {publication:reserveSelected?.publication})}
                >
                    <CustomText style={styles.textGoPublication}>
                        Ir al anuncio
                    </CustomText>
                </Pressable>
            </View>
            <View >
                <FastImage
                    source={{ uri: reserveSelected?.publication?.images[0]?.url, priority:'normal' }}
                    style={styles.image}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    section:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:hp(2),
        paddingVertical:hp(2),
        borderBottomWidth:wp(0.1),
        borderBottomColor:colorsApp.light()
    },
    textGoPublication: {
        fontSize:hp(1.6), 
        fontWeight:'500', 
        paddingTop:hp(0.6), 
        textDecorationLine:"underline", 
        color:colorsApp.primary()
    },
    image:{
        width:wp('25%'),
        height:hp(9),
        borderRadius:hp(1)
    },
})

export default DateSection