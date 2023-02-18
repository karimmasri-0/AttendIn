import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../ThemeContext';
import jwtDecode from 'jwt-decode';

const LoginTemp = ({navigation}) => {
  const {themeTools} = useContext(ThemeContext);

  const getStorageData = async () => {
    try {
      if (
        (await AsyncStorage.getItem('@user_data')) &&
        (await AsyncStorage.getItem('@access_token'))
      ) {
        await AsyncStorage.getItem('@access_token').then(res => {
          if (JSON.parse(res)) {
            if (
              parseInt(jwtDecode(JSON.parse(res)).exp) <
              parseInt(new Date().getTime() / 1000)
            ) {
              console.log('1st option');
              AsyncStorage.setItem('@access_token', 'expired');
              return navigation.navigate('home');
            } else {
              console.log('1st option else');
              return navigation.navigate('home');
            }
          } else {
            return navigation.navigate('login');
          }
        });
      } else if (
        (await AsyncStorage.getItem('@user_data')) &&
        !(await AsyncStorage.getItem('@access_token'))
      ) {
        {
          console.log('2nd option');
          return navigation.navigate('home');
        }
      } else if (
        (await AsyncStorage.getItem('@access_token')) &&
        !(await AsyncStorage.getItem('@user_data'))
      ) {
        navigation.navigate('login');
      } else {
        navigation.navigate('login');
      }
    } catch (error) {
      console.error(error);
      navigation.navigate('login');
    }
  };
  useEffect(() => {
    getStorageData();
  }, []);

  return (
    <View
      style={[styles.container, {backgroundColor: themeTools.backgroundColor}]}>
      <ActivityIndicator size="large" color="#2f8147" />
    </View>
  );
};

export default LoginTemp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
