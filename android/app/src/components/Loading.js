import {StyleSheet, ActivityIndicator, View, useContext} from 'react-native';
import React from 'react';
import {ThemeContext} from '../theme/ThemeContext';

const Loading = () => {
  const {themeTools} = useContext(ThemeContext);
  return (
    <View
      style={[styles.container, {backgroundColor: themeTools.backgroundColor}]}>
      <ActivityIndicator size="large" color="#2f8147" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {},
});
