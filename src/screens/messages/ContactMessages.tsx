import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../components/generals/CustomText";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import { customStyles } from "../../styles/globalComponentsStyles/GlobalComponentStyles";
import { ChatContext } from "../../context/ChatContext";
import { FlatList } from "react-native-gesture-handler";
import {  Message } from "../../interfaces/Chat";
import FastImage from "react-native-fast-image";
import { StackScreenProps } from "@react-navigation/stack";
import { RootInitialStackParams } from "../../routes/stackNavigation/InitialStackNavigation";
import CustomHeader from "../../components/CustomHeader";
import { AuthContext } from "../../context/AuthContext";
import CustomInput from "../../components/generals/CustomInput";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const imageProfileDefault = require("../../assets/system/default/user_default.jpeg");

interface Props extends StackScreenProps<RootInitialStackParams, 'ContactMessages'> { }

const ContactMessages = ({navigation,route}:Props) => {
    //Obtener contacto que llega por props
    const contactProps = route.params.contact
    //Obtener isNewContact que llega por props, se utiliza para saber si se debe agregar a la lista de contactos
    const isNewContact = route.params.isNewContact
   

    const {user} = useContext(AuthContext)
    const {
        currentContact,
        setCurrentContact,
        getMessages,
        searchMessage,
        loadingSendMessage,
        sendMessage,
        updateSearchMessage
    } = useContext(ChatContext)

    // valor del input en el que se esta escribiendo
    const [textMessge, setTextMessage] = useState<string>()
    // ref del flatList
    const flatListRef = useRef(null);

    // para saber si se esta haciendo un refresh
    const [refreshing, setRefreshing] = useState<boolean>(false);

    // Setear el current contact
    useEffect(()=>{
        setCurrentContact(contactProps)
    },[contactProps])

     // Buscar los mensajes
    useEffect(()=>{
        if (currentContact) {
            // console.log('currentContact',currentContact);
            (async () => {
                await getMessages(true)
            })()
        }
    },[currentContact])

    // para mover el scroll al final de la pantalla
    useEffect(()=>{
        if (flatListRef.current) {
            try {
                flatListRef.current.scrollToEnd({ animated: true});
            } catch (error:any) {
                console.error('error flatListRef', error);
            }
        }
    },[searchMessage.messages])

    // para consultar nuevamente los contactos cundo se hace refresh
    useEffect(()=>{
        if (refreshing) {
            console.log('refreshing',currentContact);
            getMessages()
        }
    },[refreshing])

    /*Cuando el loadingContacts este el false, es decir, que ya no se esta 
    consultado contactos pasar el refreshing a false para indicar que se terminó de hacer el refresh*/
    useEffect(()=>{
        if (!searchMessage.isLoading) {
            setRefreshing(false)
        }
    },[searchMessage.isLoading])

    // cuando indica que quiere hacer refresh marcar flag de refreshing en true para indicar que se iniciará a refrescar
    const handleRefresh = () =>{
        if (searchMessage.isLoading || !searchMessage.isMorePage) {
            return
        }
        setRefreshing(true)
    }

    const handlerBack = () =>{
        navigation.pop()
    }

    const handlerSendMessage = () =>{
        try {
            if (!textMessge) {
                return
            }
            sendMessage(textMessge,isNewContact)
            setTextMessage(undefined)
        } catch (error:any) {
            console.log(error.message);
        }
    }

    const renderMessage = (message:Message) => {
        return (
            <View>
                {
                    user?.id == message.from_user_id ?
                    <View style={{...styles.containerItem, justifyContent:'flex-end'}}>
                        <View style={styles.containerText}>
                            <CustomText style={{fontSize:hp(1.4)}}>{message.message}</CustomText>
                        </View>
                    </View>
                    :
                    <View style={{...styles.containerItem}}>
                        <View style={{...styles.containerText,backgroundColor:colorsApp.light(0.4)}}>
                            <CustomText style={{fontSize:hp(1.4)}}>{message.message}</CustomText>
                        </View>
                    </View>

                }
            </View>
        )
    }

   

    return (
        <SafeAreaView style={customStyles.safeArea}>

            {/* Header */}
            <CustomHeader onPressBack={handlerBack}>
                {currentContact && (
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View>
                            <FastImage
                                source={{ uri: user?.id == currentContact.to_user_id ? currentContact.from_user.image : currentContact.to_user.image, priority:'high' }}
                                style={styles.imageItem}
                                defaultSource={imageProfileDefault}
                            />
                        </View>
                        <View>
                            <CustomText style={{fontWeight:'bold'}}>
                                {user?.id == currentContact.to_user_id ? currentContact.from_user.name : currentContact.to_user.name}
                            </CustomText>
                            <CustomText style={{fontSize:hp(1.4)}}>{`Reserva #${currentContact.reserve_id}`}</CustomText>
                        </View>
                    </View>
                )}
            </CustomHeader>

            {/* Lista de mensajes */}
            <FlatList
                ref={flatListRef}
                refreshControl={
                    <RefreshControl tintColor={colorsApp.primary()} refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl >
                }
                style={{paddingHorizontal:(4), marginBottom:hp(7.5)}}
                showsVerticalScrollIndicator={false}
                data={searchMessage.messages}
                keyExtractor={(item) => item.id.toString()}
                // onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.1}
                // ListFooterComponent={() => (searchMessage.isLoading  && <ActivityIndicator size="large" color={colorsApp.primary()} />)}
                renderItem={({item}) => renderMessage(item)}
            />

            {/* Input chat */}
            <View style={{ ...styles.containerFixed }}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{width:wp('75%')}}>
                        <CustomInput
                            style={styles.input}
                            autoFocus={true}
                            multiline
                            numberOfLines={4}
                            onChangeText={(value) => setTextMessage(value)}
                            value={textMessge}
                        />
                    </View>


                    <TouchableOpacity style={styles.btnSend} disabled={loadingSendMessage} onPress={() => handlerSendMessage()}>
                        {
                            loadingSendMessage ?
                                <ActivityIndicator color='white'></ActivityIndicator>
                            :
                                <Icon name='send' color='white' style={{ fontSize:hp(2.5) }}></Icon>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    containerItem:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:wp(3),
        marginTop:hp(1),
    },
    imageItem:{
        width: hp(6),
        height: hp(6),
        borderRadius: wp("50%"),
    },
    containerText:{
        backgroundColor:colorsApp.primary(0.5),
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.5),
        borderRadius: 18,
    },
    textUsers:{
        fontWeight:'bold',
        fontSize:hp(2),
    },

    containerFixed: {
        position: 'absolute',
        bottom: hp(1),
        width: wp('100%'),
        // height: hp('12%'),
        backgroundColor: '#fff',
        justifyContent: 'center',
        // flexDirection: 'row',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        paddingBottom:hp(2.5),
        borderTopColor:"black",
        borderTopWidth:hp(0.05)
    },
    input:{
        fontSize:hp(1.7),
        paddingVertical:hp(1),
        borderWidth:hp(0.1),
        borderColor:colorsApp.light(),
        backgroundColor:colorsApp.light(0.06),
        maxHeight:hp(6)
    },
    btnSend:{
        // width:wp('20%'),
        backgroundColor:colorsApp.primary(),
        padding:hp(1),
        borderRadius:50
    }

})
export default ContactMessages