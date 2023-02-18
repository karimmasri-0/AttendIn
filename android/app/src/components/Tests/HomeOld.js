import {
  View,
  Linking,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import imageBg from '../../main/res/drawable/X_opacity_20.jpg';
import Loading from '../Loading';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
import HomeHeader from '../HomeHeader';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

const Home = ({navigation}) => {
  const [permission, setPermission] = useState(true);
  const [modalvisible, setModalVisible] = useState(false);
  const animateIcon = useState(new Animated.Value(0))[0];

  // const devices = useCameraDevices();
  // const device = devices.back;
  // if (device == null) return <Loading />;

  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true,
  // });

  BackHandler.addEventListener('hardwareBackPress', () => {
    BackHandler.exitApp();
  });

  const handleCamera = async () => {
    //   // const cameraPermission = await Camera.getCameraPermissionStatus();
    //   // switch (cameraPermission) {
    //     case 'denied' || 'not-determined':
    //       console.log('denied');
    //       // const newCameraPermission = await Camera.requestCameraPermission();
    //       // switch (newCameraPermission) {
    //         case 'authorized in':
    //           setPermission(true);
    //           setModalVisible(true);
    //           break;
    //         case 'denied':
    //           setPermission(false);
    //           break;
    //       }
    //       break;
    //     case 'authorized':
    //       console.log('authorized');
    //       setPermission(true);
    //       setModalVisible(true);
    //       break;
    //   }
  };
  const handleSettings = async () => {
    await Linking.openSettings();
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HomeHeader name="username" />,
      headerBackVisible: false,
    });
    Animated.spring(animateIcon, {
      toValue: 200,
      delay: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  });

  return (
    <ImageBackground style={styles.imageBackground} source={imageBg}>
      <View style={styles.container}>
        {permission ? (
          <Animated.View
            style={[
              styles.containerIcon,
              {transform: [{translateY: animateIcon}]},
            ]}>
            <TouchableOpacity onPress={handleCamera}>
              <EvilIcons
                name="camera"
                size={50}
                color="#2f4081"
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={[styles.container, {marginTop: 0}]}>
            <View style={[styles.containerIcon, {marginBottom: 0}]}>
              <TouchableOpacity onPress={handleSettings}>
                <Ionicons
                  name="settings-outline"
                  size={50}
                  color="#e74c3c"
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.textDanger}>
              To continue you'll need to allow Camera access in Settings.
            </Text>
          </View>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalvisible}
        onRequestClose={() => {
          setModalVisible(!modalvisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{backgroundColor: 'red'}}>
              {/* <Camera
                style={[StyleSheet.absoluteFill, {width: 250, height: 250}]}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                frameProcessorFps={5}
              /> */}
              {/* {barcodes.map((barcode, idx) => (
                <Text key={idx} style={styles.barcodeTextURL}>
                  {barcode.displayValue}
                </Text>
              ))} */}
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.buttonCancel}
                onPress={() => setModalVisible(!modalvisible)}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};
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
    marginBottom: 1200,
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
    color: '#e74c3c',
    fontWeight: 'bold',
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 45,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonCancel: {
    // marginTop: 10,
    color: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#e74c3c',
  },
});
export default Home;
