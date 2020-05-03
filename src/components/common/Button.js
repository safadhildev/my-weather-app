import React from 'react';

import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

import color from './Color';
const searchIcon = require('../../../assets/icons/search-white.png');
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 80,
    height: 30,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
  searchButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 4,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  greenIcon: {
    tintColor: color.green,
  },
  greyIcon: {
    tintColor: color.grey,
  },
  darkBlueIcon: {
    tintColor: color.darkBlue,
  },
  yellowIcon: {
    tintColor: color.yellow,
  },
  blueIcon: {
    tintColor: color.bkue,
  },
});

const Button = ({title, onPress, search, weather}) => {
  console.log(weather);

  const iconColor = () => {
    switch (weather) {
      case 'Clouds':
        return styles.greyIcon;
      case 'Thunderstorm':
        return styles.darkBlueIcon;
      case 'Rain':
        return styles.darkBlueIcon;
      case 'Clear':
        return styles.yellowIcon;
      case 'Drizzle':
        return styles.blueIcon;
      default:
        return styles.greenIcon;
    }
  };

  return search ? (
    <TouchableOpacity onPress={onPress} style={styles.searchButton}>
      <View>
        <Image style={[styles.icon, iconColor()]} source={searchIcon} />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonWrapper}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
