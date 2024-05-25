import { SafeAreaView, StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'
import HeaderButtomComponent from './components/filter/HeaderButtomComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customStyles } from '../../styles/globalComponentsStyles/GlobalComponentStyles';
import CustomStatusBarComponent from '../../components/CustomStatusBarComponent';
import { colorsApp } from '../../styles/globalColors/GlobalColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ItemPublication from './components/ItemPublication';
import MapComponent from './components/MapComponent';
import { PublicationsContext } from '../../context/PublicationContext';
import ModalFilter from './components/ModalFilter';
import CustomText from '../../components/generals/CustomText';
import { ProfileContext } from '../../context/ProfileContext';

const Home = ({ navigation }: any) => {
  const flatListRef = useRef(null);

  const {getProfile} = useContext(ProfileContext) 

  const [viewMAp, setViewMap] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { homePublication, loadPublications,getComplementFilters, filters,loadMapPublications } = useContext(PublicationsContext);

  useEffect(() => {
    getComplementFilters()
    getProfile()
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
                showsVerticalScrollIndicator={false}
                data={homePublication.publications}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => (homePublication.isLoading && <ActivityIndicator size="large" color={colorsApp.primary()} />)}
                renderItem={({item}) => <ItemPublication navigation={navigation} publication={item} />}

              />
          :
            <MapComponent setViewMap={setViewMap} />
        }


        {
          !viewMAp &&
          <TouchableOpacity style={{ ...styles.buttonMap }} onPress={() => setViewMap(true)}>
            <CustomText style={{ ...styles.textButtom }}>
              Mapa
            </CustomText>
            <Icon name='google-maps' style={{ ...styles.iconMap }}></Icon>
          </TouchableOpacity>
        }
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
  },

  buttonMap: {
    backgroundColor: colorsApp.blackLeather(1),
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(1.5),
    flexDirection: 'row',
    paddingVertical:hp(1),
    paddingHorizontal:hp(2)

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


})



