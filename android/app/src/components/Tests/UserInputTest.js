import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Animated,
} from 'react-native';
import React, {forwardRef, useState} from 'react';

const UserInput = forwardRef(
  (
    {label, icon, secureTextEntry, selectTextOnFocus, value, setValue, refer},
    ref,
  ) => {
    const [focusPassword, setFocusPassword] = useState(false);
    const animatePassword = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
    const [thereIsPassword, setThereIsPassword] = useState(false);
    const handleSubmit = () => {
      if (username == '' && password == '') {
        setTimeout(() => {
          navigation.navigate('home');
        }, 100);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Incorrect username or password.',
        });
      }
    };
    const handlePasswod = pass => {
      if (pass != '') setThereIsPassword(true);
      else setThereIsPassword(false);
      setValue(pass);
    };
    const handleFocusPassword = () => {
      setFocusPassword(!focusPassword);
      Animated.timing(animatePassword, {
        toValue: {x: -10, y: -20},
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
    const handleBlurPassword = () => {
      setFocusPassword(!focusPassword);
      if (!thereIsPassword) {
        Animated.timing(animatePassword, {
          toValue: {x: 0, y: 0},
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <View
        style={[styles.inputGroup, focusPassword && styles.inputGroupFocus]}>
        <TextInput
          value={value}
          onChangeText={handlePasswod}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocusPassword}
          onBlur={handleBlurPassword}
          selectTextOnFocus={selectTextOnFocus}
          ref={ref}
          onSubmitEditing={() => ref.current.focus()}
        />

        {icon}

        <Animated.Text
          style={[
            styles.labelPassword,
            {
              transform: [
                {translateX: animatePassword.x},
                {translateY: animatePassword.y},
              ],
            },
            focusPassword && styles.focused,
            !focusPassword && thereIsPassword && styles.focused,
          ]}>
          {label}
        </Animated.Text>

        {label == 'Password' && (
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            ref={refer}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);
export default UserInput;

const styles = StyleSheet.create({
  inputGroup: {
    margin: 10,
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderColor: '#2f8147',
    borderRadius: 0,
    // borderRadius: 10,
    padding: 0,
    width: 200,
    flexDirection: 'row',
  },
  inputGroupFocus: {
    borderBottomWidth: 1.5,
  },
  input: {
    width: 160,
    left: 30,
    zIndex: 1,
  },
  labelUsername: {
    right: 125,
    top: 15,
  },
  labelPassword: {
    right: 125,
    top: 15,
  },
  focused: {
    fontSize: 10,
  },
  button: {
    backgroundColor: '#2f8147',
    marginTop: 20,
    paddingHorizontal: 50,
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
});
