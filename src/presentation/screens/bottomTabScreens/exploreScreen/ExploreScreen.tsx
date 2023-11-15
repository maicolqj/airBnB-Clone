import { SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'


import HeaderButtomComponent from './components/HeaderButtomComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootInitialStackParams } from '../../../routes/stackNavigation/InitialStackNavigation';
import TopTabNavigation from '../../../routes/TopTabNavigation/TopTabNavigation';
import { customStyles } from '../../../styles/globalComponentsStyles/GlobalComponentStyles';
import CustomStatusBarComponent from '../../../components/CustomStatusBarComponent';

interface Props {
  navigation: StackNavigationProp<RootInitialStackParams, 'botomTabs'>
}

const ExploreScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ ...customStyles.safeArea }}>
      <CustomStatusBarComponent />

      <HeaderButtomComponent navigation={navigation} />

      <TopTabNavigation />

    </SafeAreaView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({})