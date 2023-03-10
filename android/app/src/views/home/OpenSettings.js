import {StyleSheet, Text, View, Pressable, Linking} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OpenSettings = ({fonts}) => {
  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
  );
};

export default OpenSettings;

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
