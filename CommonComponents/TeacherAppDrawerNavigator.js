import React from 'react';
import {View,Text} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import TeacherNotificationScreen from '../screens/teacherScreens/TeacherNotificationScreen';
import CustomSideBarMenu from './CustomSideBarMenu';
import TeacherHomescreen from '../screens/TeacherHomeScreen'
import TeacherSettings from '../screens/teacherScreens/TeacherSettings'
import SendHomeworkScreen from '../screens/teacherScreens/SendHomeworkScreen';

export const StudentAppDrawerNavigator = createDrawerNavigator({
 Home:{
   screen: TeacherHomescreen
 },
 Notification:{
   screen: TeacherNotificationScreen
 },
 Setting :{
   screen: TeacherSettings
 },
 SendHomeWork:{
   screen: SendHomeworkScreen
 }
},
 {
  contentComponent: CustomSideBarMenu   
 }, 
 {
   initialRouteName: 'Home'  
 }
)