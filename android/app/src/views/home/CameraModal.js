import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import Config from 'react-native-config';

export default function CameraModal({
  modalvisible,
  setModalVisible,
  accessToken,
  showToast,
  themeTools,
  fonts,
}) {
  const handleQrCode = async e => {
    // return console.log(e.data);
    try {
      if (accessToken) {
        try {
          const response = await axios.post(
            `http://${Config.IP}:${Config.PORT}/student/?token=${JSON.parse(
              accessToken,
            )}`,
            {
              UserId: JSON.parse(userData).id,
              roomres: JSON.parse(e.data).id,
            },
          );
          if (response.data.message == 'You are Registered Successfully') {
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
        } catch (error) {
          showToast('Error Occured', '', '', true);
        }
        setModalVisible(false);
      } else {
        console.log('No Access Token');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
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
                style={[styles.buttonCancelText, fonts.customFont, fonts.mini]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 280,
    height: 380,
    backgroundColor: 'white',
    borderRadius: 20,
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
  },
  qrCodeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  camera: {
    width: 220,
    height: 220,
  },
  buttonCancel: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#e74c3c',
  },
  buttonCancelText: {
    color: 'white',
  },
});
