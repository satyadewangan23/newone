import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {width} from '../dimension/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
const commanState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  name: '',
  nameError: '',
  mobile: '',
  mobileError: '',
  checkValidEmail: false,
};
export default function Signin(props) {
  const [state, setState] = useState(commanState);

  var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  var passwordReg =
    /^(?=.*[0-9])(?=.*[!@#$%^&*?;,+<>])[a-zA-Z0-9!@#$%^&*?;,+<>]{8,}$/;

  const saveEmailPass = async () => {
    if (
      emailReg.test(state.email) &&
      passwordReg.test(state.password) &&
      state.name &&
      state.mobile
    ) {
      let signupData = {
        email: state.email,
        password: state.password,
        name: state.name,
        mobile: state.mobile,
      };
      await AsyncStorage.setItem(
        'SIGNUPDATA',
        JSON.stringify(signupData),
        () => {
          props.navigation.goBack();
        },
      );
    } else {
      alert('Please Enter Valid Email , Password, Name and Mobile');
      setState({
        ...state,
        emailError: state.emailError ? '' : 'This field is required',
        passwordError: state.passwordError ? '' : 'This field is required',
        nameError: state.nameError ? '' : 'This field is required',
        mobileError: state.mobileError ? '' : 'This field is required',
      });
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
        });
      } else {
        setState({
          ...state,
          email: text,
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

  const onchangeNameFunction = text => {
    if (text.length !== 0) {
      if (text) {
        setState({
          ...state,
          name: text,
          nameError: '',
        });
      } else {
        setState({
          ...state,
          name: text,
          nameError: 'Please enter a valid name ',
        });
      }
    } else {
      setState({
        ...state,
        name: '',
        nameError: 'This field is required',
      });
    }
  };

  const onchangeMobileFunction = text => {
    if (text.length !== 0) {
      if (text) {
        setState({
          ...state,
          mobile: text,
          mobileError: '',
        });
      } else {
        setState({
          ...state,
          mobile: text,
          mobileError: 'Please enter a valid mobile number ',
        });
      }
    } else {
      setState({
        ...state,
        mobile: '',
        mobileError: 'This field is required',
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
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Text style={styles.mainText}>Signin</Text>

      <TextInput
        style={styles.textInputBox}
        placeholder={'Name'}
        placeholderTextColor={'gray'}
        value={state.name}
        onChangeText={text => onchangeNameFunction(text)}
      />
      {state.nameError ? (
        <View style={{marginTop: '2%', marginLeft: '5%'}}>
          <Text style={{color: 'red', fontSize: 12}}>{state.nameError}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.textInputBox}
        placeholder={'Mobile Number'}
        placeholderTextColor={'gray'}
        value={state.mobile}
        keyboardType="numeric"
        maxLength={10}
        onChangeText={text => onchangeMobileFunction(text)}
      />
      {state.mobileError ? (
        <View style={{marginTop: '2%', marginLeft: '5%'}}>
          <Text style={{color: 'red', fontSize: 12}}>{state.mobileError}</Text>
        </View>
      ) : null}

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
        <Text style={styles.text}>Signin</Text>
      </TouchableOpacity>
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

    marginBottom: '10%',
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: width / 20,
    alignItems: 'center',
  },
  sinup: {
    fontSize: 16,
    color: 'black',
  },
  sinup1: {
    fontSize: 16,
    color: '#003B73',
  },
});
