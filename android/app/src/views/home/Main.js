import {StyleSheet, PermissionsAndroid, AppState, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CameraModal from './CameraModal';
import OpenCamera from './OpenCamera';
import OpenSettings from './OpenSettings';

export default function Main({accessToken, showToast, themeTools, fonts}) {
  const [permission, setPermission] = useState(true);
  const [modalvisible, setModalVisible] = useState(false);

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

  return (
    <>
      <View style={styles.container}>
        {permission ? (
          <OpenCamera
            setPermission={setPermission}
            setModalVisible={setModalVisible}
            themeTools={themeTools}
          />
        ) : (
          <OpenSettings fonts={fonts} />
        )}
      </View>
      <CameraModal
        accessToken={accessToken}
        showToast={showToast}
        themeTools={themeTools}
        fonts={fonts}
        modalvisible={modalvisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },

  textDanger: {
    textAlign: 'center',
    color: '#e74c3c',
    fontWeight: 'bold',
    margin: 10,
  },
});
