import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  TextInput,
  Appearance,
  Animated,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Config from 'react-native-config';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {ThemeContext} from '../ThemeContext';
import logo from '../main/res/drawable/attendin_logo_square.png';
import Toaster from './Toaster';

function Login({navigation}) {
  const {themeTools, toggleTheme, fonts} = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [passwordNotVisible, setPasswordNotVisible] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye-off-outline');
  const animateUsername = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const animatePassword = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const animateSubmit = useState(new Animated.Value(1))[0];
  const [animation, setAnimation] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  // const submitRef = useRef(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      console.log(colorScheme);
      toggleTheme(colorScheme);
    });
    return () => listener.remove();
  });
  BackHandler.addEventListener('hardwareBackPress', () => {
    BackHandler.exitApp();
  });
  const handleUsername = text => {
    setUsername(text);
  };
  const handleFocusUsername = () => {
    setFocusUsername(!focusUsername);
    Animated.timing(animateUsername, {
      toValue: {x: -10, y: -20},
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  const handleBlurUsername = () => {
    setFocusUsername(!focusUsername);
    if (!username) {
      Animated.timing(animateUsername, {
        toValue: {x: 0, y: 0},
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePassword = pass => {
    setPassword(pass);
  };
  const handleFocusPassword = () => {
    setFocusPassword(!focusPassword);
    Animated.timing(animatePassword, {
      toValue: {x: -10, y: -20},
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  const handleBlurPassword = () => {
    setFocusPassword(!focusPassword);
    if (!password) {
      Animated.timing(animatePassword, {
        toValue: {x: 0, y: 0},
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const passwordVisibility = () => {
    if (passwordNotVisible) {
      setPasswordIcon('eye-outline');
      setPasswordNotVisible(false);
    } else {
      setPasswordIcon('eye-off-outline');
      setPasswordNotVisible(true);
    }
  };

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
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const handleSubmit = async () => {
    if (username == '' || username == null || username == undefined)
      return showToast('Username is required', '', '', true);
    if (password == '' || password == null || password == undefined)
      return showToast('Password is required', '', '', true);
    await axios
      .post(`http://${Config.IP}:${Config.PORT}/login`, {
        Username: username,
        Password: password,
        // Username: 'Omar',
        // Password: '123456',
        // Username: 'Salah',
        // Password: '123456',
        // Username: 'ghiehomar@gmail.com',
        // Password: '123456',
      })
      .then(response => {
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
            storeData('cred', {username: username, password: password});
            navigation.navigate('home');
          }
        } else {
          showToast('Incorrect username or password.', '', '', true);
        }
      })
      .catch(error => showToast('Error Occured.' + error, '', '', true));
  };
  useEffect(() => {
    if (animation)
      setTimeout(() => {
        setAnimation(!animation);
      }, 6000);
  }, [animation]);
  const showToast = (title, body = '', icon = '', error = false) => {
    setTitle(title);
    setBody(body);
    setIcon(icon);
    setError(error);
    setAnimation(true);
  };
  return (
    <View
      style={[styles.container, {backgroundColor: themeTools.backgroundColor}]}>
      <Image source={logo} style={styles.image} />
      {animation && (
        <Toaster
          title={title}
          body={body}
          icon={icon}
          error={error}
          state={bool => {
            setAnimation(bool);
          }}
        />
      )}
      <View
        style={[styles.inputGroup, focusUsername && styles.inputGroupFocus]}>
        <Feather name="user" size={20} color="dimgray" />
        <TextInput
          autoFocus={true}
          returnKeyType="next"
          ref={usernameRef}
          onChangeText={handleUsername}
          value={username}
          style={[
            styles.input,
            styles.inputUsername,
            {color: themeTools.color},
          ]}
          onFocus={handleFocusUsername}
          onBlur={handleBlurUsername}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Animated.Text
          style={[
            styles.label,
            fonts.customFont,
            fonts.small,
            {
              color: themeTools.labelColor,
              transform: [
                {translateX: animateUsername.x},
                {translateY: animateUsername.y},
              ],
            },
            focusUsername && styles.focused,
            focusUsername && fonts.mini,
            !focusUsername && username && styles.focused,
            !focusUsername && username && fonts.mini,
          ]}>
          Username
        </Animated.Text>
      </View>
      <View
        style={[styles.inputGroup, focusPassword && styles.inputGroupFocus]}>
        <Feather name="lock" size={20} color="dimgray" />
        <TextInput
          returnKeyType="send"
          selectionColor="#2f8147"
          value={password}
          onChangeText={handlePassword}
          style={[
            styles.input,
            fonts.customFont,
            fonts.medium,
            styles.inputPassword,
            {color: themeTools.color},
          ]}
          secureTextEntry={passwordNotVisible}
          onFocus={handleFocusPassword}
          onBlur={handleBlurPassword}
          selectTextOnFocus={true}
          ref={passwordRef}
          // onSubmitEditing={() => submitRef.current.focus()}
          onSubmitEditing={handleSubmit}
        />
        <Animated.Text
          style={[
            styles.label,
            fonts.customFont,
            fonts.small,
            {
              color: themeTools.labelColor,
              transform: [
                {translateX: animatePassword.x},
                {translateY: animatePassword.y},
              ],
            },
            focusPassword && styles.focused,
            focusPassword && fonts.mini,
            !focusPassword && password && styles.focused,
            !focusPassword && password && fonts.mini,
          ]}>
          Password
        </Animated.Text>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}
          onPress={passwordVisibility}
          hitRect={30}>
          <Ionicons
            name={passwordIcon}
            size={20}
            color="#2f8147"
            style={styles.passwordIcon}
          />
        </Pressable>
      </View>
      <Pressable
        style={[
          {marginTop: 40},
          ({pressed}) => [{opacity: pressed ? 0.5 : 1.0}],
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleSubmit}
        // ref={submitRef}
      >
        <Animated.View
          style={[styles.button, {transform: [{scale: animateSubmit}]}]}>
          <Text style={[styles.buttonText, fonts.customFont, fonts.medium]}>
            Login
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: '25%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    bottom: 0,
  },
  input: {
    left: 5,
    zIndex: 1,
  },
  inputGroup: {
    margin: '3%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2f8147',
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputGroupFocus: {
    borderBottomWidth: 1,
  },
  inputUsername: {
    width: '85%',
  },
  inputPassword: {
    width: '70%',
  },
  label: {
    position: 'absolute',
    marginLeft: '17%',
    zIndex: 0,
  },
  focused: {
    color: '#2f8147',
  },
  button: {
    backgroundColor: '#2f8147',
    paddingHorizontal: 80,
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
  passwordIcon: {
    zIndex: 2,
  },
});
export default Login;
