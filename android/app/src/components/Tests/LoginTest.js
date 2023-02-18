import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import logo from '../main/res/drawable/attendin_logo_square.png';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import UserInput from './UserInputTest';
import Octicons from 'react-native-vector-icons/Octicons';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusUsername, setFocusUsername] = useState(false);
  const [thereIsUsername, setThereIsUsername] = useState(false);
  const animateUsername = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  const handleUsername = text => {
    if (text != '') setThereIsUsername(true);
    else setThereIsUsername(false);
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
    if (!thereIsUsername) {
      Animated.timing(animateUsername, {
        toValue: {x: 0, y: 0},
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  console.log('password >>> ' + password);
  console.log('username >>> ' + username);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      {/* <View
        style={[styles.inputGroup, focusUsername && styles.inputGroupFocus]}>
        <TextInput
          onChangeText={handleUsername}
          value={username}
          style={styles.input}
          onFocus={handleFocusUsername}
          onBlur={handleBlurUsername}
          enterKeyHint="next"
          onSubmitEditing={() => passwordRef.current.focus()}
        />
       
        <Animated.Text
          style={[
            styles.labelUsername,
            {
              transform: [
                {translateX: animateUsername.x},
                {translateY: animateUsername.y},
              ],
            },
            focusUsername && styles.focused,
            !focusUsername && thereIsUsername && styles.focused,
          ]}>
          Username
        </Animated.Text>
      </View> */}
      <UserInput
        label={'Username'}
        icon={
          <FontAwesome5
            name="user-circle"
            size={20}
            color="dimgray"
            style={styles.labelIcon}
          />
        }
        secureTextEntry={false}
        selectTextOnFocus={false}
        value={username}
        setValue={e => setUsername(e)}
        refer={passwordRef}
      />

      <UserInput
        label={'Password'}
        icon={
          <Octicons
            name="lock"
            size={20}
            color="dimgray"
            style={styles.labelIcon}
          />
        }
        secureTextEntry={true}
        selectTextOnFocus={true}
        value={password}
        setValue={e => setPassword(e)}
        ref={passwordRef}
        refer={submitRef}
      />
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    bottom: 0,
  },
  labelIcon: {
    position: 'absolute',
    bottom: 13,
    left: 8,
  },
});
