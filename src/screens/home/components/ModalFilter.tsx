import { ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../components/generals/CustomText';
import CounterButtonComponent from './CounterButtonComponent';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DividerComponent from '../../../components/DividerComponent';
import Modal from "react-native-modal";
import { CountersType } from '../../../types/GlobalTypes';
import { PublicationsContext } from '../../../context/PublicationContext';
import { Calendar, } from 'react-native-calendars';
import moment from 'moment';
import CustomSelect from '../../../components/generals/CustomSelect';
import RangePrice from '../../../components/RangePrice';

interface Props {
    modalUseState: boolean,
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
}

interface MarkedDates {
    [key: string]: {
        selected: boolean;
        marked: boolean;
        selectedColor?: string;
    };
}

const themCalendar = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: colorsApp.blackLeather(),
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#2d4150',
    textDisabledColor: colorsApp.blackLeather(0.25)
}

const ModalFilter = ({ modalUseState, setModalUseState }: Props) => {
    const { updateFilters } = useContext(PublicationsContext)
    // complementos para armar los filtros
    const {complementFilters} = useContext(PublicationsContext)
    // se almacena la fecha inicial seleccionada
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    // se almacena la fecha final seleccionada
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    // se almacenan los counters de los guestTpes
    const [counters, setCounters] = useState<object>({});
    // se almacenan la ciudad seleccionada
    const [city, setCity] = useState<any>(null);
    // se almacenan el precio minimo seleccionado
    const [minPrice, setMinPrice] = useState(20000);
    // se almacenan el precio maximo seleccionado
    const [maxPrice, setMaxPrice] = useState(2000000);

    const handleCounterChange = (counterName: keyof CountersType, value: number) => {
        setCounters((prevCounters:any) => {
            const updatedCounterValue = prevCounters[counterName] + value;
            return {
                ...prevCounters,
                [counterName]: updatedCounterValue,
            };
        });
    };

    useEffect(() =>{
        let moreFilters:any = {};
        complementFilters?.guestTpes.forEach((item:any) => {
            moreFilters[item.data] = 0
        });
        setCounters(moreFilters)
        
        if (complementFilters?.cities && complementFilters.cities.length > 0) {
            setCity(complementFilters.cities[0])
        }
    },[complementFilters])


    const onPressFilter = () => {
        updateFilters({
            ...counters,
            checkin: selectedStartDate,
            checkout: selectedEndDate,
            price_min: minPrice,
            price_max: maxPrice
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
        <View>
            <Modal 
                isVisible={modalUseState}
                style={{margin:0,justifyContent: 'flex-end'}}
                onBackdropPress={() => setModalUseState(false)}
                animationIn={'fadeInUp'}
                animationInTiming={800}
            >
                <View style={styles.continerModal}>
                    {/* Header */}
                    <View style={{ ...styles.headerModal }}>
                        <TouchableOpacity onPress={() => setModalUseState(false)}>
                            <Icon name='close' style={{ fontSize: 25, color: colorsApp.blackLeather() }}></Icon>
                        </TouchableOpacity>
                        <CustomText style={{ ...styles.title }} >Filtros</CustomText>
                    </View>

                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                    >
                        <CustomText 
                            style={{marginTop: hp('2%'), marginBottom: hp('4%')}}>
                            Filtra tus busquedas y encuentra más rapido lo que buscas.
                        </CustomText>

                        {/* Rango de precios */}
                        <RangePrice
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                        />
                        <DividerComponent style={{width:'100%', marginVertical:hp(2)}} />


                        {/* Ciudaddes */}
                        <CustomSelect
                            value={city}
                            onChange={(value:any) => setCity(value)}
                            options={complementFilters?.cities ?? []}
                        />
                        <DividerComponent style={{width:'100%', marginVertical:hp(2)}} />

                        {/* CALENDARIO */}
                        <View style={{ width: wp('100%'), paddingHorizontal: wp('5%'), alignSelf: 'center', marginVertical: hp('1%') }}>

                            <Calendar
                                style={{width: '100%',}}
                                current={moment().format('YYYY-MM-DD')}
                                onDayPress={handleDayPress}
                                markedDates={getMarkedDates()}
                                theme={themCalendar}
                            />

                            <TouchableOpacity 
                                onPress={() => clearDates()}
                                style={{
                                    justifyContent:'flex-end',
                                    alignItems:'flex-end',
                                    marginHorizontal:wp(3)
                                }}
                            >
                                <CustomText style={styles.textCleanDates}>Borrar Fechas </CustomText>
                            </TouchableOpacity>
                        </View>

                        <DividerComponent style={{width:'100%', marginVertical:hp(2)}} />
                        {
                            complementFilters?.guestTpes && complementFilters.guestTpes.map((item:any, key:number) => {
                                return (
                                    <View style={{ ...styles.boxCounters }} key={key}>
                                        <CustomText >{item.name}:</CustomText>
                                        <CounterButtonComponent counterName={item.data} onPress={handleCounterChange} counterValue={counters[item.data]} />
                                    </View>
                                )
                            })
                        }
                    </ScrollView>

                    <TouchableOpacity onPress={onPressFilter} style={{ ...styles.buttomAcept }}>
                        <CustomText style={{ color: '#fff', fontWeight:'bold' }}>Buscar</CustomText>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    )
}

export default ModalFilter

const styles = StyleSheet.create({
    continerModal:{
        height:'90%',
        width:'100%',
        padding:20, 
        borderTopLeftRadius:15, 
        borderTopRightRadius:15, 
        backgroundColor:'white'
    },
    buttomAcept: {
        width: wp('90%'),
        paddingVertical:hp(1.5),
        backgroundColor: colorsApp.blackLeather(),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(1),
        alignSelf: 'center',
        // paddingVertical: hp('2%'),
        borderRadius: 15
    },
    headerModal: {
        width: '100%',
        height: '6%',
        backgroundColor: '#fff',
        borderBottomColor: colorsApp.blackLeather(0.15),
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        // zIndex: 999,
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
        paddingHorizontal: wp(3),
        justifyContent: 'space-between',
        marginVertical: hp(1.3)
    },

    boxCards: {
        marginVertical: hp(1.3),
        paddingHorizontal: wp(2),
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCleanDates: {
       textDecorationLine:'underline'
    }

})