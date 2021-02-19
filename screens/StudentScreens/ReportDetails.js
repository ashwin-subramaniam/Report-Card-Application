import React,{Component} from 'react';
import {View,Text} from 'react-native';
import firebase from 'firebase';
import db from '../../config';
import {Header} from 'react-native-elements';

export default class ReportDetails extends Component{
    constructor(props){
      super(props);
      this.state={
       userId: firebase.auth().currentUser.email,
       studentId: this.props.navigation.getParam('details')["student_id"],
       teacherId: this.props.navigation.getParam('details')["teacher_id"],
       report:'',
       reportSubject:'',
       progress: '',
       canImprove: '',
       teacherRequestDocId: '',
       teacherName: '',
       teacherContact: '',
       teacherAddress: ''
      }  
    }

    getTeacherDetails=()=>{
        db.collection('teachers').where('teacher_id','==',this.state.teacherId).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            this.setState({
              teacherName    : doc.data().first_name,
              teacherContact : doc.data().contact,
              teacherAddress : doc.data().address,
            })
          })
        });
    }

    getReportDetails=()=>{
      db.collection("TeacherReports").get()
      .then(snapshot=>{
          snapshot.forEach(doc=>{
            this.setState({
              report: doc.data().report,
              progress: doc.data().progress,
              canImprove: doc.data().can_improve,
              dateFrom: doc.data().date,
              reportSubject: doc.data().report_subject
            })  
          })
      })
    }
    componentDidMount(){
      this.getReportDetails();
      this.getTeacherDetails();  
    }
    render(){
      if(this.state.studentId!==this.state.teacherId){
     return(
      <View>
         <Header
          leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
          centerComponent={{ text:"Report Details", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
          backgroundColor = "#eaf8fe"
            />
        <Text style={{fontWeight:'bold'}}>Hello {this.state.userId}! Show This To Your Parents -:</Text>
        <View style={{flex:0.3}}>
            <Card
                title={"Report Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>To  : {this.state.studentId}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Report: {this.state.report}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Subject  : {this.state.reportSubject}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Progress  : {this.state.progress}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>You Can Improve  : {this.state.canImprove}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>This Report is given to you by : {this.state.teacherName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Teacher's Contact  : {this.state.teacherContact}</Text>
              </Card>
             
            </Card>
             
          </View>
      </View>   
     )}
     else{
       <Text>You Are Not Permitted To View This Student's Report</Text>
     }   
    }
}