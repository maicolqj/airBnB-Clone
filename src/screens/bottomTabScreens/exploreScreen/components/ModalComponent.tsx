import { Modal, ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../../components/Generals/CustomText';
import CounterButtonComponent from './CounterButtonComponent';
import { colorsApp } from '../../../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DividerComponent from '../../../../components/DividerComponent';

import { Picker } from '@react-native-picker/picker';
import { CountersType } from '../../../../types/GlobalTypes';
import { PublicationsContext } from '../../../../context/publicationContext/PublicationContext';
import { Calendar, } from 'react-native-calendars';

interface Props {
    modalUseState: boolean,
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
    sendDataToMainScreen?: any
}

interface MarkedDates {
    [key: string]: {
        selected: boolean;
        marked: boolean;
        selectedColor?: string;
    };
}

const city = {
    "city1": "BOGOTA",
}

const ModalComponent = ({ modalUseState, setModalUseState, sendDataToMainScreen }: Props) => {

    const [isWifi, setIsWifi] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState();

    const { updateFilters } = useContext(PublicationsContext)

    const [counters, setCounters] = useState<CountersType>({
        adultos: 0,
        ninos: 0,
        bebes: 0,
        mascotas: 0,
    });

    const handleCounterChange = (counterName: keyof CountersType, value: number) => {
        setCounters(prevCounters => {
            const updatedCounterValue = prevCounters[counterName] + value;

            return {
                ...prevCounters,
                [counterName]: updatedCounterValue,
            };
        });
    };

    const handleAceptFilters = () => {
        const updated = updateFilters({
            adultos: counters.adultos,
            ninos: counters.ninos,
            bebes: counters.bebes,
            mascotas: counters.mascotas,
            checkin: selectedStartDate,
            checkout: selectedEndDate
        })
        setModalUseState(false);

    };

    const handleDayPress = (day: any) => {
        const dateStr = day.dateString;

        if (!selectedStartDate || selectedEndDate) {
            setSelectedStartDate(dateStr);
            setSelectedEndDate(null);
        } else {
            if (dateStr > selectedStartDate) {
                setSelectedEndDate(dateStr);
            } else {
                setSelectedStartDate(dateStr);
                setSelectedEndDate(null);
            }
        }
    };

    const getMarkedDates = (): MarkedDates => {
        const markedDays: MarkedDates = {};

        if (selectedStartDate) {
            markedDays[selectedStartDate] = { selected: true, marked: true };
        }

        if (selectedEndDate) {
            markedDays[selectedEndDate] = { selected: true, marked: true };
        }

        if (selectedStartDate && selectedEndDate) {
            const startDate = new Date(selectedStartDate);
            const endDate = new Date(selectedEndDate);

            for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
                const currentDateStr = currentDate.toISOString().split('T')[0];
                markedDays[currentDateStr] = { marked: true, selected: true };
            }
        }

        return markedDays;
    };


    const clearDates = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
    }


    return (
        <Modal animationType="slide"
            transparent={false}
            visible={modalUseState}
            onRequestClose={() => {

                setModalUseState(false);
            }}>

            
            <View style={{ ...styles.headerModal }}>

                <TouchableOpacity onPress={() => setModalUseState(false)}>
                    <Icon name='close' style={{ fontSize: 25, color: colorsApp.blackLeather() }}></Icon>
                </TouchableOpacity>
                <CustomText style={{ ...styles.title }} >
                    Filtros
                </CustomText>
            </View>

          


            <ScrollView style={{ ...styles.scroll }}>

            <CustomText style={{marginTop: hp('2%'), alignSelf: 'center', fontSize: hp('2%'), marginBottom: hp('4%')}}>
                Filtra tus busquedas y encuentra más rapido lo que buscas.
            </CustomText>

                <DividerComponent />


                <View style={{ width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: hp('3%') }}>
                    <Picker
                        selectedValue={selectedLocation}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLocation(itemValue)
                        }>
                        <Picker.Item label={city.city1} value={city.city1} />
                    </Picker>
                </View>

                <DividerComponent />


                {/* CALENDARIO */}
                <View style={{ width: wp('100%'), paddingHorizontal: wp('5%'), alignSelf: 'center', marginVertical: hp('3%') }}>

                    <Calendar
                        style={{
                            width: '100%',
                        }}
                        current={'2023-11-16'}
                        onDayPress={handleDayPress}
                        markedDates={getMarkedDates()}
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


                    <TouchableOpacity style={{marginVertical: hp('2%'), paddingHorizontal: wp('5%'), backgroundColor: colorsApp.blackLeather(0.90), width: wp('50%'), paddingVertical: hp('1%'), justifyContent: 'center', alignItems: 'center', borderRadius: 15}} activeOpacity={0.8} onPress={() => clearDates()}>
                        <CustomText style={{ fontSize: hp('2%'), color: '#fff'}}>
                            Borrar Fechas
                        </CustomText>
                    </TouchableOpacity>
                </View>


                <DividerComponent />

                <View style={{ ...styles.boxCounters }}>
                    <CustomText style={{ fontSize: 20 }}>
                        Adultos:
                    </CustomText>
                    {/* Counter Adults */}
                    <CounterButtonComponent counterName="adultos" onPress={handleCounterChange} counterValue={counters.adultos} />
                </View>

                <View style={{ ...styles.boxCounters }}>
                    <CustomText style={{ fontSize: 20 }}>
                        Niños:
                    </CustomText>
                    {/* Counter Kids */}
                    <CounterButtonComponent counterName="ninos" onPress={handleCounterChange} counterValue={counters.ninos} />
                </View>
                <View style={{ ...styles.boxCounters }}>
                    <CustomText style={{ fontSize: 20 }}>
                        bebés:
                    </CustomText>
                    {/* Counter Babies */}
                    <CounterButtonComponent counterName="bebes" onPress={handleCounterChange} counterValue={counters.bebes} />
                </View>
                <View style={{ ...styles.boxCounters }}>
                    <CustomText style={{ fontSize: 20 }}>
                        Mascotas:
                    </CustomText>
                    {/* Counter Pets */}
                    <CounterButtonComponent counterName="mascotas" onPress={handleCounterChange} counterValue={counters.mascotas} />
                </View>


                <TouchableOpacity onPress={handleAceptFilters} style={{ ...styles.buttomAcept }}>
                    <CustomText style={{ color: '#fff', fontSize: hp('2%') }}>
                        Buscar
                    </CustomText>
                </TouchableOpacity>

                <DividerComponent />

                <View style={{ marginBottom: hp('15%') }} />
            </ScrollView>


        </Modal>
    )
}

export default ModalComponent

const styles = StyleSheet.create({
    buttomAcept: {
        width: wp('90%'),
        height: ('5%'),
        backgroundColor: colorsApp.blackLeather(),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('5%'),
        alignSelf: 'center',
        // paddingVertical: hp('2%'),
        borderRadius: 15
    },
    headerModal: {
        width: '100%',
        height: '6%',
        backgroundColor: '#fff',
        borderTopColor: colorsApp.blackLeather(),
        borderTopWidth: 2,
        borderBottomColor: colorsApp.blackLeather(0.15),
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        zIndex: 999,
        marginTop: hp('3%')
    },
    textSubTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    title: {
        paddingHorizontal: wp('5%'),
        fontWeight: '700',
        fontSize: 18
    },
    scroll: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%')
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    descriptionFilters: {
        marginBottom: hp('5%')
    },
    boxCounters: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('3%'),
        justifyContent: 'space-between',
        marginVertical: hp('2%')
    },

    boxCards: {
        marginVertical: hp('2%'),
        paddingHorizontal: wp('2%'),
        flexDirection: 'row',
        alignItems: 'center'
    },

})