import {StyleSheet, Animated, View, Text, Pressable, Modal} from 'react-native';
import React from 'react';
import beamred from '../../main/res/drawable/beamred.png';
import beamgreen from '../../main/res/drawable/beamgreen.png';

const TopLeftIcon = ({
  tooltipVisibility,
  setTooltipVisibility,
  accessToken,
  animateToken,
  themeTools,
  fonts,
}) => {
  return (
    <>
      <Pressable
        onPress={() => setTooltipVisibility(!tooltipVisibility)}
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
        <Animated.Image
          source={
            !accessToken || accessToken == 'expired' ? beamred : beamgreen
          }
          style={[styles.tokenIcon, {opacity: animateToken}]}
        />
      </Pressable>
      <Modal
        animationType="fade"
        hardwareAccelerated={true}
        transparent={true}
        visible={tooltipVisibility}
        onRequestClose={() => {
          setTooltipVisibility(!tooltipVisibility);
        }}>
        <Pressable
          onPress={() => setTooltipVisibility(!tooltipVisibility)}
          style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}>
          <View style={{width: '100%', height: '100%'}}>
            <View
              style={[
                styles.tokenIconModal,
                {backgroundColor: themeTools.backgroundColor},
              ]}>
              <Text style={[fonts.mini, {textAlign: 'center'}]}>
                {accessToken == 'expired' || !accessToken
                  ? 'Expired Token'
                  : 'Token Alive'}
              </Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default TopLeftIcon;

const styles = StyleSheet.create({
  tokenIcon: {
    width: 32,
    height: 32,
    position: 'absolute',
  },
  tokenIconModal: {
    padding: 5,
    borderRadius: 3,
    width: 100,
    marginTop: 100,
    marginLeft: '2%',
  },
});
