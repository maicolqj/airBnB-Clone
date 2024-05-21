import { Platform, SafeAreaView, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import moment from 'moment';
import CustomText from "../generals/CustomText";
import { colorsApp } from "../../styles/globalColors/GlobalColors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
type MyProps = {
    date:any,
    setDate:Function
    btnStyle?: ViewStyle
    textStyle?: TextStyle
}
export const CustomDateTime = ({ date, setDate,btnStyle,textStyle }: MyProps  ) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const onChange = (event: any, selectedDate: any) => {
        setShowDatePicker(false);
        setDate(selectedDate);
    };

    return (
        <SafeAreaView >
            {Platform.OS == 'ios' ? (
                <View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        locale="es-ES"
                        display="spinner"
                        onChange={onChange}
                        maximumDate={new Date()}
                    />
                </View>
            ) : (
                <View>
                    <TouchableOpacity style={{...styles.btnHours,...btnStyle}} onPress={() => setShowDatePicker(true)} >
                        <CustomText style={{...styles.textHours,...textStyle}}>
                            {moment(date).format('YYYY-MM-DD')}
                        </CustomText>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            locale="es-ES"
                            negativeButton={{label: 'Cancelar', textColor: 'black'}}
                            display="spinner"
                            onChange={onChange}
                            maximumDate={new Date()}
                        />
                    )}
                </View>
            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    btnHours: {
        marginVertical:hp(3),
        color: 'black',
        borderRadius: hp(1),
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp(1.5),
        fontSize:hp(1.7),
        paddingVertical:hp(2),  
        borderWidth:hp(0.1),
        backgroundColor:colorsApp.light(0.06)
    },
    textHours: {
        fontSize: 18,
    },
})