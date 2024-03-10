import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { ReserveContext } from "../../context/ReserveContext";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import ItemReserve from "./components/ItemReserve";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import moment from "moment";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import HeaderScreenTab from "../../components/HeaderScreenTab";

const Reserves = () => {
    const {dataReserve,loadReserves} = useContext(ReserveContext)

    // para saber si se esta haciendo un refresh
    const [refreshing, setRefreshing] = useState<boolean>(false);

    // para consultar por primera vez las reservas
    useEffect(()=>{
        loadReserves()
    },[])

    // para consultar nuevamente las reservas cundo se hace refresh
    useEffect(()=>{
        if (refreshing) {
            loadReserves(true)
        }
    },[refreshing])

    /*Cuando el isLoading este el false, es decir, que ya no se esta 
    consultado resrvas pasar el refreshing a false para indicar que se terminó de hacer el refresh*/
    useEffect(()=>{
        if (!dataReserve.isLoading ) {
            setRefreshing(false)
        }
    },[dataReserve.isLoading ])

    // cuando indica que quiere hacer refresh marcar flag de refreshing en true para indicar que se iniciará a refrescar
    const handleRefresh = () =>{
        setRefreshing(true)
    }
      
    // cuando llege al final del scroll consultar más reservas
    const handleScrollEnd = () => {
        if (dataReserve.isLoading || !dataReserve.isMorePage) {
            return
        }
        loadReserves()
    }
    return (
        <SafeAreaView style={customStyles.safeArea}>
            <HeaderScreenTab title="Viajes" />
            <FlatList
                refreshControl={
                    <RefreshControl tintColor={colorsApp.primary()} refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl >
                }
                style={{paddingHorizontal:(4)}}
                showsVerticalScrollIndicator={false}
                data={dataReserve.reserves}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => ((dataReserve.isLoading && !refreshing) && <ActivityIndicator size="large" color={colorsApp.primary()} />)}
                renderItem={({item}) => <ItemReserve reserve={item} />}
            />
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
export default Reserves