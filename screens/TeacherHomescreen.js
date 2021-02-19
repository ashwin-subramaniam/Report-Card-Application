import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import MyHeader from '../CommonComponents/MyHeader'

export default class TeacherHomescreen extends Component{
   constructor(props){
      super(props)
      this.state={
       userId: firebase.auth().currentUser.email,
       value: "" 
      } 
     }   
      
     render(){
      return(
       <View style={styles.container}>        
         <MyHeader title="Home" navigation={this.props.navigation}/>
        <Image
         source={require('../assets/student.png')}
         style={{width: 40,height:80}}
        />
        <Text style={styles.welcomeText}>Welcome Back!</Text>             
       </View>   
      )   
     }
   }

const styles = StyleSheet.create({
    container:{
      flex: 1  
    }
})