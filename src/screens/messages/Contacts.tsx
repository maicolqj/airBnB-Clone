import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import HeaderScreenTab from "../../components/HeaderScreenTab";
import { ChatContext } from "../../context/ChatContext";
import { FlatList } from "react-native-gesture-handler";
import { Contact } from "../../interfaces/Chat";
import FastImage from "react-native-fast-image";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../routes/stackNavigation/InitialStackNavigation";
import { AuthContext } from "../../context/AuthContext";

const imageProfileDefault = require("../../assets/system/default/user_default.jpeg");

interface Props extends StackScreenProps<RootInitialStackParams, 'Contacts'> { }

const Contacts = ({navigation}:Props) => {
    const {
        optionContact,
        getContacts, 
        contacts,
        loadingContacts
    } = useContext(ChatContext)

    const {user} = useContext(AuthContext)

    // para saber si se esta haciendo un refresh
    const [refreshing, setRefreshing] = useState<boolean>(false);

    // para consultar por primera vez los contactos
    useEffect(()=>{
        getContacts(true)
    },[])

    // para consultar nuevamente los contactos cundo se hace refresh
    useEffect(()=>{
        if (refreshing) {
            getContacts(true)
        }
    },[refreshing])

    /*Cuando el loadingContacts este el false, es decir, que ya no se esta 
    consultado contactos pasar el refreshing a false para indicar que se terminó de hacer el refresh*/
    useEffect(()=>{
        if (!loadingContacts) {
            setRefreshing(false)
        }
    },[loadingContacts])

    // cuando indica que quiere hacer refresh marcar flag de refreshing en true para indicar que se iniciará a refrescar
    const handleRefresh = () =>{
        setRefreshing(true)
    }

    // cuando llege al final del scroll consultar más contactos
    const handleScrollEnd = () => {
        if (loadingContacts || !optionContact.isMorePage) {
            return
        }
        getContacts()
    }

    const goContactMessages = (contact:Contact) =>{
        navigation.navigate('ContactMessages', {contact:contact})
    }

    const renderItem = (contact:Contact) => {
        return (
            <TouchableOpacity style={styles.containerItem} onPress={() => goContactMessages(contact)}>
                <View>
                    <FastImage
                        source={{ uri: user?.id == contact.to_user_id ? contact.from_user.image : contact.to_user.image , priority:'high' }}
                        style={styles.imageItem}
                        defaultSource={imageProfileDefault}
                    />
                </View>

                <View style={styles.containerText}>
                    <CustomText style={styles.textUsers}>
                        {user?.id == contact.to_user_id ? contact.from_user.name : contact.to_user.name }
                    </CustomText>
                    {contact.reserve_id && (
                        <CustomText style={{fontSize:hp(1.4)}}>{`Reserva #${contact.reserve_id}`}</CustomText>
                    )}
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={customStyles.safeArea}>
            <HeaderScreenTab title="Mensajes" />

            <FlatList
                refreshControl={
                  <RefreshControl tintColor={colorsApp.primary()} refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl >
                }
                style={{paddingHorizontal:(4)}}
                showsVerticalScrollIndicator={false}
                data={contacts}
                keyExtractor={(item) => item.reserve_id.toString()}
                onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => ((loadingContacts && !refreshing) && <ActivityIndicator size="large" color={colorsApp.primary()} />)}
                renderItem={({item}) => renderItem(item)}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    containerItem:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:wp(3),
        paddingVertical:hp(2),
        borderBottomWidth:hp(0.2),
        borderBottomColor:colorsApp.light(0.1)
    },
    imageItem:{
        width: hp(6),
        height: hp(6),
        borderRadius: wp("50%"),
    },
    containerText:{
        marginLeft:wp(3)
    },
    textUsers:{
        fontWeight:'bold',
        fontSize:hp(2),
    },
   
})
export default Contacts