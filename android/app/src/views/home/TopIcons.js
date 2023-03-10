import {StyleSheet, Text, View, Animated, Pressable, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopLeftIcon from './TopLeftIcon';
import TopRightIcon from './TopRightIcon';

export default function TopIcons({
  accessToken,
  setAccessToken,
  userData,
  showToast,
  themeTools,
  fonts,
}) {
  const [tooltipVisibility, setTooltipVisibility] = useState(false);
  const animateToken = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animateToken, {
      toValue: 1,
      delay: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  useEffect(() => {
    if (tooltipVisibility)
      setTimeout(() => {
        setTooltipVisibility(!tooltipVisibility);
      }, 3000);
  }, [tooltipVisibility]);

  return (
    <View style={styles.container}>
      <TopLeftIcon
        tooltipVisibility={tooltipVisibility}
        setTooltipVisibility={setTooltipVisibility}
        accessToken={accessToken}
        animateToken={animateToken}
        themeTools={themeTools}
        fonts={fonts}
      />
      <TopRightIcon
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        animateToken={animateToken}
        userData={userData}
        themeTools={themeTools}
        showToast={showToast}
        fonts={fonts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
