import React, { useContext, useEffect } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import HeaderScreenTab from "../../components/HeaderScreenTab";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import { PublicationsContext } from "../../context/PublicationContext";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import ItemPublication from "../home/components/ItemPublication";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../routes/stackNavigation/InitialStackNavigation";

interface Props extends StackScreenProps<RootInitialStackParams, 'Favorites'> { }
const Favorities = ({navigation}:Props) => {
    const {loadFavorities,favorities} = useContext(PublicationsContext)
    useEffect(()=>{
        loadFavorities()
    },[])

    const handleScrollEnd = (event: any) => {
        if (favorities.isLoading || !favorities.isMorePage) {
          return;
        }
        loadFavorities()
      };
    return (
        <SafeAreaView style={customStyles.safeArea}>
            <HeaderScreenTab title="Favoritos" />
            <View
            style={styles.container}
            >
                <FlatList
                    // refreshControl={
                    //   <RefreshControl refreshing={true} onRefresh={handleRefresh}></RefreshControl>
                    // }
                    style={styles.containerFlatList}
                    showsVerticalScrollIndicator={false}
                    data={favorities.publications}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={handleScrollEnd}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => (favorities.isLoading && <ActivityIndicator size="large" color={colorsApp.primary()} />)}
                    renderItem={({item}) => <ItemPublication navigation={navigation} publication={item} />}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    containerFlatList:{
        marginBottom:hp(6), 
        marginTop:hp(1)
    },
    container:{
        width: '100%',
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    }
})
export default Favorities