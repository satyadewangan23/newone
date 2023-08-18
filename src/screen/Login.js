import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { width } from '../dimension/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useIsFocused} from '@react-navigation/native';

const commanState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  checkValidEmail: false,
};
export default function Login(props) {
  const [state, setState] = useState(commanState);
  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused){
      getData();
    }
  
  },[isFocused])
const getData = async ()=>{
  let getSingupData = await AsyncStorage.getItem('SIGNUPDATA');
 
  console.log("getSingupData--->>",JSON.parse(getSingupData));
}
  
 

  const saveEmailPass = async () => {
    let getdata = await AsyncStorage.getItem('SIGNUPDATA');
    let getdata1= JSON.parse(getdata)

    if(getdata1 == null ){
      alert("Please Signup first then login")
    }
    else{
      if (state.email === getdata1.email && state.password === getdata1.password ) {
       props.navigation.navigate('Tab')
  
        
      } else {
        alert('Please Enter Valid Email and Password');
        setState({
          ...state,
          emailError: state.emailError ? '' : 'This field is required',
          passwordError: state.passwordError ? '' : 'This field is required',
        });
      }
    }
    
  };

  const onchangeEmailFunction = text => {
    if (text.length !== 0) {
      var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text)) {
        setState({
          ...state,
          email: text,
          emailError: '',
          checkValidEmail: false,
        });
      } else {
        setState({
          ...state,
          email: text,
          checkValidEmail: true,
          emailError: 'Please enter a valid email address',
        });
      }
    } else {
      setState({
        ...state,
        email: '',
        emailError: 'This field is required',
      });
    }
  };

  const passwordFunction = text => {
    if (text.length !== 0) {
      var reg =
        /^(?=.*[0-9])(?=.*[!@#$%^&*?;,+<>])[a-zA-Z0-9!@#$%^&*?;,+<>]{8,}$/;
      if (reg.test(text)) {
        setState({...state, password: text, passwordError: ''});
      } else {
        setState({
          ...state,
          password: text,
          passwordError:
            'Password must be at least 8 characters long and contain at least one number',
        });
      }
    } else {
      setState({
        ...state,
        password: '',
        passwordError: 'This field is required',
      });
    }
  };





  return (
    <SafeAreaView style={{flex: 1,justifyContent:'center'}}>
      <Text style={styles.mainText}>Login</Text>

      <TextInput
        style={styles.textInputBox}
        placeholder={'Email'}
        placeholderTextColor={'gray'}
        value={state.email}
        onChangeText={text => onchangeEmailFunction(text)}
      />
      {state.emailError ? (
        <View style={{marginTop: '2%', marginLeft: '5%'}}>
          <Text style={{color: 'red', fontSize: 12}}>{state.emailError}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.textInputBox}
        placeholder={'Password'}
        placeholderTextColor={'gray'}
        value={state.password}
        onChangeText={text => passwordFunction(text)}
      />

      {state.passwordError ? (
        <View style={{marginTop: '2%', marginLeft: '5%'}}>
          <Text style={{color: 'red', fontSize: 12}}>
            {state.passwordError}
          </Text>
        </View>
      ) : null}

     
   
        <TouchableOpacity style={styles.button} onPress={saveEmailPass}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <View style={styles.rowContainer}>
        <Text style={styles.sinup}> Don’t have an account? </Text>
        <TouchableOpacity onPress={()=> props.navigation.navigate("Signin")}>
          <Text style={styles.sinup1}>Signup</Text>
        </TouchableOpacity>
        </View>
        
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInputBox: {
    width: '90%',
    height: 50,
    marginLeft: 15,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 12,
    marginTop: 20,
    padding: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#003B73',
    height: 50,
    width: '90%',
    borderRadius: 12,
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
 
  text: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
  mainText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight:"700",
    marginBottom: '10%',
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
   marginTop:width/20,
    alignItems:'center'
  },
  sinup:{
    fontSize:16,
    color:"black"
  },
  sinup1:{
    fontSize:16,
    color:"#003B73"
  }
});
