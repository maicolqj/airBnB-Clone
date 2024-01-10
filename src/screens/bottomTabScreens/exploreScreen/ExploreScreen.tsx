import { SafeAreaView, StyleSheet, View, TouchableOpacity,  FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import HeaderButtomComponent from './components/HeaderButtomComponent';

import { customStyles } from '../../../styles/globalComponentsStyles/GlobalComponentStyles';
import CustomStatusBarComponent from '../../../components/CustomStatusBarComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorsApp } from '../../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardSitesComponents from '../../../components/CardSitesComponents';
import CustomText from '../../../components/Generals/CustomText';
import MapComponent from './components/MapComponent';
import { PublicationsContext } from '../../../context/publicationContext/PublicationContext';
import ModalComponent from './components/ModalComponent';



const ExploreScreen = ({ navigation, route }: any) => {

  const [selectedButton, setSelectedButton] = useState<string | null>('apartaestudio');
  const [content, setContent] = useState<string[]>([]);
  const [viewMAp, setViewMAp] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { publications, isLoading, isMorePage, updateFilters, filters, loadPublications } = useContext(PublicationsContext);

  useEffect(() => {
    loadPublications()
  }, [])

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleScrollEnd = (event: any) => {
    if (isLoading || !isMorePage) {
      return;
    }

    // if (isLoading) {
    //   setPage(page + 1);
    //   updateFilters({
    //     ...filters,
    //     page: page,
    //     // limit: 3,
    //   })
    // }

    
    loadPublications()

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
      }}>
        <HeaderButtomComponent navigation={navigation} onModalPress={toggleModal} />

        {
          !viewMAp ?
              <FlatList
                // refreshControl={
                //   <RefreshControl refreshing={true} onRefresh={handleRefresh}></RefreshControl >
                // }
                style={{paddingHorizontal:wp(4)}}
                showsVerticalScrollIndicator={false}
                data={publications}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (isLoading && <ActivityIndicator size="large" color={colorsApp.primary()} />)}
                renderItem={renderPublicationItem}
              />
            :
            <MapComponent setModalUseState={setViewMAp} modalUseState={viewMAp} />
        }


        {
          !viewMAp &&
          <TouchableOpacity style={{ ...styles.buttonMap }} onPress={() => setViewMAp(true)}>
            <CustomText style={{ ...styles.textButtom }}>
              MAPA
            </CustomText>
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



