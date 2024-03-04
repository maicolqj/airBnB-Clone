import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import Modal from "react-native-modal";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";
import { PublicationsContext } from "../../../context/PublicationContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from "../../../components/generals/CustomText";
import { formatCurrency, formatEsCalendar, reserveFormatDate } from "../../../helpers/formats";


const RangeReserve = () => {
    // Dar formato en español al calendario
    LocaleConfig.locales['es'] = formatEsCalendar()
    LocaleConfig.defaultLocale = 'es';

    const minDate = moment().format('YYYY-MM-DD')
    const maxDate = moment().add(8,'M').format('YYYY-MM-DD')

    const [correctDates, setCorrectDates] = useState<boolean>(false)


    const {
        showRangeReserve, 
        setShowRangeReserve, 
        handleDayPress, 
        getMarkedDates, 
        setInitalDates, 
        quantityRangeSelected,
        selectedStartDate,
        selectedEndDate,
        publicationSelected
    } = useContext(PublicationsContext)

    useEffect(()=>{
        if (selectedStartDate && selectedEndDate) {
            setCorrectDates(true)
        }else{
            setCorrectDates(false)
        }
    },[selectedStartDate,selectedEndDate])

    return (
        <View>
            <Modal 
                isVisible={showRangeReserve} 
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => setShowRangeReserve(false)}
            >
                <View style={styles.continerModal}>
                    {/* Header */}
                    <View style={styles.containerHeader}>
                        <Pressable
                            onPress={() => setShowRangeReserve(false)}
                            disabled={correctDates ? false : true}
                        >
                            <Icon name='close' style={{ fontSize:hp(2.5), opacity: correctDates ? 1 : 0.4 }}></Icon>
                        </Pressable>
                        <Pressable
                            onPress={() => setInitalDates()}
                        >
                            <CustomText style={{textDecorationLine:'underline'}}>Resetear fechas</CustomText>
                        </Pressable>
                    </View>
                    {/* Noches y fechas seleccionadas */}
                    <View 
                        style={{marginBottom:hp(5)}}
                    >
                        <CustomText style={{fontSize:hp(2.5), fontWeight:'500'}}>{quantityRangeSelected} {quantityRangeSelected > 1 ? 'noches' : 'noche'}</CustomText>
                        <CustomText style={{fontSize:hp(1.6), fontWeight:'300'}}>{reserveFormatDate(selectedStartDate)} - {reserveFormatDate(selectedEndDate)}</CustomText>
                    </View>

                    {/* Calendario */}
                    <View style={{alignItems:'center',}}>
                        {
                            selectedStartDate &&
                            <CalendarList
                                onDayPress={(day) => handleDayPress(day)}
                                markingType={'period'}
                                markedDates={getMarkedDates()}
                                scrollEnabled={true}
                                minDate={minDate}
                                maxDate={maxDate}
                                calendarWidth={wp(85)}
                                // displayLoadingIndicator={true}
                                theme={{
                                    backgroundColor: '#ffffff',
                                    calendarBackground: '#ffffff',
                                    textSectionTitleColor: '#b6c1cd',
                                    selectedDayBackgroundColor: colorsApp.blackLeather(),
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: '#00adf5',
                                    dayTextColor: '#2d4150',
                                    textDisabledColor: colorsApp.blackLeather(0.25)
                                }}
                            />
                        }
                    </View>
                </View>

                <View style={styles.footerModal}>
                    <View>
                        <CustomText style={{fontSize:hp(2), fontWeight:'bold' }}>
                            {formatCurrency(publicationSelected?.price?.base ?? 0)}
                            <CustomText style={{fontSize:hp(1.7), fontWeight:'normal'}}> noche</CustomText>
                        </CustomText>
                    </View>
                    <TouchableOpacity 
                        disabled={correctDates ? false : true} 
                        style={{ ...styles.buttomFooter, opacity: correctDates ? 1 : 0.4 }}
                        onPress={()=>{setShowRangeReserve(false)}}
                    >
                        <CustomText style={{ color: '#fff', fontSize: hp(1.8), fontWeight:"bold" }}>
                            Guardar
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    continerModal:{
        height:'94%', 
        padding:20, 
        borderTopLeftRadius:30, 
        borderTopRightRadius:30, 
        backgroundColor:'white'
    },
    containerHeader:{
        marginBottom:hp(2),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    footerModal: {
        position: 'absolute',
        bottom: hp(0),
        width: wp('100%'),
        // height: hp('18%'),
        backgroundColor: '#fff',
        // justifyContent: 'center',
        // flexDirection: 'row',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        paddingBottom:hp(2.5),
        borderTopColor:"black",
        borderTopWidth:hp(0.02),
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center'
    },
    buttomFooter: {
        padding:hp(1.2),
        borderRadius: hp(1),
        backgroundColor: colorsApp.blackLeather(),
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default RangeReserve