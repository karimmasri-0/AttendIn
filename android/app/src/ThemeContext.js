import React, {createContext, useState} from 'react';
import {Appearance} from 'react-native';
import {fonts} from './styles';

export const lightTheme = {
  color: '#222',
  labelColor: '#696969',
  backgroundColor: '#F3F3F3',
};
export const darkTheme = {
  color: '#F3F3F3',
  labelColor: '#808080',
  backgroundColor: '#222222',
};

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isLight, setIsLight] = useState(
    Appearance.getColorScheme() === 'light',
  );

  const myTheme = {
    isLight: isLight,
    themeTools: isLight ? lightTheme : darkTheme,
    toggleTheme: scheme => {
      setIsLight(scheme === 'light' ? true : false);
      console.log('scheme ' + scheme + ' and state ' + isLight);
    },
    fonts: fonts,
  };
  return (
    <ThemeContext.Provider value={myTheme}>{children}</ThemeContext.Provider>
  );
};
