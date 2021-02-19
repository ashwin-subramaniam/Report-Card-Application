import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StudentHomescreen from './screens/StudentHomescreen'
import MainScreen from './screens/MainScreen'
 import {SafeAreaProvider} from 'react-native-safe-area-context'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import TeacherHomescreen from './screens/TeacherHomescreen';
import Settings from './screens/Settings';
import AppDrawerNavigator from './CommonComponents/StudentAppDrawerNavigator'

export default class App extends React.Component{
  render(){
  return (
     
      <AppContainer/>
  )
  }
  }

const SwitchNavigator = createSwitchNavigator({
   MainScreen: {screen: MainScreen},
   StudentHomescreen: {screen: StudentHomescreen},
   TeacherHomeScreen: {screen: TeacherHomescreen},
   Settings: {screen: Settings} ,
   Drawer : AppDrawerNavigator
})

const AppContainer = createAppContainer(SwitchNavigator)