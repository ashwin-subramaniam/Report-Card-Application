import React, { Component } from 'react';
import {View,Text} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import NotificationScreen from '../screens/NotificationScreen';
import CustomSideBarMenu from './CustomSideBarMenu';
import { createAppContainer } from 'react-navigation';
import db from '../config';
import firebase from 'firebase';
import SendReportScreen from '../screens/TeacherScreens/SendReportScreen';
import Settings from '../screens/Settings';
import HomeScreen from '../screens/Homescreen';
import MyReportsScreen from '../screens/StudentScreens/MyReportsScreen';

export default class AppDrawerNavigator extends Component{
  constructor(){
   super();
   this.state={
     checkId: firebase.auth().currentUser.email,
     studentId: '',
     teacherId: ''
   } 
  }

  getStudentId(){
    db.collection('students').where('student_id','==',this.state.studentId)
    .then(()=>{
      this.setState({
        studentId: doc.data().student_id
      })
    })    
   }
   getTeacherId(){
    db.collection('teachers').where('teacher_id','==',this.state.teacherId)
    .then(()=>{
      this.setState({
        teacherId: doc.data().teacher_id
      })
    })   
   }
   componentDidMount(){
     this.getStudentId();
     this.getTeacherId(); 
   }

  render(){
     if(this.state.studentId===this.state.checkId){
    return(
     <View>
       <StudentAppContainer/>
     </View>  
    ) 
    }
    else if(this.state.teacherId===this.state.checkId){
      <View>
        <TeacherAppContainer/>
      </View>
    }
  }
}

  const StudentAppDrawerNavigator = createDrawerNavigator({
    Home:{
     screen: HomeScreen
   },
    Notification:{
     screen: NotificationScreen
   } ,
    Setting :{
     screen: Settings
   },
 
    MyReports:{
     screen: MyReportsScreen
   },
  },
   {
    contentComponent: CustomSideBarMenu   
   }, 
   {
    initialRouteName: 'Home'  
   }
 )
 const TeacherAppDrawerNavigator = createDrawerNavigator({
  Home:{
    screen: HomeScreen
  },
  Notification:{
    screen: NotificationScreen
  },
  Setting :{
    screen: Settings
  },
  SendReport:{
    screen: SendReportScreen
  }
 },
  {
   contentComponent: CustomSideBarMenu   
  }, 
  {
    initialRouteName: 'Home'  
  }
 )
 const StudentAppContainer = createAppContainer(StudentAppDrawerNavigator)

 const TeacherAppContainer = createAppContainer(TeacherAppDrawerNavigator)



