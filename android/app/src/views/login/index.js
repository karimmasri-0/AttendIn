import {View, BackHandler, Image, StyleSheet, Appearance} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {ThemeContext} from '../../theme/ThemeContext';
import logo from '../../main/res/drawable/attendin_logo_square.png';
import Toaster from '../../components/Toaster';
import InputGroup from './InputGroup';
import InputSubmit from './InputSubmit';

const Login = ({navigation}) => {
  const {themeTools, toggleTheme, fonts} = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [animation, setAnimation] = useState(false);
  const passwordRef = useRef(null);
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

  useEffect(() => {
    if (animation)
      setTimeout(() => {
        setAnimation(!animation);
      }, 2500);
  }, [animation]);
  const showToast = (title, body = '', icon = '', error = false) => {
    setTitle(title);
    setBody(body);
    setIcon(icon);
    setError(error);
    setAnimation(true);
  };
  const onSubmit = () => {
    passwordRef.current.focus();
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
      <InputGroup
        label={'Username'}
        icon={<Feather name="user" size={20} color="dimgray" />}
        value={username}
        setValue={setUsername}
        fonts={fonts}
        themeTools={themeTools}
        onSubmit={onSubmit}
      />
      <InputGroup
        inputType="password"
        label={'Password'}
        icon={<Feather name="lock" size={20} color="dimgray" />}
        value={password}
        setValue={setPassword}
        fonts={fonts}
        themeTools={themeTools}
        selectTextOnFocus={true}
        ref={passwordRef}
      />
      <InputSubmit
        username={username}
        password={password}
        navigation={navigation}
        showToast={showToast}
        fonts={fonts}
      />
    </View>
  );
};

export default Login;

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
});
