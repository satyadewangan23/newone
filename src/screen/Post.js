import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

export default function Post(props) {
  const storeData = async item => {
    let arrayData;
    let data = await getData();
    if (data.getImage === null || data.getImage === undefined) {
      arrayData = [{image: item, like: false, name: data.getInfo.name}];
    } else {
      arrayData = [
        ...data.getImage,
        {image: item, like: false, name: data.getInfo.name},
      ];
    }
    await AsyncStorage.setItem('IMAGE', JSON.stringify(arrayData), () => {
      props.navigation.goBack();
    });
  };
  const getData = async () => {
    let getImage = await AsyncStorage.getItem('IMAGE');
    let getInfo = await AsyncStorage.getItem('SIGNUPDATA');

    let getAllData = {
      getImage: JSON.parse(getImage),
      getInfo: JSON.parse(getInfo),
    };
    return getAllData;
  };

  const galleryCall = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        storeData(image.path);
      });
    } catch (error) {}
  };
  const cameraCall = () => {
    try {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        storeData(image.path);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity style={styles.button} onPress={cameraCall}>
        <Text style={styles.text}>Upload post using camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={galleryCall}>
        <Text style={styles.text}>Upload post using Gallery</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
