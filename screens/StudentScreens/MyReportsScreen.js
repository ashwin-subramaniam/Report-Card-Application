import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../../config';
import { Alert } from 'react-native';
import MyHeader from '../../CommonComponents/MyHeader';

export default class MyReportsScreen extends Component{
    constructor(){
        super()
        this.state = {
          studentId  : firebase.auth().currentUser.email,
          TeacherReport : []
        }
      this.reportRef= null
      }
    
      getReportsList =()=>{
        this.homeworkRef = db.collection("TeacherReport")
        .onSnapshot((snapshot)=>{
          var TeacherReport = snapshot.docs.map((doc) => doc.data())
          this.setState({
            TeacherReport: TeacherReport
          });
        })
      }
    
      componentDidMount(){
        this.getReportsList()
      }
    
      componentWillUnmount(){
        this.reportRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        if(this.state.studentId === firebase.auth().currentUser.email){
        return (
          <ListItem
            key={i}
            title={item.homework_title}
            subtitle={item.date}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={                             
                <TouchableOpacity style={styles.button}
                  onPress ={()=>{
                    this.props.navigation.navigate("ReportDetails",{"details": item})
                  }}
                  >
                  <Text style={{color:'#ffff'}}>View</Text>
                </TouchableOpacity>
              }
            bottomDivider
          />
        )
            }
            else{
             Alert.alert("You Cannot View Other Student's Report") 
            }
      }
    
      render(){
        return(
          <View style={{flex:1}}>
            <MyHeader title="My Reports" navigation={this.props.navigation}/>
           <View style={{flex:1}}>
              {
                this.state.homeworksByTeachers.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Reports</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.TeacherReport}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         }
      }
    })
    