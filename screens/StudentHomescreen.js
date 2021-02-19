import React,{Component} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import {Header} from 'react-native-elements';
import MyHeader from '../CommonComponents/MyHeader';

export default class StudentHomescreen extends Component{
   constructor(props){
    super(props)
    this.state={
     userId: firebase.auth().currentUser.email,
     value:"" 
    } 
   }   
    
   render(){
    return(
     <View style={styles.container}>        
      <MyHeader title="Home" navigation={this.props.navigation}/>
      <Image
       source={require('../assets/animation_500_kjsleezq.gif')}
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
    },
    welcomeText:{
      fontWeight: 'bold',
      color: '#696969'
    }
})