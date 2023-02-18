import {Text, View, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../ThemeContext';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const HomeHeader = () => {
  const {fonts} = useContext(ThemeContext);
  const navigation = useNavigation();
  const dates = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = dates[new Date().getDay()];

  const [userData, setUserData] = useState('');

  const getAsyncStorageData = async (key, setState) => {
    try {
      const value = await AsyncStorage.getItem(key).then(res => {
        setState(JSON.parse(res));
      });
      return value;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAsyncStorageData('@user_data', setUserData);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@access_token');
    await AsyncStorage.removeItem('@user_data');
    Toast.show({
      type: 'error',
      text1: 'You were singed out.',
    });
    navigation.navigate('login');
  };

  return (
    <View
      style={[
        styles.container,
        {
          marginRight: 35,
        },
      ]}>
      <Text>
        <Text style={[styles.greeting, fonts.customFont, fonts.large]}>
          {userData && `Happy ${day}, `}
        </Text>
        <Text style={[styles.name, fonts.customFont, fonts.large]}>
          {userData.FirstName}
        </Text>
      </Text>
      <Pressable onPress={handleLogout}>
        <Text>
          <MaterialCommunityIcons color="white" size={22} name="logout" />
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeHeader;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    zIndex: 2,
    fontWeight: '600',
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  greeting: {
    color: 'white',
  },
  schedule: {
    fontWeight: '700',
    marginLeft: '1000%',
  },
});
