import {
  StyleSheet,
  Animated,
  PermissionsAndroid,
  Pressable,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function OpenCamera({
  setPermission,
  setModalVisible,
  themeTools,
}) {
  const animateIcon = useState(new Animated.Value(0))[0];
  useEffect(() => {
    Animated.spring(animateIcon, {
      toValue: 200,
      delay: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
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
  return (
    <Animated.View
      style={[styles.containerIcon, {transform: [{translateY: animateIcon}]}]}>
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
  );
}

const styles = StyleSheet.create({
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
});
