import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {height, width} from '../dimension/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

export default function Home(props) {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    let image = JSON.parse(await AsyncStorage.getItem('IMAGE'));
    setData(image);
  };
  const renderEmpty = () => (
    <View
      style={{
        height: height / 1.3,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          alignSelf: 'center',
        }}>
        No Post
      </Text>
    </View>
  );

  const onLike = async (index, flag) => {
    let tempData = [...data];
    tempData[index].like = !flag;
    setData(tempData);
    await AsyncStorage.setItem('IMAGE', JSON.stringify(tempData));
  };
  const logout = async () => {
    await AsyncStorage.setItem('IMAGE', '');
    props.navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={styles.mainText}>Hubble Web</Text>
      <FlatList
        data={data}
        style={{marginBottom: width / 7.5}}
        ListEmptyComponent={renderEmpty}
        renderItem={({item, index}) => (
          <View style={styles.mainView}>
            <View style={styles.upperRowContainer}>
              <Image source={{uri: item.image}} style={styles.dpImg} />
              <Text style={styles.name}>{item.name}</Text>
              <Image
                source={require('../assets/dot.png')}
                style={styles.rightDotImg}
              />
            </View>

            <Image source={{uri: item.image}} style={styles.img} />
            <View style={styles.lowerRowConatiner}>
              <View style={styles.underRowConatiner}>
                <TouchableOpacity onPress={() => onLike(index, item.like)}>
                  <Image
                    source={
                      item.like
                        ? require('../assets/like.png')
                        : require('../assets/heart.png')
                    }
                    style={styles.like}
                  />
                </TouchableOpacity>

                <Image
                  source={require('../assets/share.png')}
                  style={styles.like}
                />
                <Image
                  source={require('../assets/comment.png')}
                  style={styles.comment}
                />
              </View>
              <Image
                source={require('../assets/save.png')}
                style={styles.like}
              />
            </View>
          </View>
        )}
        keyExtractor={item => item.image}
      />

      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Image source={require('../assets/logout.png')} style={styles.img1} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: width / 1.1,
    height: 'auto',
    borderRadius: 12,
    marginBottom: width / 40,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: width / 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  img: {
    resizeMode: 'cover',
    width: width / 1.1,
    height: width / 1.5,
    alignSelf: 'center',
  },
  like: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    margin: width / 80,
  },
  img1: {
    width: 70,
    height: 70,
  },
  logout: {
    alignSelf: 'flex-end',
    right: width / 30,
    position: 'absolute',
    bottom: width / 5,
  },
  mainText: {
    color: '#003B73',
    textAlign: 'center',
    fontSize: 28,
    marginTop: width / 40,
    fontWeight: '700',
  },
  name: {
    fontSize: 14,
    color: 'black',
    marginLeft: width / 40,
    width: '75%',
  },
  upperRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width / 40,
    marginBottom: width / 40,
    marginTop: width / 40,
  },
  dpImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
    resizeMode: 'contain',
  },
  rightDotImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  lowerRowConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  underRowConatiner: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  comment: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
    // margin: width / 80,
  },
});
