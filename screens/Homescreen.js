import React, { Component } from 'react';
import {View,Text} from 'react-native';
import StudentHomeScreen from '../screens/StudentHomescreen';
import TeacherHomeScreen from '../screens/TeacherHomescreen';
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends Component{
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
    if(this.state.checkId===this.state.studentId){
    return(
    <View>
       <StudentHomeScreen/>
    </View>   
   )}
   else if(this.state.checkId === this.state.teacherId){
    return(
     <View>
       <TeacherHomeScreen/>  
     </View>   
    )
   }   
  } 
 
}