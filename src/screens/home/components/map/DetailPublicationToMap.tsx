import React, { useContext } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Publication } from "../../../../interfaces/GlobalInterfaces";
import CustomText from "../../../../components/generals/CustomText";
import AppIntroSlider from "react-native-app-intro-slider";
import FastImage from "react-native-fast-image";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { PublicationsContext } from "../../../../context/PublicationContext";
import { colorsApp } from "../../../../styles/globalColors/GlobalColors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatCurrency, shortText } from "../../../../helpers/formats";


interface MyProps {
    publication:Publication,
    showModal:boolean
    closeModal:Function
}

const DetailPublicationToMap = ({showModal,closeModal,publication}:MyProps) =>{
    const navigation = useNavigation<any>()

    const {toggleFavorite} = useContext(PublicationsContext)

    const iconName = () =>{
      return publication.is_favorite ? 'heart' : 'heart-outline'
    }
    const iconColor = () =>{
      return publication.is_favorite ? colorsApp.primary() : 'black'
    }

    const navigateDetail = () => {
        closeModal()
        navigation.navigate('DetailsScreen', {publication: publication})
    }
    return (
        <View>
            <Modal 
                isVisible={showModal} 
                style={{bottom:hp(-20)}}
                onBackdropPress={() => closeModal()}
            >
                <View style={styles.continerModal} >

                    <View style={styles.buttomContainer}>
                        <Pressable style={styles.continerIcon}   onPress={() => toggleFavorite(publication.id)}>
                            <Icon name={iconName()} style={[styles.iconStyle]} color={iconColor()} ></Icon>
                        </Pressable>

                        <Pressable style={styles.continerIcon}  onPress={() => closeModal()}>
                            <Icon name='close' style={[styles.iconStyle]} color='black' ></Icon>
                        </Pressable>

                    </View>

                    {/* Slide de imagenes */}
                    <View style={{...styles.sliderContainer}}>
                        <AppIntroSlider
                            data={publication.images}
                            showSkipButton={false}
                            showNextButton={false}
                            showDoneButton={false}
                            renderItem={({ item }) => (
                                <Pressable 
                                    style={{ height: '100%', }} 
                                    key={item.url}
                                    onPress={() => navigateDetail()}
                                >
                                <FastImage
                                    source={{ uri: item.url, priority:'high' }}
                                    style={{ width:'100%', height: hp('30%'), borderRadius: 10}}
                                />
                                </Pressable>
                            )}
                        />
                    </View>
                    <Pressable  style={{marginHorizontal:hp(1), marginVertical:hp(1)}}  onPress={() => navigateDetail()}>
                        <View style={{ paddingVertical: 4, justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                            <CustomText style={{ fontSize: hp(2), flex: 1, fontWeight: 'bold' }}>{shortText(publication.title,25)}</CustomText>
                            {
                                publication?.qualification ?
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CustomText>
                                    <Icon name='star' style={{  fontSize: hp(2) }}></Icon>
                                    </CustomText>
                                    <CustomText >{publication?.qualification}</CustomText>
                                </View>
                                : null
                            }
                            
                        </View>

                        <CustomText style={{ fontSize: hp(2), fontWeight: 'bold', marginVertical: '1%', color:colorsApp.primary()}}>
                            {formatCurrency(publication.price?.base) } <CustomText style={{fontWeight: 'normal', color:colorsApp.primary()}}>noche</CustomText> 
                        </CustomText>
                    </Pressable>


                </View>


            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    continerModal:{
        height:hp(30), 
        // padding:20, 
        borderRadius:10, 
        // borderRightRadius:30, 
        backgroundColor:'white'
    },
    sliderContainer: {
        width: '100%',
        height: '67%',
    },

    buttomContainer: {
        width: hp(9),
        height: hp(7),
        // borderRadius: 25,
        position: 'absolute',
        // top: hp('1%'),
        right: wp('3%'),
        zIndex: 999,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row',
        // backgroundColor:'red'
    },
    iconStyle: {
        fontSize: hp(2),
    },
    continerIcon:{
        backgroundColor:'white',
        padding:hp(1),
        borderRadius:50
    }
})
export default DetailPublicationToMap