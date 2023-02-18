import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './android/app/src/components/Login';
import Toast from 'react-native-toast-message';
import Home from './android/app/src/components/Home';
import LoginTemp from './android/app/src/components/LoginTemp';
import {ThemeProvider} from './android/app/src/ThemeContext';
import HomeHeader from './android/app/src/components/HomeHeader';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2f8147"
        animated={true}
      />
      <SafeAreaView style={styles.main}>
        <NavigationContainer>
          <View style={styles.main}>
            <Stack.Navigator initialRouteName="login_temp">
              <Stack.Screen
                name="login_temp"
                component={LoginTemp}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="home"
                component={Home}
                options={{
                  headerTitle: () => <HomeHeader />,
                  headerBackVisible: false,
                  animationEnabled: true,
                  headerStyle: {backgroundColor: '#2f8147'},
                  headerBackButtonMenuEnabled: false,
                  statusBarAnimation: 'fade',
                  statusBarColor: '#2f8147',
                  animationTypeForReplace: 'pop',
                  animation: 'slide_from_bottom',
                }}
              />
            </Stack.Navigator>
            <Toast limit={1} />
          </View>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  main: {flex: 1},
});

export default App;
