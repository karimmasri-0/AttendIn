import {Dimensions, StyleSheet, Platform, PixelRatio} from 'react-native';
const normalize = size => {
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const fonts = StyleSheet.create({
  customFont: {
    fontFamily: 'NexaText-Trial-Regular',
  },
  mini: {
    fontSize: normalize(12),
  },
  small: {
    fontSize: normalize(15),
  },
  medium: {
    fontSize: normalize(17),
  },
  large: {
    fontSize: normalize(20),
  },
  xlarge: {
    fontSize: normalize(24),
  },
});
