import {StyleSheet, Text, Pressable, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TopRightIcon = ({
  accessToken,
  setAccessToken,
  animateToken,
  userData,
  showToast,
  themeTools,
  fonts,
}) => {
  const [schedule, setSchedule] = useState('Unexpected error.');
  const getSchedule = async () => {
    if (userData && accessToken) {
      if (accessToken == 'expired') {
        return restoreToken();
      } else {
        try {
          const response = await axios.get(
            `http://${Config.IP}:${Config.PORT}/student/${
              JSON.parse(userData).id
            }?token=${accessToken}`,
          );
          setSchedule(JSON.stringify(response.data));
        } catch (error) {
          console.log('getSchedule >>>> ' + error);
          switch (error.response.status) {
            case 500:
              setSchedule('No registered Courses yet.');
              break;
            case 401:
              setSchedule('Token expired.');
              restoreToken();
              break;
            default:
              setSchedule('Unexpected error.');
              break;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (accessToken) getSchedule();
  }, [accessToken]);

  const restoreToken = async () => {
    try {
      const cred = JSON.parse(await AsyncStorage.getItem('@cred'));
      const response = await axios.post(
        `http://${Config.IP}:${Config.PORT}/login`,
        {
          Username: cred.username,
          Password: cred.password,
        },
      );
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.log('restoreToken >>>> ' + error);
    }
  };
  const displaySchedule = schedule => {
    const data = JSON.parse(schedule);
    return data.map(row => {
      const d = new Date(row.Date);
      return (
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
          {'\n'}
          <Text style={styles.schedule}>Date:</Text>
          {'\t'}
          {d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()}
          {'\t'}
          {'\t'}
          <Text style={styles.schedule}>Time:</Text>
          {'\t'}
          {row.STime}
          {'-'}
          {row.ETime}
          {'\n'}
        </Text>
      );
    });
  };
  const displayScheduleAnimation = () => {
    showToast(
      schedule == 'No registered Courses yet.' ||
        schedule == 'Token expired.' ||
        schedule == 'Unexpected error.' ||
        !schedule
        ? schedule
        : 'Courses reported: ',
      schedule == 'No registered Courses yet.' ||
        schedule == 'Token expired.' ||
        schedule == 'Unexpected error.' ||
        !schedule
        ? null
        : displaySchedule(schedule),
      '',
      false,
    );
  };
  return (
    <Pressable>
      <Animated.View style={{opacity: animateToken}}>
        <FontAwesome
          name="user"
          onPress={displayScheduleAnimation}
          size={32}
          color={themeTools.color}
          style={[({pressed}) => [{opacity: pressed ? 0.5 : 1.0}]]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default TopRightIcon;

const styles = StyleSheet.create({});
