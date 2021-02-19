import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import  ReportDetails from '../screens/StudentScreens/ReportDetails';
import MyReportsScreen from '../screens/StudentScreens/MyReportsScreen';

export const AppStackNavigator = createStackNavigator({
    ReportsList : {
      screen : MyReportsScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    HomeworkDetails : {
      screen : ReportDetails,
      navigationOptions:{
        headerShown : false
      }
    }
  },
    {
      initialRouteName: 'ReportsList'
    }
  );
  