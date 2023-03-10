import {StyleSheet, Text, Animated, Pressable} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import jwt_decode from 'jwt-decode';

const InputSubmit = ({
  username = '',
  password = '',
  showToast,
  navigation,
  fonts,
}) => {
  const animateSubmit = useState(new Animated.Value(1))[0];
  const handlePressIn = () => {
    Animated.spring(animateSubmit, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(animateSubmit, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    if (username == '' || username == null || username == undefined)
      return showToast('Username is required', '', '', true);
    if (password == '' || password == null || password == undefined)
      return showToast('Password is required', '', '', true);
    try {
      const response = await axios.post(
        `http://${Config.IP}:${Config.PORT}/login`,
        {
          Username: username,
          Password: password,
        },
      );
      if (response.data.message === true) {
        if (
          jwt_decode(response.data.access_token).Role === 0 ||
          jwt_decode(response.data.access_token).Role === 1
        ) {
          return showToast(
            'These credentials do not belong to a student.',
            '',
            '',
            true,
          );
        } else {
          storeData('@user_data', response.data.data);
          storeData('@access_token', response.data.access_token);
          storeData('@cred', {username: username, password: password});
          navigation.navigate('home');
        }
      } else {
        showToast('Incorrect username or password.', '', '', true);
      }
    } catch (error) {
      showToast('Error Occured.', '', '', true);
      console.log(error);
    }
  };
  return (
    <Pressable
      style={[{marginTop: 40}, ({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleSubmit}>
      <Animated.View
        style={[styles.button, {transform: [{scale: animateSubmit}]}]}>
        <Text style={[styles.buttonText, fonts.customFont, fonts.medium]}>
          Login
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default InputSubmit;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2f8147',
    paddingHorizontal: 80,
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
});
