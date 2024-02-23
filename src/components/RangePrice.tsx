import React, { useState } from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider'
import CustomText from './generals/CustomText';
import { formatCurrency } from '../helpers/formats';
import { colorsApp } from '../styles/globalColors/GlobalColors';

interface MyProps {
    minPrice:number
    setMinPrice: Function
    maxPrice:number
    setMaxPrice: Function
}
const RangePrice = ({minPrice,setMinPrice,maxPrice,setMaxPrice}:MyProps) => {

    const handleMinPriceChange = (value:number) => {
        if (value <= maxPrice) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (value:number) => {
        if (value >= minPrice) {
            setMaxPrice(value);
        }
    };

    return (
        <View>
            <CustomText>Precio mínimo: {formatCurrency(minPrice)}</CustomText>
            <Slider
                value={minPrice}
                minimumValue={10000}
                maximumValue={2000000}
                step={1}
                onValueChange={handleMinPriceChange}
                minimumTrackTintColor={colorsApp.blackLeather()}
            />
            <CustomText>Precio máximo: {formatCurrency(maxPrice)}</CustomText>
            <Slider
                value={maxPrice}
                minimumValue={10000}
                maximumValue={2000000}
                step={1}
                onValueChange={handleMaxPriceChange}
                minimumTrackTintColor={colorsApp.blackLeather()}
            />
        </View>
    );
};

export default RangePrice;
