import {
  View,
  StyleSheet,
  ImageBackground,
  BackHandler,
  Appearance,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import background_light from '../../main/res/drawable/background_light.jpg';
import background_dark from '../../main/res/drawable/background_dark.jpg';
import {ThemeContext} from '../../theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../components/Toaster';
import TopIcons from './TopIcons';
import Main from './Main';

const Home = () => {
  const {isLight, themeTools, toggleTheme, fonts} = useContext(ThemeContext);
  const [display, setDisplay] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [animation, setAnimation] = useState(false);
  const [userData, setUserData] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState(false);

  const getAsyncStorageData = async (key, setState) => {
    try {
      const response = await AsyncStorage.getItem(key);
      setState(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      toggleTheme(colorScheme);
    });
    return () => listener.remove();
  }, []);

  useEffect(() => {
    getAsyncStorageData('@user_data', setUserData);
    getAsyncStorageData('@access_token', setAccessToken);
  }, []);

  BackHandler.addEventListener('hardwareBackPress', () => {
    BackHandler.exitApp();
  });
  // if (display) {
  //   setTimeout(() => {
  //     setModalVisible(true);
  //     setDisplay(false);
  //   }, 600);
  // }

  const showToast = (title, body, icon, error) => {
    setTitle(title);
    setBody(body);
    setIcon(icon);
    setError(error);
    setAnimation(true);
  };

  useEffect(() => {
    if (animation)
      setTimeout(() => {
        setAnimation(!animation);
      }, 3000);
  }, [animation]);

  return (
    <>
      <ImageBackground
        style={styles.imageBackground}
        source={isLight ? background_light : background_dark}>
        <View style={styles.main}>
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
        </View>
        <TopIcons
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          userData={userData}
          showToast={showToast}
          themeTools={themeTools}
          fonts={fonts}
        />
        <Main
          accessToken={accessToken}
          showToast={showToast}
          themeTools={themeTools}
          fonts={fonts}
        />
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
});
