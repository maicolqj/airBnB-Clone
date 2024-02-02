import React, { useContext, useEffect } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
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
    useEffect(()=>{
        loadReserves()
    },[])

      

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
                // refreshControl={
                //   <RefreshControl refreshing={true} onRefresh={handleRefresh}></RefreshControl >
                // }
                style={{paddingHorizontal:(4)}}
                showsVerticalScrollIndicator={false}
                data={dataReserve.reserves}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (dataReserve.isLoading && <ActivityIndicator size="large" color={colorsApp.primary()} />)}
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