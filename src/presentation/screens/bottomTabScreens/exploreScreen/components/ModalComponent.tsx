import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextComponent from '../../../../components/CustonTextComponent';
import CounterButtonComponent from './CounterButtonComponent';
import { colorsApp } from '../../../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DividerComponent from '../../../../components/DividerComponent';

import CustomSwitch from '../../../../components/CustomSwitch';
import { CountersType } from '../../../../../domain/GlobalTypes';
import { PublicationsContext } from '../../../../context/publicationContext/PublicationContext';

interface Props {
    modalUseState: boolean,
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
    sendDataToMainScreen?: any

}



const ModalComponent = ({ modalUseState, setModalUseState, sendDataToMainScreen }: Props) => {

    const [isWifi, setIsWifi] = useState(false);
    const {updateFilters} = useContext(PublicationsContext)

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
        })
    };

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
                <CustomTextComponent style={{ ...styles.title }} >
                    Filtros
                </CustomTextComponent>
            </View>


            <ScrollView style={{ ...styles.scroll }}>

                <CustomTextComponent style={{ ...styles.descriptionFilters }}>
                    Filtra tus busquedas y encuentra más rapido lo que buscas.
                </CustomTextComponent>


                <DividerComponent />

                <View style={{ ...styles.boxCards, paddingHorizontal: wp('2%'), }}>
                    <CustomTextComponent style={{ ...styles.title, fontSize: 22 }}>
                        Servicios
                    </CustomTextComponent>
                </View>
                <View style={{ ...styles.boxCards, justifyContent: 'space-between', paddingHorizontal: wp('2%'), }}>
                    <CustomTextComponent style={{ ...styles.textSubTitle }}>
                        Wifi
                    </CustomTextComponent>
                    <CustomSwitch isOn={isWifi} onChange={setIsWifi} />
                </View>
                <View style={{ ...styles.boxCards, justifyContent: 'space-between', paddingHorizontal: wp('2%'), }}>
                    <CustomTextComponent style={{ ...styles.textSubTitle }}>
                        Cocina
                    </CustomTextComponent>
                    <CustomSwitch isOn={isWifi} onChange={setIsWifi} />
                </View>
                <View style={{ ...styles.boxCards, justifyContent: 'space-between', paddingHorizontal: wp('2%'), }}>
                    <CustomTextComponent style={{ ...styles.textSubTitle }}>
                        Jacuzzi
                    </CustomTextComponent>
                    <CustomSwitch isOn={isWifi} onChange={setIsWifi} />
                </View>
                <View style={{ ...styles.boxCards, justifyContent: 'space-between', paddingHorizontal: wp('2%'), }}>
                    <CustomTextComponent style={{ ...styles.textSubTitle }}>
                        Gym
                    </CustomTextComponent>
                    <CustomSwitch isOn={isWifi} onChange={setIsWifi} />
                </View>

                <DividerComponent />

                <View style={{ ...styles.boxCounters }}>
                    <CustomTextComponent style={{ fontSize: 20 }}>
                        Adultos:
                    </CustomTextComponent>
                    {/* Counter Adults */}
                    <CounterButtonComponent counterName="adultos" onPress={handleCounterChange} counterValue={counters.adultos} />
                </View>

                <View style={{ ...styles.boxCounters }}>
                    <CustomTextComponent style={{ fontSize: 20 }}>
                        Niños:
                    </CustomTextComponent>
                    {/* Counter Kids */}
                    <CounterButtonComponent counterName="ninos" onPress={handleCounterChange} counterValue={counters.ninos} />
                </View>
                <View style={{ ...styles.boxCounters }}>
                    <CustomTextComponent style={{ fontSize: 20 }}>
                        bebés:
                    </CustomTextComponent>
                    {/* Counter Babies */}
                    <CounterButtonComponent counterName="bebes" onPress={handleCounterChange} counterValue={counters.bebes} />
                </View>
                <View style={{ ...styles.boxCounters }}>
                    <CustomTextComponent style={{ fontSize: 20 }}>
                        Mascotas:
                    </CustomTextComponent>
                    {/* Counter Pets */}
                    <CounterButtonComponent counterName="mascotas" onPress={handleCounterChange} counterValue={counters.mascotas} />
                </View>


            <TouchableOpacity onPress={handleAceptFilters} style={{...styles.buttomAcept}}>
                <CustomTextComponent style={{color: '#fff', fontSize: 20}}>
                    Aceptar
                </CustomTextComponent>
            </TouchableOpacity>

            <DividerComponent />

            <View style={{marginVertical: hp('5%')}}/>
            </ScrollView>


        </Modal>
    )
}

export default ModalComponent

const styles = StyleSheet.create({
    buttomAcept: {
        width: wp('90%'),
        height: ('6%'),
        backgroundColor: colorsApp.blackLeather(),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('5%'),
        alignSelf: 'center',
        paddingVertical: hp('2%'),
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
        paddingHorizontal: wp('5%')
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
        paddingVertical: hp('5%')
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
        marginVertical: hp('5%')
    },

    boxCards: {
        marginVertical: hp('2%'),
        paddingHorizontal: wp('2%'),
        flexDirection: 'row',
        alignItems: 'center'
    },

})