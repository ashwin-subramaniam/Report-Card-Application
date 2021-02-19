import React from 'react';
import 
{ View,
  Text,
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView } 
  from 'react-native';

import firebase from 'firebase';
import db from '../../config';
import MyHeader from '../../CommonComponents/MyHeader';

export default class SendReportScreen extends React.Component{
  constructor(){
    super();
    this.state={
     userId: firebase.auth().currentUser.email,
     to: '',
     report: '',
     progress: '',
     canImprove: '',
     studentId: '',
     reportSubject:''
    }   
   }
    reportDetails=()=>{
      report = this.state.report
      progress = this.state.progress
      canImprove = this.state.canImprove,
      to = this.state.to
      reportSubject = this.state.reportSubject

      db.collection('TeacherReport').add({
       "user_id": this.state.userId,
       "to": to,  
       "report": report,
       "progress": progress,
       "can_improve": canImprove,
       "date": firebase.firestore.FieldValue.serverTimestamp(),
       "report_subject": reportSubject  
      })
    }
    sendNotification=()=>{
      //to get the first name and last name
      db.collection('teachers').where('teacher_id','==',this.state.userId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc)=>{
          var name = doc.data().first_name
          var lastName = doc.data().last_name
    
          // to get the donor id and book nam
          db.collection('all_notifications').where('student_id','==',this.state.studentId).get()
          .then((snapshot)=>{
            snapshot.forEach((doc) => {
              var studentId  = doc.data().student_id
              var reportName =  doc.data().report_name
    
              //targert user id is the donor id to send notification to the user
              db.collection('all_notifications').add({
                "targeted_student_id" : studentId,
                "message" : name +" " + lastName + " received the report " + bookName ,
                "notification_status" : "unread",
                "report_name" : reportName
              })
            })
          })
        })
      })
    }
    render(){
      return(
        <View style={{flex: 1}}>
         <MyHeader title="Send Report" navigation={this.props.navigation}/>
         <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardStyle}>
            <TextInput
             style={styles.formTextInput}
             placeholder={"Write the name of the student Along with his class!"}    
             onChangeText={(text)=>{
              this.setState({
                to: text
              }) 
             }}
             value={this.state.to}
         />
          <TextInput
           style={styles.formTextInput}
           placeholder={"Subject"}
           maxLength={20}
           onChangeText={(text)=>{
            this.setState({
              reportSubject: text
            })
           }}
          value={this.state.reportSubject}
         />    
           <TextInput
             style={styles.formTextInput}
             placeholder={"Report"}
             multiline={true}
             onChangeText={(text)=>{
               this.setState({
                report: text   
              })   
             }}
              value={this.state.report}
          /> 
           <TextInput
             style={styles.formTextInput}
             placeholder={"Progress"}
             multiline={true}
             onChangeText={(text)=>{
              this.setState({
                progress: text  
             })   
            }}
           value={this.state.progress}
         />
        
         <TextInput
           style={styles.formTextInput}
           placeholder={"Can Improve"}
           multiline={true}
           onChangeText={(text)=>{
             this.setState({
               canImprove: text  
             })  
           }}
           value={this.state.canImprove}
         />
        

         <TouchableOpacity
          style={styles.button}
          onPress={()=>{
           this.reportDetails()
           this.sendNotification() 
          }}
         
         >
          <Text style={styles.buttonText}>Send Report</Text>    
         </TouchableOpacity>   
        
        </KeyboardAvoidingView>     
      </ScrollView>
        </View>  
      )  
    }
}

const styles = StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
      }, 
      button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },
        buttonText:{
            color:'#ffff', 
            fontWeight:'200', 
            fontSize:20 
         },
         keyBoardStyle : {
          flex:1,
          alignItems:'center',
          justifyContent:'center'
        },
})