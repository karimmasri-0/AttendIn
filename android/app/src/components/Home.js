import {
  View,
  Linking,
  Modal,
  Text,
  PermissionsAndroid,
  StyleSheet,
  Animated,
  ImageBackground,
  BackHandler,
  Appearance,
  AppState,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RNCamera} from 'react-native-camera';
import background_light from '../main/res/drawable/background_light.jpg';
import background_dark from '../main/res/drawable/background_dark.jpg';
import {ThemeContext} from '../ThemeContext';
import beamred from '../main/res/drawable/beamred.png';
import beamgreen from '../main/res/drawable/beamgreen.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toaster from './Toaster';
import Config from 'react-native-config';

const Home = () => {
  const {isLight, themeTools, toggleTheme, fonts} = useContext(ThemeContext);
  const [permission, setPermission] = useState(true);
  const [modalvisible, setModalVisible] = useState(false);
  const [display, setDisplay] = useState(true);
  const animateIcon = useState(new Animated.Value(0))[0];
  const animateToken = useState(new Animated.Value(0))[0];
  const [accessToken, setAccessToken] = useState('');
  const [tooltipVisibility, setTooltipVisibility] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [schedule, setSchedule] = useState('');
  const [userData, setUserData] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState(false);
  const [cred, setCred] = useState('');
  const tokenModalRef = useRef();

  const getAsyncStorageData = async (key, setState) => {
    try {
      const value = await AsyncStorage.getItem(key).then(res => {
        setState(res);
      });
      return value;
    } catch (error) {
      console.log(error);
    }
  };
  const restoreToken = async () => {
    console.log(JSON.parse(cred).username);
    await axios
      .post(`http://${Config.IP}:${Config.PORT}/login`, {
        // Username: 'ghiehomar@gmail.com',
        // Password: '123456',
        Username: JSON.parse(cred).username,
        Password: JSON.parse(cred).password,
      })
      .then(res => {
        setAccessToken(res.data.access_token);
      })
      .catch(error => console.log(error));
  };
  const getSchedule = async () => {
    console.log('getSchedule');
    if (userData && accessToken) {
      if (accessToken == 'expired') {
        return restoreToken();
      } else {
        console.log('userData && accessToken');
        await axios
          .get(
            `http://${Config.IP}:${Config.PORT}/student/${
              userData.id
            }?token=${JSON.parse(accessToken)}`,
          )
          .then(response => {
            setSchedule(JSON.stringify(response.data));
          })
          .catch(error => {
            console.log(error);
            switch (error.response.status) {
              case 500:
                setSchedule('No registered Courses yet.');
                break;
              case 401:
                setAccessToken('');
                setSchedule('Token expired.');
                restoreToken();
                break;
              default:
                setSchedule('Unexpected error.');
                break;
            }
          });
      }
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
    getAsyncStorageData('cred', setCred);
  }, []);

  useEffect(() => {
    if (accessToken) getSchedule();
  }, [accessToken]);
  BackHandler.addEventListener('hardwareBackPress', () => {
    BackHandler.exitApp();
  });
  if (display) {
    setTimeout(() => {
      setModalVisible(true);
      setDisplay(false);
    }, 600);
  }
  const openSettings = async () => {
    await Linking.openSettings();
  };
  const showToast = (title, body, icon, error) => {
    setTitle(title);
    setBody(body);
    setIcon(icon);
    setError(error);
    setAnimation(true);
  };
  const handleQrCode = async e => {
    // return console.log(e.data);
    try {
      if (accessToken) {
        await axios
          .post(
            `http://${Config.IP}:${Config.PORT}/student/?token=${JSON.parse(
              accessToken,
            )}`,
            {
              UserId: JSON.parse(userData).id,
              roomres: JSON.parse(e.data).id,
            },
          )
          .then(res => {
            if (res.data.message == 'You are Registered Successfully') {
              showToast(
                'Registered Successfully',
                '',
                <Feather
                  name={'check-circle'}
                  style={{marginLeft: 300}}
                  color="#2f8147"
                  size={20}
                />,
                false,
              );
            } else {
              showToast(
                'Already Registered',
                '',
                <Feather name={'minus-circle'} color="#e74c3c" size={20} />,
                true,
              );
            }
          })
          .catch(error => {
            showToast('Error Occured', '', '', true);
            console.log('qr code error >>> ' + error);
          });
        setModalVisible(false);
      } else {
        console.log('No Access Token');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
        setModalVisible(true);
      } else {
        setPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (permission === false) {
      const listener = AppState.addEventListener('focus', () => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
          res => {
            if (res === true) {
              setPermission(true);
            }
          },
        );
      });
      return () => listener.remove();
    }
  });

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animateIcon, {
        toValue: 200,
        delay: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animateToken, {
        toValue: 1,
        delay: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const displayScheduleAnimation = () => {
    showToast(
      schedule == 'No registered Courses yet.' ||
        schedule == 'Token expired.' ||
        !schedule
        ? schedule
        : 'Courses reported: ',
      schedule == 'No registered Courses yet.' ||
        schedule == 'Token expired.' ||
        !schedule
        ? null
        : displaySchedule(schedule),
      '',
      false,
    );
  };
  useEffect(() => {
    if (animation)
      setTimeout(() => {
        setAnimation(!animation);
      }, 6000);
  }, [animation]);
  const displaySchedule = schedule => {
    const data = JSON.parse(schedule);
    return data.map(row => {
      const d = new Date(row.Date);
      return (
        <Text
          key={row.Course}
          style={[styles.coursesText, fonts.customFont, fonts.mini]}>
          <Text style={styles.schedule}>Course:</Text>
          {'\t'}
          {row.Course}
          {'\t'}
          {'\t'}
          <Text style={styles.schedule}>Room:</Text>
          {'\t'}
          {row.Room}
          {'\n'}
          <Text style={styles.schedule}>Date:</Text>
          {'\t'}
          {d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()}
          {'\t'}
          {'\t'}
          <Text style={styles.schedule}>Time:</Text>
          {'\t'}
          {row.STime}
          {'-'}
          {row.ETime}
          {'\n'}
        </Text>
      );
    });
  };

  return (
    <>
      <ImageBackground
        style={styles.imageBackground}
        source={isLight ? background_light : background_dark}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
          }}>
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
        <View
          style={{
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => setTooltipVisibility(!tooltipVisibility)}
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
            <Animated.Image
              source={accessToken ? beamgreen : beamred}
              style={{
                width: 32,
                height: 32,
                position: 'absolute',
                opacity: animateToken,
              }}
            />
          </Pressable>
          <Pressable>
            <Animated.View style={{opacity: animateToken}}>
              <FontAwesome
                name="user"
                onPress={displayScheduleAnimation}
                size={32}
                color={themeTools.color}
                style={[({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]]}
              />
            </Animated.View>
          </Pressable>
          <Modal
            animationType="fade"
            hardwareAccelerated={true}
            transparent={true}
            visible={tooltipVisibility}
            onRequestClose={() => {
              setTooltipVisibility(!tooltipVisibility);
            }}
            ref={tokenModalRef}>
            <Pressable
              onPress={() => setTooltipVisibility(!tooltipVisibility)}
              style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
              <View style={{width: '100%', height: '100%'}}>
                <View
                  style={[
                    styles.tokenIcon,
                    {backgroundColor: themeTools.backgroundColor},
                  ]}>
                  <Text style={[fonts.mini, {textAlign: 'center'}]}>
                    {accessToken ? 'Token Alive' : 'Expired Token'}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
        <View style={styles.container}>
          {permission ? (
            <Animated.View
              style={[
                styles.containerIcon,
                {transform: [{translateY: animateIcon}]},
              ]}>
              <Pressable
                onPress={() => requestCameraPermission()}
                hitRect={{top: 20, left: 20, bottom: 20, right: 20}}
                style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
                <EvilIcons
                  name="camera"
                  size={50}
                  color={themeTools.color}
                  style={styles.cameraIcon}
                />
              </Pressable>
            </Animated.View>
          ) : (
            <View style={[styles.container, {marginTop: 0}]}>
              <View style={[styles.containerIcon, {marginBottom: 0}]}>
                <Pressable
                  onPress={() => openSettings}
                  style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
                  <Ionicons
                    name="settings-outline"
                    size={50}
                    color="#e74c3c"
                    style={styles.cameraIcon}
                  />
                </Pressable>
              </View>
              <Text style={[styles.textDanger, fonts.customFont, fonts.medium]}>
                To continue you'll need to allow Camera access in Settings.
              </Text>
            </View>
          )}
        </View>
        <Modal
          animationType="fade"
          hardwareAccelerated={true}
          transparent={true}
          visible={modalvisible}
          onRequestClose={() => {
            setModalVisible(!modalvisible);
          }}>
          <Pressable
            style={styles.centeredView}
            onPressIn={() => setModalVisible(!modalvisible)}>
            <View
              style={[
                styles.modalView,
                {backgroundColor: themeTools.backgroundColor},
              ]}>
              <QRCodeScanner
                containerStyle={styles.qrCodeContainer}
                cameraStyle={styles.camera}
                cameraType={'back'}
                flashMode={RNCamera.Constants.FlashMode.off}
                onRead={e => {
                  handleQrCode(e);
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                  height: 50,
                  position: 'relative',
                }}>
                <View style={{height: '60%'}} />
                <Pressable
                  style={[
                    styles.buttonCancel,
                    ({pressed}) => [{opacity: pressed ? 0.5 : 1.0}],
                  ]}
                  onPress={() => setModalVisible(!modalvisible)}>
                  <Text
                    style={[
                      styles.buttonCancelText,
                      fonts.customFont,
                      fonts.mini,
                    ]}>
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
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
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  containerIcon: {
    marginBottom: 1400,
    width: 60,
    height: 60,
    backgroundColor: '#2f8147',
    borderRadius: 100,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    zIndex: 2,
  },
  textDanger: {
    textAlign: 'center',
    color: '#e74c3c',
    fontWeight: 'bold',
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    // width: '80%',
    // height: '70%',
    width: 280,
    height: 380,
    backgroundColor: 'white',
    borderRadius: 20,
    // paddingTop: 45,
    padding: '10%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // display: 'flex',
    // flex: 0.6,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  buttonCancel: {
    // position: 'absolute',
    // marginBottom: 30,
    // marginTop: '10%',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#e74c3c',
  },
  buttonCancelText: {
    color: 'white',
  },
  camera: {
    width: 220,
    height: 220,
  },
  qrCodeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tokenIcon: {
    padding: 5,
    borderRadius: 3,
    width: 100,
    marginTop: 100,
    marginLeft: '2%',
  },
});
