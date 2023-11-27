import { SafeAreaView, StyleSheet, View, TouchableOpacity,  FlatList, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import HeaderButtomComponent from './components/HeaderButtomComponent';

import { customStyles } from '../../../styles/globalComponentsStyles/GlobalComponentStyles';
import CustomStatusBarComponent from '../../../components/CustomStatusBarComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardSitesComponents from '../../../components/CardSitesComponents';
import CustomTextComponent from '../../../components/CustonTextComponent';
import MapComponent from './components/MapComponent';
import { PublicationsContext } from '../../../context/publicationContext/PublicationContext';
import ModalComponent from './components/ModalComponent';



const ExploreScreen = ({ navigation, route }: any) => {

  const [selectedButton, setSelectedButton] = useState<string | null>('apartaestudio');
  const [content, setContent] = useState<string[]>([]);
  const [viewMAp, setViewMAp] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { publications, isLoading, updateFilters, filters, loadPublications } = useContext(PublicationsContext);

  useEffect(() => {
    loadPublications()
  }, [])

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleScrollEnd = (event: any) => {
    if (isLoading) {
      setPage(page + 1);
      updateFilters({
        ...filters,
        page: page,
        // limit: 3,
      })
    }

    if (isLoading) {
      return;
    }
    setTimeout(() => {
      loadPublications()
    }, 500);

  };

  const handleButtonPress = async (rental: string) => {
    setSelectedButton(rental);
    updateFilters({
      ...filters,
      category: rental
    })
  }


  const renderPublicationItem = ({ item }: any) => (
    <CardSitesComponents navigation={navigation} publication={item} />
  );

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
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (isLoading && <ActivityIndicator size="large" color="#0000ff" />)}
                renderItem={renderPublicationItem}
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


      </View>

      <ModalComponent modalUseState={isModalVisible} setModalUseState={setIsModalVisible} />
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



