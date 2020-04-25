import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import color from './common/Color';
import icon from './common/Icon';
const styles = StyleSheet.create({
  currentWeatherContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  cityText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsContainer: {flex: 1},
  weatherContainer: {flexDirection: 'column'},
  dateText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '100',
  },
  timeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
  },
  mainTemp: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  maxTemp: {
    fontSize: 14,
    color: '#fff',
  },
  minTemp: {
    fontSize: 14,
    color: '#fff',
  },
});

const DetailsHeader = ({currentData, onPress}) => {
  const renderIcon = (condition) => {
    switch (condition) {
      case 'Clouds':
        return icon.clouds;
      case 'Thunderstorm':
        return icon.thunderstorm;
      case 'Rain':
        return icon.rain;
      case 'Clear':
        return icon.clear;
      case 'Drizzle':
        return icon.drizzle;
      default:
        return icon.clear;
    }
  };

  return (
    <View style={styles.currentWeatherContainer}>
      <View style={styles.detailsContainer}>
        <Text style={styles.cityText} allowFontScaling={false}>
          {currentData.city}
        </Text>
        <Text style={styles.dateText} allowFontScaling={false}>
          {currentData.date}
        </Text>
        <Text style={styles.timeText} allowFontScaling={false}>
          {currentData.time}
        </Text>
      </View>
      <View style={styles.weatherContainer}>
        <View style={{width: '100%', height: 80}}>
          <Image
            source={renderIcon(currentData.main)}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.mainTemp} allowFontScaling={false}>
          {currentData.temperature}°c
        </Text>
      </View>
    </View>
  );
};

export default DetailsHeader;
