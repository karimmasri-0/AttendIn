import {Text, View, StyleSheet, Pressable, Animated} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../ThemeContext';
import axios from 'axios';
import {ip} from '../global';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const HomeHeader = () => {
  const {fonts} = useContext(ThemeContext);
  const navigation = useNavigation();
  const dates = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = dates[new Date().getDay()];
  const [animation, setAnimation] = useState(false);
  const headerAnimation = useState(new Animated.Value(42))[0];
  const textAnimation = useState(new Animated.Value(0))[0];
  const courseAnimation = useState(new Animated.Value(-800))[0];

  const [userData, setUserData] = useState('');
  const [schedule, setSchedule] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const getAsyncStorageData = async (key, setState) => {
    try {
      const value = await AsyncStorage.getItem(key).then(res => {
        setState(JSON.parse(res));
      });
      return value;
    } catch (error) {
      console.log(error);
    }
  };

  const getSchedule = async () => {
    await axios
      .get(`http://${ip}:8080/student/${userData.id}`, {
        headers: {'x-access-token': accessToken},
      })
      .then(response => {
        console.log(response.data);
        setSchedule(JSON.stringify(response.data));
      })
      .catch(error => {
        setSchedule('No registered Courses yet.');
        console.error(error);
      });
  };
  useEffect(() => {
    getAsyncStorageData('@user_data', setUserData);
    getAsyncStorageData('@access_token', setAccessToken);
  }, []);

  useEffect(() => {
    // console.log(accessToken);
    if (accessToken) getSchedule();
  }, [accessToken]);

  const handleNamePress = () => {
    if (animation) {
      Animated.parallel([
        Animated.timing(headerAnimation, {
          toValue: 40,
          duration: 600,
          delay: 600,
          useNativeDriver: false,
        }),
        Animated.timing(textAnimation, {
          toValue: 0,
          delay: 600,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      Animated.timing(courseAnimation, {
        toValue: -500,
        duration: 500,
        delay: 600,
        useNativeDriver: true,
      }).start();
      setAnimation(false);
    } else {
      Animated.timing(courseAnimation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      Animated.parallel([
        Animated.timing(headerAnimation, {
          toValue: 150,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(textAnimation, {
          toValue: 50,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      setAnimation(true);
    }
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem('@access_token');
    await AsyncStorage.removeItem('@user_data');
    Toast.show({
      type: 'error',
      text1: 'You were singed out.',
    });
    navigation.navigate('login');
  };
  const displaySchedule = schedule => {
    const data = JSON.parse(schedule);
    return data.map(row => (
      <Text
        key={row.Course}
        style={[styles.coursesText, fonts.customFont, fonts.mini]}>
        <Text style={styles.schedule}>Course:</Text>
        {'\t'}
        {row.Course}
        {'\t'}
        {'\t'}
        <Text style={styles.schedule}>Room:</Text>
        {'\t'}
        {row.Room}
        {'\t'}
        {'\t'}
        <Text style={styles.schedule}>Time:</Text>
        {'\t'}
        {row.STime}
        {'-'}
        {row.ETime}
      </Text>
    ));
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: headerAnimation,
          marginRight: 35,
        },
      ]}>
      <View style={{flex: 1}}>
        <Animated.Text
          style={[
            animation && styles.border,
            styles.coursesTitle,
            fonts.customFont,
            fonts.medium,
            {
              transform: [{translateX: courseAnimation}],
            },
          ]}>
          {schedule == 'No registered Courses yet.' || !schedule ? (
            'No registered Courses yet.'
          ) : (
            <Text>
              Courses reported:{'\n'}
              {displaySchedule(schedule)}
            </Text>
          )}
        </Animated.Text>
      </View>
      <Animated.Text style={{transform: [{translateY: textAnimation}]}}>
        <Text style={[styles.greeting, fonts.customFont, fonts.large]}>
          {userData && `Happy ${day}, `}
        </Text>
        <Text
          style={[styles.name, fonts.customFont, fonts.large]}
          onPress={handleNamePress}>
          {userData.FirstName}
        </Text>
      </Animated.Text>
      <Pressable onPress={handleLogout}>
        <Animated.Text style={{transform: [{translateY: textAnimation}]}}>
          <MaterialCommunityIcons color="white" size={22} name="logout" />
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default HomeHeader;
const styles = StyleSheet.create({
  coursesTitle: {
    marginTop: -1000,
    position: 'absolute',
    color: '#e6eff3',
  },
  coursesText: {
    color: '#e6eff3',
  },
  border: {
    borderColor: 'white',
    borderBottomWidth: 1,
    height: parseInt('100%') - 42,
    width: '100%',
  },
  hidden: {
    display: 'none',
  },
  visible: {
    display: 'flex',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    zIndex: 2,
    fontWeight: '600',
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  greeting: {
    color: 'white',
  },
  schedule: {
    fontWeight: '700',
    marginLeft: '1000%',
  },
});
