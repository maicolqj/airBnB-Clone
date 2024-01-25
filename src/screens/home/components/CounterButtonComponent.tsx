import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../../../components/Generals/CustomText';
import { CountersType } from '../../../types/GlobalTypes';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';

interface CounterButtonProps {
    counterName: keyof CountersType;
    counterValue: number;
    onPress: (counterName: keyof CountersType, value: number) => void;
}

const CounterButtonComponent = ({ counterName, onPress, counterValue=0 }: CounterButtonProps) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                style={{ width: 35, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: (counterValue <= 0 ) ? colorsApp.blackLeather(0.15) : colorsApp.blackLeather()}}
                onPress={() => onPress(counterName, -1)}
                disabled={counterValue <= 0 ? true : false}
            >
                <CustomText style={{ fontSize: 25, color: '#fff', }}>
                    -
                </CustomText>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 10, width: 45, height: 35,  justifyContent: 'center', alignItems: 'center' }}>
                <CustomText style={{ paddingHorizontal: 2 }}>
                {counterValue}
                </CustomText>
            </View>
            <TouchableOpacity
                style={{ width: 35, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
                onPress={() => onPress(counterName, 1)}
            >
                <CustomText style={{ fontSize: 25, color: '#fff' }}>
                    +
                </CustomText>
            </TouchableOpacity>
        </View>
    );
};


export default CounterButtonComponent

const styles = StyleSheet.create({})