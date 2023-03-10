import {StyleSheet, Animated, Pressable, View, TextInput} from 'react-native';
import React, {forwardRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InputGroup = forwardRef(
  (
    {
      value,
      setValue,
      inputType = 'text',
      label,
      icon,
      selectTextOnFocus = false,
      fonts,
      themeTools,
      onSubmit,
    },
    ref,
  ) => {
    const [inputFocus, setInputFocus] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState('eye-off-outline');
    const [passwordNotVisible, setPasswordNotVisible] = useState(true);
    const animatePassword = useState(new Animated.ValueXY({x: 0, y: 0}))[0];

    const passwordVisibility = () => {
      if (passwordNotVisible) {
        setPasswordIcon('eye-outline');
        setPasswordNotVisible(false);
      } else {
        setPasswordIcon('eye-off-outline');
        setPasswordNotVisible(true);
      }
    };

    const handleFocusInput = () => {
      setInputFocus(!inputFocus);
      Animated.timing(animatePassword, {
        toValue: {x: -10, y: -20},
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
    const handleBlurInput = () => {
      setInputFocus(!inputFocus);
      if (!value) {
        Animated.timing(animatePassword, {
          toValue: {x: 0, y: 0},
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    };

    return (
      <View style={[styles.inputGroup, inputFocus && styles.inputGroupFocus]}>
        {icon}
        <TextInput
          selectionColor="#2f8147"
          value={value}
          onChangeText={setValue}
          style={[
            styles.input,
            fonts.customFont,
            fonts.medium,
            inputType === 'password' ? styles.inputPassword : styles.inputText,
            {color: themeTools.color},
          ]}
          secureTextEntry={
            inputType === 'password' ? passwordNotVisible : false
          }
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          selectTextOnFocus={selectTextOnFocus}
          ref={inputType === 'password' ? ref : null}
          returnKeyType="next"
          blurOnSubmit={inputType == 'text' ? false : true}
          onSubmitEditing={
            inputType === 'text'
              ? onSubmit
              : () => {
                  return;
                }
          }
        />
        <Animated.Text
          style={[
            styles.label,
            fonts.customFont,
            fonts.small,
            {
              color: themeTools.labelColor,
              transform: [
                {translateX: animatePassword.x},
                {translateY: animatePassword.y},
              ],
            },
            inputFocus && styles.focused,
            inputFocus && fonts.mini,
            !inputFocus && value && styles.focused,
            !inputFocus && value && fonts.mini,
          ]}>
          {label}
        </Animated.Text>
        {inputType === 'password' && (
          <Pressable
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]}
            onPress={passwordVisibility}
            hitRect={30}>
            <Ionicons
              name={passwordIcon}
              size={20}
              color="#2f8147"
              style={styles.passwordIcon}
            />
          </Pressable>
        )}
      </View>
    );
  },
);

export default InputGroup;

const styles = StyleSheet.create({
  inputPassword: {
    width: '70%',
  },
  inputText: {
    width: '85%',
  },
  input: {
    left: 5,
    zIndex: 1,
  },
  inputGroup: {
    margin: '3%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2f8147',
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputGroupFocus: {
    borderBottomWidth: 1,
  },
  focused: {
    color: '#2f8147',
  },
  passwordIcon: {
    zIndex: 2,
  },
  label: {
    position: 'absolute',
    marginLeft: '17%',
    zIndex: 0,
  },
});
