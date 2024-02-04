import { SafeAreaView, StyleSheet, View, TouchableOpacity,  FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'
import HeaderButtomComponent from './components/HeaderButtomComponent';

import { customStyles } from '../../styles/globalComponentsStyles/GlobalComponentStyles';
import CustomStatusBarComponent from '../../components/CustomStatusBarComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorsApp } from '../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ItemPublication from './components/ItemPublication';
import CustomText from '../../components/generals/CustomText';
import MapComponent from './components/MapComponent';
import { PublicationsContext } from '../../context/PublicationContext';
import ModalFilter from './components/ModalFilter';
import { FilterData } from '../../interfaces/GlobalInterfaces';



const Home = ({ navigation }: any) => {
  const flatListRef = useRef(null);

  const [selectedButton, setSelectedButton] = useState<string | null>('apartaestudio');
  const [content, setContent] = useState<string[]>([]);
  
  const [viewMAp, setViewMAp] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { homePublication, loadPublications,getComplementFilters, filters } = useContext(PublicationsContext);

  useEffect(() => {
    getComplementFilters()
  }, [])

  useEffect(() => {
    if (filters) {
      loadPublications(true)
      // para mover el scroll al inicio de la pantalla
      if (flatListRef.current) {
        try {
          flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        } catch (error) {
          console.log('error flatListRef', error);
        }
      }

    }
  },[filters]) 

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleScrollEnd = (event: any) => {
    if (homePublication.isLoading || !homePublication.isMorePage) {
      return;
    }
    loadPublications()
  };


  return (
    <SafeAreaView style={{ ...customStyles.safeArea }}>
      <CustomStatusBarComponent />

      <View style={styles.container}>
        <HeaderButtomComponent navigation={navigation} onModalPress={toggleModal} />

        {
          !viewMAp ?
              <FlatList
                // refreshControl={
                //   <RefreshControl refreshing={true} onRefresh={handleRefresh}></RefreshControl >
                // }
                ref={flatListRef}
                style={{paddingHorizontal:wp(4)}}
                showsVerticalScrollIndicator={false}
                data={homePublication.publications}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (homePublication.isLoading && <ActivityIndicator size="large" color={colorsApp.primary()} />)}
                renderItem={({item}) => <ItemPublication navigation={navigation} publication={item} />}

              />
            :
            <MapComponent setModalUseState={setViewMAp} modalUseState={viewMAp} />
        }


        {/* {
          !viewMAp &&
          <TouchableOpacity style={{ ...styles.buttonMap }} onPress={() => setViewMAp(true)}>
            <CustomText style={{ ...styles.textButtom }}>
              Mapa
            </CustomText>
            <Icon name='map' style={{ ...styles.iconMap }}></Icon>
          </TouchableOpacity>
        } */}
      </View>

      <ModalFilter 
        modalUseState={isModalVisible} 
        setModalUseState={setIsModalVisible} 
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
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
  },
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



