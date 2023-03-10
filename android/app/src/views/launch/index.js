import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../theme/ThemeContext';
import jwtDecode from 'jwt-decode';

const LoginTemp = ({navigation}) => {
  const {themeTools} = useContext(ThemeContext);

  const getStorageData = async () => {
    try {
      const access_token = await AsyncStorage.getItem('@access_token');
      const user_data = await AsyncStorage.getItem('@user_data');
      if (access_token && user_data) {
        if (access_token === 'expired') {
          return navigation.navigate('home');
        } else if (
          jwtDecode(access_token).exp < Math.floor(new Date().getTime() / 1000)
        ) {
          AsyncStorage.setItem('@access_token', 'expired');
          return navigation.navigate('home');
        } else if (
          jwtDecode(access_token).exp > Math.floor(new Date().getTime() / 1000)
        ) {
          return navigation.navigate('home');
        }
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
