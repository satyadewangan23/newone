import React, {useState, useEffect} from 'react';
import {View, Text,Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screen/Home';
import Login from '../screen/Login';
import Signin from '../screen/Signin';
import Post from '../screen/Post';
import { width } from '../dimension/Dimension';
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabStack = () => {

  return (
    <Tab.Navigator
      screenOptions={({route: {name}}) => ({
        tabBarIcon: ({focused}) => {
          switch (name) {
            case 'Home':
              return (
                <Image
                  source={
                    focused
                    ? require('../assets/home1.png')
                      : require('../assets/home.png')
                  }
                  style={{width: 35, height: 35}}
                />
              );

            case 'Post':
              return (
                <Image
                  source={
                    focused
                    ? require('../assets/plus1.png')
                    : require('../assets/plus.png')
                  }
                  style={{width: 35, height: 35}}
                />
              );

           
          }
        },

        tabBarShowLabel: false,
       
        tabBarStyle: {
          backgroundColor:
          '#C1CDCD',

          
          bottom: 0,
          position: 'absolute',

          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          width: width,
          alignSelf: 'center',
          alignItems:'center'
        },
      })}>
      <Tab.Screen
        name={'Home'}
        options={{headerShown: false}}
        component={Home}
      />
      <Tab.Screen
        name={'Post'}
        options={{headerShown: false}}
        component={Post}
      />
   
    </Tab.Navigator>
  );
};

const StackRoot = () => {
 

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
   
          <Stack.Screen name="Tab" component={TabStack} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Post" component={Post} />

          <Stack.Screen name="Login" component={Login} />
    
    </Stack.Navigator>
  );
};

export default StackRoot;
