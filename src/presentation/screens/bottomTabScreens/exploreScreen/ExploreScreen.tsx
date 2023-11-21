import { SafeAreaView, StyleSheet, View, TouchableOpacity, Alert, FlatList, ActivityIndicator, Modal, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'


import HeaderButtomComponent from './components/HeaderButtomComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootInitialStackParams } from '../../../routes/stackNavigation/InitialStackNavigation';
// import TopTabNavigation from '../../../routes/TopTabNavigation/TopTabNavigation';
import { customStyles } from '../../../styles/globalComponentsStyles/GlobalComponentStyles';
import CustomStatusBarComponent from '../../../components/CustomStatusBarComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardSitesComponents from '../../../components/CardSitesComponents';
import CustomTextComponent from '../../../components/CustonTextComponent';
import MapComponent from './components/MapComponent';
import { PublicationsContext } from '../../../context/publicationContext/PublicationContext';
import CounterButtonComponent from './components/CounterButtonComponent';
import { FilterData } from '../../../../domain/interfaces/GlobalInterfaces';

type CountersType = {
  countAdults: number;
  countKids: number;
  countBabies: number;
  countPets: number;
};




const ExploreScreen = ({ navigation, route }: any) => {

  const [selectedButton, setSelectedButton] = useState<string | null>('apartaestudio');
  const [content, setContent] = useState<string[]>([]);
  const [viewMAp, setViewMAp] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{ counterName: keyof CountersType | null; counterValue: number | null }>({
    counterName: null,
    counterValue: null,
  });
  const { publications, isLoading, updateFilters, filters } = useContext(PublicationsContext);

  console.log(filters);


  const [counters, setCounters] = useState<CountersType>({
    countAdults: 0,
    countKids: 0,
    countBabies: 0,
    countPets: 0,
  });
  // console.log(filters);


  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);

  };
  const handleCounterChange = (counterName: keyof CountersType, value: number) => {
    setCounters(prevCounters => {
      const updatedCounterValue = prevCounters[counterName] + value;
      // Llama a onPress con el nombre del contador, el valor actual y el valor a cambiar
      handleButtoncounterPress(counterName, updatedCounterValue, value);

      updateFilters({
        ...filters,
        [counterName]: updatedCounterValue,
      } as FilterData);
      
      return {
        ...prevCounters,
        [counterName]: updatedCounterValue,
      };
    });
  };


  const handleButtoncounterPress = (counterName: keyof CountersType, counterValue: number, value: number) => {

    setPendingUpdate({
      counterName,
      counterValue,
    });


  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEndReached = () => {

    setPage(page + 1);
    // console.log(page);
    updateFilters({
      ...filters,
      page: page,
      limit: 3,

    })
  };

  const handleAceptFilters = () => {
    if (pendingUpdate && pendingUpdate.counterName !== null) {
      updateFilters({
        ...filters,
        [pendingUpdate.counterName]: pendingUpdate.counterValue,
        limit: 3,
      });
    }
  }

  return (
    <SafeAreaView style={{ ...customStyles.safeArea }}>
      <CustomStatusBarComponent />

      <View style={{
        width: '100%',
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,

        // backgroundColor: 'red'
      }}>
        <HeaderButtomComponent navigation={navigation} onModalPress={toggleModal} />

        {/* <TopTabNavigation /> */}
        <View style={{
          flexDirection: 'row', justifyContent: 'space-evenly'
        }}>
          <TouchableOpacity
            onPress={() => handleButtonPress('apartaestudio')}
            style={{ ...styles.TopButtoms, borderBottomWidth: 2, borderBottomColor: (selectedButton === 'apartaestudio' ? colorsApp.primary() : '#fff') }}>
            <Icon name='warehouse' style={{ fontSize: 25, color: colorsApp.blackLeather() }}></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress('apartamento')}
            style={{ ...styles.TopButtoms, borderBottomWidth: 2, borderBottomColor: (selectedButton === 'apartamento' ? colorsApp.primary() : '#fff') }}>
            <Icon name='hoop-house' style={{ fontSize: 25, color: colorsApp.blackLeather() }}></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress('habitacion')}
            style={{ ...styles.TopButtoms, borderBottomWidth: 2, borderBottomColor: (selectedButton === 'habitacion' ? colorsApp.primary() : '#fff') }}>
            <Icon name='greenhouse' style={{ fontSize: 25, color: colorsApp.blackLeather() }}></Icon>
          </TouchableOpacity>
        </View>

        {
          !viewMAp ?


            <View style={{ paddingHorizontal: wp('5%'), paddingVertical: hp('2%') }}>
              <FlatList
                data={publications}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                renderItem={({ item }) => (
                  <CardSitesComponents navigation={navigation} publication={item} />

                )}
              />
            </View>
            :
            <MapComponent setModalUseState={setViewMAp} modalUseState={viewMAp} />
        }


        {
          !viewMAp &&
          <TouchableOpacity style={{ ...styles.buttonMap }} onPress={() => setViewMAp(true)}>
            <CustomTextComponent style={{ ...styles.textButtom }}>
              MAPA
            </CustomTextComponent>
            <Icon name='map' style={{ ...styles.iconMap }}></Icon>
          </TouchableOpacity>
        }

        <Modal animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => {

            setIsModalVisible(!false);
          }}>


          <View style={{ ...styles.headerModal }}>
            <TouchableOpacity onPress={toggleModal}>
              <Icon name='close' style={{ fontSize: 25, color: colorsApp.blackLeather() }}></Icon>
            </TouchableOpacity>
            <CustomTextComponent style={{ ...styles.titleFilters }} >
              Filtros
            </CustomTextComponent>
          </View>


          <ScrollView style={{ ...styles.scroll }}>

            <CustomTextComponent style={{ ...styles.descriptionFilters }}>
              Filtra tus busquedas y encuentra más rapido lo que buscas.
            </CustomTextComponent>

            <View style={{ ...styles.boxCounters }}>
              <CustomTextComponent style={{ fontSize: 20 }}>
                Adultos:
              </CustomTextComponent>
              {/* Counter Adults */}
              <CounterButtonComponent counterName="countAdults" onPress={handleCounterChange} counterValue={counters.countAdults} />
            </View>

            <View style={{ ...styles.boxCounters }}>
              <CustomTextComponent style={{ fontSize: 20 }}>
                Niños:
              </CustomTextComponent>
              {/* Counter Kids */}
              <CounterButtonComponent counterName="countKids" onPress={handleCounterChange} counterValue={counters.countKids} />
            </View>
            <View style={{ ...styles.boxCounters }}>
              <CustomTextComponent style={{ fontSize: 20 }}>
                bebés:
              </CustomTextComponent>
              {/* Counter Babies */}
              <CounterButtonComponent counterName="countBabies" onPress={handleCounterChange} counterValue={counters.countBabies} />
            </View>
            <View style={{ ...styles.boxCounters }}>
              <CustomTextComponent style={{ fontSize: 20 }}>
                Mascotas:
              </CustomTextComponent>
              {/* Counter Pets */}
              <CounterButtonComponent counterName="countPets" onPress={handleCounterChange} counterValue={counters.countPets} />
            </View>


          </ScrollView>

          <TouchableOpacity onPress={handleAceptFilters}>
            <CustomTextComponent>
              Aceptar
            </CustomTextComponent>
          </TouchableOpacity>

        </Modal>
      </View>


    </SafeAreaView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  TopButtoms: {
    flex: 1,
    backgroundColor: '#fff',
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: colorsApp.blackLeather(0.25),

  },
  buttonMap: {
    width: wp('23%'),
    height: hp('6%'),
    backgroundColor: colorsApp.blackLeather(0.90),
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    paddingHorizontal: wp('4')

  },
  iconMap: {
    fontSize: 25,
    color: '#fff'
  },
  textButtom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 2
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
  titleFilters: {
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
  descriptionFilters: {
    marginBottom: hp('5%')
  },
  boxCounters: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    justifyContent: 'space-between',
    marginBottom: hp('2%')
  }
})