import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colorsApp } from '../../../../styles/globalColors/GlobalColors';
import CustonTextComponent from '../../../../components/CustonTextComponent';

interface Props {
    navigation: any
}
const HeaderButtomComponent = ({navigation}: Props) => {
    const placeholders = ['En cualquier momento...', 'Cualquier lugar....', 'Cualquier precio....']; 
    const [searchOptions, setSearchOptions] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setSearchOptions((prevIndex) => (prevIndex + 1) % placeholders.length);
      }, 2000);
      return () => clearInterval(intervalId);
    }, []);
  
    
    return (
        <View style={{ ...styles.container }}>
            <TouchableOpacity style={{ ...styles.buttomSearch }} activeOpacity={0.8} onPress={() => navigation.navigate('SearchScreen')}>
                <Icon name='search' style={{ ...styles.searchButton }}></Icon>
                <View style={{ ...styles.containerPlaceholder }}>
                    <CustonTextComponent style={{fontWeight: '900', fontSize: 18}}>
                        ¿A dondé vamos?
                    </CustonTextComponent>
                    <CustonTextComponent style={{fontWeight: '400', fontSize: 12}}>
                        {placeholders[searchOptions]}
                    </CustonTextComponent>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.buttomFilter}} activeOpacity={0.8}>
                <Icon name='filter' style={{ ...styles.searchButton }}></Icon>
            </TouchableOpacity>
        </View>
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
        width: wp('75%'),
        height: hp('7%'),
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: '15%',
        paddingVertical: '2%',
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
    container: {
        marginTop: hp('4.5%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    containerPlaceholder: {
        width: '100%',
        height: '100%',
        paddingHorizontal: '10%'
    },
    searchButton: {
        fontSize: 30,
        color: colorsApp.blackLeather()
    }
})