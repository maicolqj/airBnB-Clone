import { StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import CustonTextComponent from '../../../components/generals/CustomText';

interface Props {
    navigation: any,
    onModalPress: () => void;
}
const HeaderButtomComponent = ({navigation, onModalPress}: Props) => {
    const placeholders = ['En cualquier momento...', 'Cualquier lugar....', 'Cualquier precio....']; 
    const [searchOptions, setSearchOptions] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setSearchOptions((prevIndex) => (prevIndex + 1) % placeholders.length);
      }, 2000);
      return () => clearInterval(intervalId);
    }, []);
  

    
    return (
        // <View style={{
        //     // flex: 1,
        //     // backgroundColor: '#fff',
        //     // marginBottom: Platform.OS === 'ios' ? 10 : 0,
        // }}>

            <View style={{ ...styles.container }}>
                <TouchableOpacity style={{ ...styles.buttomSearch }} activeOpacity={0.8} onPress={onModalPress}>
                    <Icon name='search' style={{ ...styles.searchButton }}></Icon>
                    <View style={{ ...styles.containerPlaceholder }}>
                        <CustonTextComponent style={{fontWeight: '900', fontSize: hp('2%')}}>
                            ¿A dondé vamos?
                        </CustonTextComponent>
                        <CustonTextComponent style={{fontWeight: '400', fontSize: hp('1.5%')}}>
                            {placeholders[searchOptions]}
                        </CustonTextComponent>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{...styles.buttomFilter}} activeOpacity={0.8} onPress={onModalPress}>
                    <Icon name='filter' style={{ ...styles.searchButton }}></Icon>
                </TouchableOpacity> */}
            </View>

        // </View>
    )
}

export default HeaderButtomComponent

const styles = StyleSheet.create({
    buttomFilter: {
        width: '16%',
        height: hp('7%'),
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: '1%',
        paddingVertical: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttomSearch: {
        backgroundColor: 'white',
        paddingHorizontal: '15%',
        paddingVertical: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom:hp(0.5)
        
    },
    containerPlaceholder: {
        width: '100%',
        height: '100%',
        paddingHorizontal: '10%'
    },
    searchButton: {
        fontSize: hp(2.5),
        color: colorsApp.blackLeather()
    }
})